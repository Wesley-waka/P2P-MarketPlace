import express from "express";
import Tractor from '../models/Tractor.js';
import multer from 'multer';
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from 'multer-s3';
import { config } from 'dotenv';
config();

const tractorRouter = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

tractorRouter.post('/', async (req, res) => {
  const uploadMiddleware = upload.single('images');

  try {
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    if (!req.file) {
      return res.status(400).send('Please upload an image file.');
    }

    const { tractorName, model, year, dealer, HPCategory, engineHoursUsed, vehicleID, engineCapacity, fuelType, engineConditions, engineConsumption, tyreConditions, exteriorFeatures, interiorFeatures, cost, tractorType } = req.body;

    const imageUrl = req.file.location;

    const tractor = new Tractor({
      model,
      year,
      images: imageUrl,
      dealer,
      HPCategory,
      engineHoursUsed,
      vehicleID,
      engineCapacity,
      fuelType,
      cost,
      tractorType,
      engineConditions,
      engineConsumption,
      tyreConditions,
      exteriorFeatures,
      interiorFeatures,
      tractorName,
    });

    await tractor.save();
    res.status(201).json(tractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tractorRouter.get('/:id', async (req, res) => {
  try {
    const tractor = await Tractor.findById(req.params.id).populate('dealer');

    if (!tractor) {
      return res.status(404).json({ error: 'Tractor not found' });
    }

    const allTractors = await Tractor.find();
    const totalPrices = allTractors.reduce((sum, t) => sum + t.price, 0);
    const priceRatio = (tractor.price / totalPrices) * 100;

    res.json({ ...tractor.toObject(), priceRatio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tractorRouter.get('/', async (req, res) => {
  try {
    const { dealer, budget, location, cost, HP, price, year, engineHoursUsed, features, tractorType, search, limit } = req.query;
    const query = { isApproved: true }; //

    if (dealer) query.dealer = dealer;
    if (search) {
      query.keyword = { $regex: search, $options: 'i' }; // Assuming you have a keyword field
    }

    if (budget) query.cost = { $lte: budget };
    if (location) {
      const [lng, lat] = location.split(',').map(Number);
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: 5000, // 5 km radius
        },
      };
    }
    if (tractorType) query.tractorType = tractorType;
    if (cost) query.cost = { $lte: cost };
    if (HP) query.HPCategory = { $gte: HP.from, $lte: HP.to };
    if (price) query.price = { $gte: price.from, $lte: price.to };
    if (year) query.year = { $gte: year.from, $lte: year.to };
    if (engineHoursUsed) query.engineHoursUsed = { $gte: engineHoursUsed.from, $lte: engineHoursUsed.to };
    if (features) query.features = { $in: features.split(',') };

    const tractors = await Tractor.find(query).limit(parseInt(limit, 10));

    res.json(tractors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tractorRouter.patch('/:id', async (req, res) => {
  const uploadMiddleware = upload.array('images', 5); // Allow up to 5 images

  try {
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const tractor = await Tractor.findById(req.params.id);

    if (!tractor) {
      return res.status(404).json({ error: 'Tractor not found' });
    }

    const { tractorName, model, year, dealer, HPCategory, engineHoursUsed, vehicleID, engineCapacity, fuelType, engineConditions, engineConsumption, tyreConditions, exteriorFeatures, interiorFeatures } = req.body;

    if (req.file) {
      tractor.images = req.file.location;
    }

    tractor.tractorName = tractorName || tractor.tractorName;
    tractor.model = model || tractor.model;
    tractor.year = year || tractor.year;
    tractor.dealer = dealer || tractor.dealer;
    tractor.HPCategory = HPCategory || tractor.HPCategory;
    tractor.engineHoursUsed = engineHoursUsed || tractor.engineHoursUsed;
    tractor.vehicleID = vehicleID || tractor.vehicleID;
    tractor.engineCapacity = engineCapacity || tractor.engineCapacity;
    tractor.fuelType = fuelType || tractor.fuelType;
    tractor.engineConditions = engineConditions || tractor.engineConditions;
    tractor.engineConsumption = engineConsumption || tractor.engineConsumption;
    tractor.tyreConditions = tyreConditions || tractor.tyreConditions;
    tractor.exteriorFeatures = exteriorFeatures || tractor.exteriorFeatures;
    tractor.interiorFeatures = interiorFeatures || tractor.interiorFeatures;

    await tractor.save();
    res.json(tractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment view count
tractorRouter.post('/increment/:productId', async (req, res) => {
  const { productId } = req.params;
  let productView = await Tractor.findOne({ productId });

  if (!productView) {
    productView = new Tractor({ productId });
  }

  productView.viewCount += 1;
  await productView.save();

  res.status(200).json({ viewCount: productView.viewCount });
});


// Get view count
tractorRouter.get('/view/:productId', async (req, res) => {
  const { productId } = req.params;
  const productView = await Tractor.findOne({ productId });

  if (!productView) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({ viewCount: productView.viewCount });
});


tractorRouter.get('/message/:createdByUserId', async (req, res) => {
  const { productId } = req.params;
  const productView = await Tractor.findOne({ productId });

  if (!productView) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({ productView });
});





export default tractorRouter;
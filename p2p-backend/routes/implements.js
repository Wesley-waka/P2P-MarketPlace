import Implements from '../models/Implements.js';
import express from "express";
import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import { config } from 'dotenv';

config();

// Configure AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const implementsRouter = express.Router();

// Updated multer configuration for S3 v3
const fileFilter = (req, file, cb) => {
  // Accept images only
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
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});

implementsRouter.post('/', async (req, res) => {
  try {
    const uploadMiddleware = upload.array('images', 5);

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

    const { model, year, dealer, implementType, implementCategory, implementPower, modelTyneFix, modelTyneThickness, numberofTyne, frameTyne, interTyneSpacing, gapBetweenFrontTyne, rearTyne, tyneHeight, mostHeightGround, height, width, lengthtotalWeigth, widthOfCut, powerRequired, isApproved } = req.body;

    const imageUrl = req.file.location;

    const implementCultivator = new Implements({
      model,
      year,
      images: imageUrl,
      dealer,
      implementType,
      implementCategory,
      implementPower,
      modelTyneFix,
      modelTyneThickness,
      numberofTyne,
      frameTyne,
      interTyneSpacing,
      gapBetweenFrontTyne,
      rearTyne,
      tyneHeight,
      mostHeightGround,
      height,
      width,
      lengthtotalWeigth,
      widthOfCut,
      powerRequired,
      isApproved
    });

    await implementCultivator.save();
    res.status(201).json(Implements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New endpoint to get all implements with optional filtering by brand or category
implementsRouter.get('/', async (req, res) => {
  try {
    const { brand, category, isApproved, search, limit } = req.query;
    const filter = {};

    if (search) {
      query.keyword = { $regex: search, $options: 'i' }; // Assuming you have a keyword field
    }

    if (brand) {
      filter.dealer = brand;
    }

    if (category) {
      filter.implementCategory = category;
    }

    if (isApproved) {
      filter.isApproved = isApproved;
    }

    const implementsList = await Implements.find(filter).populate('dealer').limit(parseInt(limit, 10));;
    res.json(implementsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

implementsRouter.get('/:id', async (req, res) => {
  try {
    const implementCultivator = await Implements.findById(req.params.id).populate('dealer');
    if (!implementCultivator) {
      return res.status(404).json({ error: 'Implements not found' });
    }
    res.json(implementCultivator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

implementsRouter.patch('/:id', async (req, res) => {
  try {
    const uploadMiddleware = upload.array('images', 5);

    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const implementCultivator = await Implements.findById(req.params.id);
    if (!implementCultivator) {
      return res.status(404).json({ error: 'Implements not found' });
    }

    const { model, year, dealer, implementType, implementCategory, implementPower, modelTyneFix, modelTyneThickness, numberofTyne, frameTyne, interTyneSpacing, gapBetweenFrontTyne, rearTyne, tyneHeight, mostHeightGround, height, width, lengthtotalWeigth, widthOfCut, powerRequired, isApproved } = req.body;

    if (req.file) {
      implementCultivator.images = req.file.location;
    }

    implementCultivator.model = model || implementCultivator.model;
    implementCultivator.year = year || implementCultivator.year;
    implementCultivator.dealer = dealer || implementCultivator.dealer;
    implementCultivator.implementType = implementType || implementCultivator.implementType;
    implementCultivator.implementCategory = implementCategory || implementCultivator.implementCategory;
    implementCultivator.implementPower = implementPower || implementCultivator.implementPower;
    implementCultivator.modelTyneFix = modelTyneFix || implementCultivator.modelTyneFix;
    implementCultivator.modelTyneThickness = modelTyneThickness || implementCultivator.modelTyneThickness;
    implementCultivator.numberofTyne = numberofTyne || implementCultivator.numberofTyne;
    implementCultivator.frameTyne = frameTyne || implementCultivator.frameTyne;
    implementCultivator.interTyneSpacing = interTyneSpacing || implementCultivator.interTyneSpacing;
    implementCultivator.gapBetweenFrontTyne = gapBetweenFrontTyne || implementCultivator.gapBetweenFrontTyne;
    implementCultivator.rearTyne = rearTyne || implementCultivator.rearTyne;
    implementCultivator.tyneHeight = tyneHeight || implementCultivator.tyneHeight;
    implementCultivator.mostHeightGround = mostHeightGround || implementCultivator.mostHeightGround;
    implementCultivator.height = height || implementCultivator.height;
    implementCultivator.width = width || implementCultivator.width;
    implementCultivator.lengthtotalWeigth = lengthtotalWeigth || implementCultivator.lengthtotalWeigth;
    implementCultivator.widthOfCut = widthOfCut || implementCultivator.widthOfCut;
    implementCultivator.powerRequired = powerRequired || implementCultivator.powerRequired;
    implementCultivator.isApproved = isApproved || implementCultivator.isApproved;

    await implementCultivator.save();
    res.json(implementCultivator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

implementsRouter.post('/increment/:productId', async (req, res) => {
  const { productId } = req.params;
  let productView = await Implements.findOne({ productId });

  if (!productView) {
    productView = new Tractor({ productId });
  }

  productView.viewCount += 1;
  await productView.save();

  res.status(200).json({ viewCount: productView.viewCount });
});


// Get view count
implementsRouter.get('/count/:productId', async (req, res) => {
  const { productId } = req.params;
  const productView = await Implements.findOne({ productId });

  if (!productView) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({ viewCount: productView.viewCount });
});

export default implementsRouter;
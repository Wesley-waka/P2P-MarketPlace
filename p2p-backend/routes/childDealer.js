import express from 'express';
import ChildDealer from '../models/ChildDealers.js'; // Assuming the schema is exported from ChildDealers.js

const childDealerRouter = express.Router();
// POST request to create a new child dealer
childDealerRouter.post('/child-dealers', async (req, res) => {
  try {
    const newChildDealer = new ChildDealer(req.body);
    const savedChildDealer = await newChildDealer.save();
    res.status(201).json(savedChildDealer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH request to update an existing child dealer
childDealerRouter.patch('/child-dealers/:id', async (req, res) => {
  try {
    const updatedChildDealer = await ChildDealer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedChildDealer) {
      return res.status(404).json({ message: 'Child dealer not found' });
    }
    res.json(updatedChildDealer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to retrieve all child dealers

childDealerRouter.get('/child-dealers', async (req, res) => {
  try {
    const { lng, lat } = req.query;
    const maxDistance = 10000;
    let childDealers;

    if (lng && lat && maxDistance) {
      childDealers = await ChildDealer.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: parseFloat(maxDistance),
          },
        },
      });
    } else {
      childDealers = await ChildDealer.find();
    }

    res.json(childDealers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default childDealerRouter;
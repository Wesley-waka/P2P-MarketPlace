// import Dealer, { findById, find } from '../models/Dealer';
import Dealer from '../models/Dealer.js';
import { createTransport } from 'nodemailer';
import express from "express";

const transporter = createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const DealersRouter = express.Router();

// Endpoint to create a main dealer and its child dealers
DealersRouter.post('/', async (req, res) => {
  try {
    const { name, location, number } = req.body;

    const dealer = new Dealer({
      name,
      location,
      number,
      childDealers: []
    });

    await dealer.save();

    // if (parentDealerId) {
    //   const parentDealer = await Dealer.findById(parentDealerId);
    //   parentDealer.childDealers.push(dealer._id);
    //   await parentDealer.save();
    // }

    res.status(201).json(dealer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

DealersRouter.post('/:dealerId/dealers', async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const { dealerId } = req.params;

    const mechanic = new Dealer({ name, specialty, dealer: dealerId });
    await mechanic.save();

    const dealer = await findById(dealerId);
    dealer.mechanics.push(mechanic._id);
    await dealer.save();

    // Notify users
    const users = await User.find();
    users.forEach(user => {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'New Mechanic Added',
        text: `A new mechanic named ${name} has been added to dealer ${dealer.name}.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Error sending email to ${user.email}: ${error.message}`);
        } else {
          console.log(`Email sent to ${user.email}: ${info.response}`);
        }
      });
    });

    res.status(201).json(mechanic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

DealersRouter.post('/dealer-submit', async (req, res) => {
  try {
    const { name, email, state } = req.body;

    // find a way to get the dealer's name 
    // Email content
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Appointment Confirmation',
      text: `Hello ${name},\n\nYou will be attended to on Thursday.\n\nState: ${state}.Kinddly contact us if you dealer does not contact you before that date.\n\nBest regards,\nHello Tractor`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get all dealers or based on query
DealersRouter.get('/', async (req, res) => {
  try {
    const { lng, lat } = req.query;
    const maxDistance = 10000;
    let dealers;

    if (lng && lat && maxDistance) {
      dealers = await Dealer.find({
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
      dealers = await Dealer.find();
    }



    res.status(200).json(dealers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


DealersRouter.get('/dealers-nearby', async (req, res) => {
  const { lat, lng } = req.query;
  const drivers = await find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: 5000, // 5 km radius
      },
    },
  });
  res.send(drivers);
});

// Endpoint to get dealer details including its child dealers

// DealersRouter.get('/dealers/:id', async (req, res) => {
//   try {
//     const dealer = await Dealer.findById(req.params.id).populate('childDealers');
//     if (!dealer) {
//       return res.status(404).json({ error: 'Dealer not found.' });
//     }
//     res.status(200).json(dealer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [drivers, setDrivers] = useState([]);
//   const [location, setLocation] = useState({ lat: null, lng: null });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (location.lat && location.lng) {
//       axios
//         .get(`http://localhost:5000/drivers-nearby?lat=${location.lat}&lng=${location.lng}`)
//         .then((response) => {
//           setDrivers(response.data);
//         });
//     }
//   }, [location]);

//   return (
//     <div>
//       <h1>Drivers Nearby</h1>
//       <ul>
//         {drivers.map((driver) => (
//           <li key={driver._id}>{driver.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

export default DealersRouter;
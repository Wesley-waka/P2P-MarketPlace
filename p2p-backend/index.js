import express from 'express';
import http from 'http';
import { config } from 'dotenv';



const app = express();
const server = http.createServer(app);


// Configure environment variables
config();


app.get('/api', (req, res) => {
    res.send('Hello Tractor API is running....');
  });


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

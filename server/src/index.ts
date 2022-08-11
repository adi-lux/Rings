import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hellos world!');
});
app.get('/sd', (req, res) => {
  res.send('Helalo world!');
});

app.get('/api', (req, res) => res.send('Amaszssing!'));

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://127.0.0.1:${port}`);
});

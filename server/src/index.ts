import dotenv from 'dotenv';
import express from 'express';
import {auth} from 'express-oauth2-jwt-bearer';
import cors from 'cors';
import dbConnect from './setup/db';
import homeRouter from './routes/homepage';
import userRouter from './routes/user';
dotenv.config();


const port = process.env.PORT || 8080;
const mongo = process.env.MONGO_URI;

dbConnect(mongo);
const app = express();
app.use(auth());
app.use(cors());
app.use(express.json());

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: process.env.ISSUER_BASE_URL,
// };


// auth router attaches /login, /logout, and /callback routes to the baseURL
//app.use(auth(config));
// req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
// req.isAuthenticated is provided from the auth router
// app.set('trust proxy', true);

app.use('/', homeRouter)
app.use('/users', userRouter);
// define a route handler for the default home page

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://127.0.0.1:${port}`);
});
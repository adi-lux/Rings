import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express();

app.use(express.json())


// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hellos world!");
});
app.get("/sd", (req, res) => {
    res.send("Helalo world!");
});

app.get("/api", (req,res) => {
    return res.send('Amaszssing!')
})

// start the Express server
app.listen(3000, () => {
    console.log(`server started at http://127.0.0.1:${3000}`);
});
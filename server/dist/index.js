"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/sd", (req, res) => {
    res.send("Helalo world!");
});
app.get("/api", (req, res) => {
    return res.send('Amazing!');
});
// start the Express server
app.listen(8080, () => {
    console.log(`server started at http://localhost:${8080}`);
});
//# sourceMappingURL=index.js.map
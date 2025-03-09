"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = require("./routes/route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 80;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: "*" }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.get("/", (_, res) => {
    const baseUrl = _.protocol + '://' + _.get('host');
    res.send(`
    <h1>gogoanime and hianime proxy</h1>
    <p>Port: ${PORT}</p>
    <p>Base URL: ${baseUrl}</p>
    <p>Base URL Env: ${process.env.BASE_URL}</p>
  `);
});
app.use('/', route_1.router);
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
exports.default = app;

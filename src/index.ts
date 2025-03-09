import  express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/route';
import { getHost } from './utils/helper';

dotenv.config();

const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.get("/", (_, res) => {
  const baseUrl = getHost(_);
  res.send(`
    <h1>gogoanime and hianime proxy</h1>
    <p>Port: ${PORT}</p>
    <p>Base URL: ${baseUrl}</p>
    <p>Base URL Env: ${process.env.BASE_URL}</p>
  `);
});
app.use('/', (req, res, next) => {
  console.log("Host:", getHost(req));
  next();
}, router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

export default app;
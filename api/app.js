// import express from 'express';
// import config from 'config';
// import db from '../database/databaseConfig';
// import bodyParser from 'body-parser';
// import router from '../router/router';
// import cors from 'cors';
// import Serverless from 'serverless-http';
// const app = express();
// // const {API_PORT} = config.get("PORTS");

// // database connection.
// db();

// // middle ware to parse.
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173', // frontend origin
//     credentials: true // if you're using cookies or sessions
// }));

// // router middleware.
// const apiRouter = express.Router();
// app.use('/api/v1', apiRouter);
// apiRouter.use('/invoice',router.invoice_router);

// module.exports = app;
// module.exports.handler = Serverless(app)

import express from 'express';
import db from '../database/databaseConfig';
import cors from 'cors';
import Serverless from 'serverless-http';

const app = express();

// CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-production-app.vercel.app'],
  credentials: true
}));

// Body Parser
app.use(express.json());

// Database (with caching)
let cachedDb = null;
async function connectDB() {
  if (cachedDb) return cachedDb;
  cachedDb = await db(); // Assuming `db()` returns a Promise
  return cachedDb;
}

// Routes
app.use('/api/v1/invoice', async (req, res, next) => {
  try {
    await connectDB(); // Ensure DB is connected
    next();
  } catch (err) {
    res.status(500).json({ error: "DB connection failed" });
  }
}, router.invoice_router);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Export for Vercel
export default Serverless(app);
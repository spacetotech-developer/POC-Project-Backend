import express from 'express';
import config from 'config';
import db from './database/databaseConfig';
import bodyParser from 'body-parser';
import router from './router/router';
import cors from 'cors';
const app = express();
const {API_PORT} = config.get("PORTS");

// database connection.
db();

// middle ware to parse.
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.use(cors());

// router middleware.
const apiRouter = express.Router();
app.use('/api/v1', apiRouter);
apiRouter.use('/invoice',router.invoice_router);

app.listen(API_PORT,()=>{
    console.log(`Server is running at port number ${API_PORT}`);
})
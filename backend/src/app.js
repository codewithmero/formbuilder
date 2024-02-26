import express from 'express';
import cors from 'cors';
import logger from 'morgan';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTING AND USING ROUTES;
import formRoutes from "./routes/form.routes.js";
app.use("/api/v1/forms", formRoutes);

export default app;
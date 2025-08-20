import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";

import highlightRoutes from './Routes/highlightRoutes.js';
import studentRoutes from './Routes/studentRoutes.js';
import coordinatorRoutes from './Routes/coordinatorRoutes.js';
import announcementRoutes from './Routes/announcementRoutes.js';
import companyRoutes from './Routes/CompanyRoutes.js';
import recuiterRoutes from './Routes/recruiterRoutes.js'

dotenv.config();
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/', highlightRoutes);
app.use('/', studentRoutes);
app.use('/', announcementRoutes);
app.use('/', coordinatorRoutes);
app.use("/", companyRoutes)
app.use("/", recuiterRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

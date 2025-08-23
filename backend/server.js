import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import highlightRoutes from './Routes/highlightRoutes.js';
import studentRoutes from './Routes/studentRoutes.js';
import coordinatorRoutes from './Routes/coordinatorRoutes.js';
import announcementRoutes from './Routes/announcementRoutes.js';
import companyRoutes from './Routes/CompanyRoutes.js';
import recruiterRoutes from './Routes/recruiterRoutes.js'; // Fixed typo

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mount routes with proper organization
app.use('/', highlightRoutes);
app.use('/', studentRoutes);
app.use('/', announcementRoutes);
app.use('/', coordinatorRoutes);
app.use('/', companyRoutes);

// Mount recruiter routes with proper prefixes
app.use('/recruiter', recruiterRoutes);  // For login/register: /recruiter/login, /recruiter/register
app.use('/recruiters', recruiterRoutes); // For getting all recruiters: /recruiters

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
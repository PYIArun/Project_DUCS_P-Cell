const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


const highlightRoutes = require("./Routes/highlightRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('API Running'));

app.use(cors()); // This will allow all origins
app.use('/', highlightRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

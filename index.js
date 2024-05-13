// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/UserRouter');
const TourRouter = require('./routes/TourRouter')
const app = express();
const port = 3001;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/tours', TourRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

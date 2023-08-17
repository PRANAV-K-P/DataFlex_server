const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./api/middleware/errorHandler');

connectDB();

const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./api/routes/user.route'));
app.use('/api/admin', require('./api/routes/admin.route'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

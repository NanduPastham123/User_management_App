const express = require('express');
const dotenv = require('dotenv');
const authRoutesV1 = require('./routes/authRoutes.js');
const userRoutesV1 = require('./routes/userRoutes.js');
const defineAssociations = require("./models/index.js");
const errorHandler = require('./middlewares/errorHandler.js');
// Define associations
defineAssociations();
const sequelize = require('./config/database.js');

dotenv.config();

const app = express();
app.use(express.json());

// URI Versioning 1 Routes
app.use('/api/v1/auth', authRoutesV1);
app.use('/api/v1/users', userRoutesV1);

// URI Versioning 2 Routes in future reference for Maintain backward compatibility
// const v2Routes = require('./routes/v2');
// app.use('/api/v2/auth', authRoutesV1);
// app.use('/api/v2/users', userRoutesV1);

app.use(errorHandler);

// Sync database
sequelize.sync({ alter: true }) // Use `alter: true` in development to adjust the schema
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

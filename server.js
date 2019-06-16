const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Init DB connection
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Routing definition
app.use('/api/debts', require('./routes/debts'));
app.use('/api/users', require('./routes/users'));

// Port assignment
const PORT = process.env.PORT || 5000;

// Starting server
app.listen(PORT, () => {
  console.log(`Server running  at port ${PORT}`);
});

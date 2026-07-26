import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/database/connection.js';

const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
};

startServer();

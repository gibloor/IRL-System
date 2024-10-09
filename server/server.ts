
import express from 'express';
import cors from 'cors';

import sequelize from './database/config';

// import authRoutes from './routes/auth';
// import apartmentRoutes from './routes/apartment';

const app = express();

app.use(express.json());
app.use(cors())

// app.use('/api/auth', authRoutes);
// app.use('/api/apartments', apartmentRoutes);

const PORT = process.env.PORT || 3010;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync();
    console.log('Models synchronized with the database.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();

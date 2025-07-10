const express = require('express');
require('dotenv').config();
const app = express();
const besoinRoutes = require('./routes/besoin.routes');
const utilisateurRoutes = require('./routes/utilisateur.routes');
const validationRoutes = require('./routes/validation.routes');
const departementRoutes = require('./routes/departement.routes');
const authRoutes = require('./routes/auth.routes');
const activityLogRoutes = require('./routes/activitylog.routes');
const revenuRoutes = require('./routes/revenu.routes');
const settingsRoutes = require('./routes/settings.routes');

const {authenticate} = require('./middlewares/auth.middleware');

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use(authenticate);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/besoins', besoinRoutes);
app.use('/api/validations', validationRoutes);
app.use('/api/departements', departementRoutes);
app.use('/api/activitylogs', activityLogRoutes);
app.use('/api/revenus', revenuRoutes);
app.use('/api/settings', settingsRoutes);

module.exports = app;
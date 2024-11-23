// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import sequelize from './config/database';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

export default app;

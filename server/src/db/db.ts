import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let dbUser = process.env.DB_USER!;
let dbPass = process.env.DB_PASS!;
let dbHost = process.env.DB_HOST!;
let dbName = process.env.DB_NAME!;

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'postgres',
  benchmark: true,
  logging(sql, timing) {
    console.log(`[Execution time: ${timing}ms]
     -  ${sql} \n`)
  },
  // logging: false
});

// // Testing connection
// db.authenticate()
//   .then(() =>
//     console.log('Connection has been established successfully.'))
//   .catch((error) =>
//     console.error('Unable to connect to the database:', error));

export default db;

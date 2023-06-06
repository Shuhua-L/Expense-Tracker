import { DataTypes } from 'sequelize';
import db from './db/db'

const Category = db.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: DataTypes.STRING,
  name: DataTypes.STRING,
}, {
  timestamps: false
})

const Expense = db.define('expenses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  date: DataTypes.DATE,
  amount: DataTypes.INTEGER,
  category: {
    type: DataTypes.INTEGER,
    references: { model: Category, key: 'id' }
  },
})

db.sync();

export default { Category, Expense };
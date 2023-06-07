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
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: { model: Category, key: 'id' }
  },
})

Category.hasMany(Expense);
Expense.belongsTo(Category);

db.sync();
// db.sync({force: true});

export default { Category, Expense };
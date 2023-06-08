import { Model, Optional, DataTypes } from 'sequelize';
import db from './db/db';

interface CategoryAttributes {
  id: number;
  user: string;
  name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> { }

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public user!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

interface ExpenseAttributes {
  id: number;
  name: string;
  date: number;
  amount: number;
  categoryId: number;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> { }

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
  public id!: number;
  public name!: string;
  public date!: number;
  public amount!: number;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user: DataTypes.STRING,
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    indexes: [{ unique: false, fields: ['name'] }],
    sequelize: db,
    tableName: 'categories',
  }
);

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const dateInMS = this.getDataValue('date');
        return new Date(Number(dateInMS)).toISOString().slice(5, 10);
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: { model: Category, key: 'id' }
    },
  },
  {
    sequelize: db,
    tableName: 'expenses',
  }
);

Category.hasMany(Expense, { foreignKey: "categoryId" });
Expense.belongsTo(Category, { foreignKey: "categoryId" });

db.sync();
// db.sync({force: true});

export default { Category, Expense };
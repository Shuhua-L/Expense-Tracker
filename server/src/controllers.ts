import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import models from './model';

export function homePage(req: Request, res: Response) {
  res.json("Welcome to MVP! 🤗")
}

export function getRecords(req: Request, res: Response) {
  const getCategory = '(SELECT name FROM categories WHERE \"categoryId\" = categories.id)';

  models.Expense.findAll({
    // attributes: { exclude: ['createdAt', 'updatedAt'] },
    // include: { model: models.Category, attributes: [['name', 'category']] }
    attributes: ['id', 'name', 'date', 'amount',
      [Sequelize.literal(getCategory), 'category']]
  })
    .then(result => {
      // console.log('FindAll result:',result)
      res.json(result)
    })
    .catch(error => console.log(error))
}

export function postRecords(req: Request, res: Response) {
  const { name, date, amount, category } = req.body;

  console.log(category);
  models.Category.findOrCreate({
    where: { name: category },
    attributes: ['id'],
    raw: true
  })
    .then(([instance, created]) => {
      const categoryId = instance.id;
      console.log(categoryId);

      return models.Expense.create({ name, date, amount, categoryId })
    })
    .then(result => {
      // console.log('Post result:', JSON.stringify(result))
      res.status(201).json(result)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500);
    })
}

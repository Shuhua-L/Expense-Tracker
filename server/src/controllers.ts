import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import models from './model'

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
  console.log('post: ', req.body);
  models.Expense.create(req.body)
    .then(result => {
      // console.log('Post result:', JSON.stringify(result))
      res.status(201).json(result)
    })
    .catch(error => console.log(error))
}

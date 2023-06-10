import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import models from './model';
import { fetchOpenAI } from './intelligence';

type Expense = {
  name: string;
  date: string;
  amount: number;
  category: string;
}


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
    .catch(error => res.status(500).send(error))
}

const insertExpense = (expense: Expense, res: Response) => {
  const { name, category } = expense;
  const date = Date.parse(expense.date)
  const amount = Number(expense.amount)

  // console.log('Insert: ', date)

  /**
   * Takes a Expense object
   * 1. find the category id in the Category table
   * 2. insert a new expense record
   * 3. retrieve all records in the Expenses table
   * 4. return a list of expenses
   */
  models.Category.findOrCreate({
    where: { name: category },
    attributes: ['id'],
    raw: true
  })
    .then(([instance, created]) => {
      const categoryId = instance.id;
      // console.log('Before create: ', date)
      return models.Expense.create({ name, date, amount, categoryId })
    })
    .then(createdResult => {
      // console.log('Post expense:', JSON.stringify(createdResult))

      const getCategory = '(SELECT name FROM categories WHERE \"categoryId\" = categories.id)';
      return models.Expense.findAll({
        attributes: ['id', 'name', 'date', 'amount',
          [Sequelize.literal(getCategory), 'category']]
      })
    })
    .then(result => {
      console.log('All expense:', JSON.stringify(result))
      res.status(201).json(result)
    })
    .catch(error => {
      console.log('Error posting expense:', error)
      res.sendStatus(500);
    })
}

export function postWithObject(req: Request, res: Response) {
  insertExpense(req.body, res)

  // const { name, date, amount, category } = req.body;

  // console.log(category);
  // models.Category.findOrCreate({
  //   where: { name: category },
  //   attributes: ['id'],
  //   raw: true
  // })
  //   .then(([instance, created]) => {
  //     const categoryId = instance.id;
  //     console.log(categoryId);

  //     return models.Expense.create({ name, date, amount, categoryId })
  //   })
  //   .then(result => {
  //     // console.log('Post result:', JSON.stringify(result))
  //     res.status(201).json(result)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     res.sendStatus(500);
  //   })
}

export function postWithQuery(req: Request, res: Response) {
  const { query } = req.body;
  console.log(query)

  fetchOpenAI(query)
    .then(result => {
      console.log("🥳", result);
      // res.status(201).json(result)
      // Handle the result
      insertExpense(result, res);
    })
    .catch(error => {
      // Handle the error
      console.log("😩", error);
      res.sendStatus(500);
    });


  // const { name, date, amount, category } = req.body;

  // console.log(category);
  // models.Category.findOrCreate({
  //   where: { name: category },
  //   attributes: ['id'],
  //   raw: true
  // })
  //   .then(([instance, created]) => {
  //     const categoryId = instance.id;
  //     console.log(categoryId);

  //     return models.Expense.create({ name, date, amount, categoryId })
  //   })
  //   .then(result => {
  //     // console.log('Post result:', JSON.stringify(result))
  //     res.status(201).json(result)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     res.sendStatus(500);
  //   })
}

export function deleteExpense(req: Request, res: Response) {
models.Expense.destroy({ where: {id: req.params.id}})
  .then(() => res.sendStatus(204))
  .catch(error => res.status(500).send(error))
}


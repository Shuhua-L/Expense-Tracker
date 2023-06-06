import { Request, Response } from 'express';
import models from './model'

const homePage = (req: Request, res: Response) => {
  res.json("Welcome to MVP! 🤗")
}

const getRecords = (req: Request, res: Response) => {
  models.Expense.findAll()
    .then(result => {
      console.log('FindAll result:',result)
      res.json(result)
    })
    .catch(error => console.log(error))
}


export default { homePage, getRecords }
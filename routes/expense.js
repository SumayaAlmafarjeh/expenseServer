const express = require('express')
const router = express.Router()
const Expense = require('../models/expenseModel')
const mongoose= require('mongoose')

// we moved the functions to another file for security and efficiency
    const {
        getExpenses,
        getExpense,
        createExpense,
        deleteExpense,
        updateExpense
    } = require('../controllers/expenseController')
    const requireAuthen = require('../middleware/requireAuthen')

    
    // require auth for all workout routes
    router.use(requireAuthen)
    
    // GET all workouts
    router.get('/', getExpenses)
    // GET a single workout
    router.get('/:id', getExpense)
    // POST a new workout
    router.post('/', createExpense)
    // DELETE a workout
    router.delete('/:id', deleteExpense)
    // UPDATE a workout
    router.patch('/:id', updateExpense)
    
module.exports = router
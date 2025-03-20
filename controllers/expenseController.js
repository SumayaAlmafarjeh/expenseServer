const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

const getExpenses = async (req, res) => {
    const user_id = req.user._id
    const expenses = await Expense.find({user_id}).sort({ createdAt: -1 })
    res.status(200).json(expenses)
}
const getExpense = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Expense' })
    }
    const expense = await Expense.findById(id)
    if (!expense) {
        return res.status(404).json({ error: 'No such Expense' })
    }
    res.status(200).json(expense)
}
// create a new workout
const createExpense = async (req, res) => {
    const user_id = req.user._id
    const { title, amount, category } = req.body
    // add to the database
    try {
        const expense = await Expense.create({ title, amount, category,user_id })
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// delete a workout
const deleteExpense = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such expense' })
    }
    const expense = await Expense.findOneAndDelete({ _id: id })
    if (!expense) {
        return res.status(400).json({ error: 'No such expense' })
    }
    res.status(200).json(expense)
}
// update a workout
const updateExpense = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such expense' })
    }
    const expense = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!expense) {
        return res.status(400).json({ error: 'No such expense' })
    }
    res.status(200).json(expense)
}
module.exports = {
    getExpenses,
    getExpense,
    createExpense,
    deleteExpense,
    updateExpense
}

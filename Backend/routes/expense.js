const express = require('express');

const router = express.Router();

const expenseController = require('../controller/expense');

router.get('/get-expense',expenseController.getExpense);
router.post('/add-expense',expenseController.addExpense);
router.delete('/delete-expense/:id',expenseController.deleteExpense);
router.put('/update-expense/:id',expenseController.updateExpense)

module.exports = router;
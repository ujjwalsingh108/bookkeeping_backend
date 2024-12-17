const catchAsync = require("../utils/catchAsync");
const Expense = require("./../models/expenseModal");

exports.createExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(201).json({
    status: "success",
    data: {
      expense,
    },
  });
});

exports.getExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
});

exports.updateExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(204).json({
    status: "success",
    data: {
      expense,
    },
  });
});

exports.deleteExpense = catchAsync(async (req, res, next) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllExpense = catchAsync(async (req, res, next) => {
  const expenses = await Expense.find();

  res.status(200).json({
    status: "success",
    results: expenses.length,
    data: {
      expenses,
    },
  });
});

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Expense must belong to a user"],
    },
    amount: {
      type: Number,
      required: [true, "Please specify the expense amount"],
      min: [0, "Amount must be greater than or equal to 0"],
    },
    category: {
      type: String,
      required: [true, "Please specify the category of the expense"],
      enum: [
        "food",
        "transportation",
        "entertainment",
        "utilities",
        "health",
        "education",
        "shopping",
        "travel",
        "other",
      ],
      default: "other",
    },
    date: {
      type: Date,
      required: [true, "Please specify the date of the expense"],
      default: Date.now(),
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;

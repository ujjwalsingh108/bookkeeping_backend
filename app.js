const express = require("express");
const morgan = require("morgan");

const app = express();

const appError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const globalErrorHandler = require("./controllers/errorController");

//MIDDLEWARE TO ENABLE USING MIDDLEWARE LOGIC
app.use(express.json());

//LOGGER MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//HEADERS MIDDLEWARE
app.use((req, res, next) => {
  console.log("headers", req.headers);
  next();
});

//ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/expense", expenseRouter);

//CATCH ALL ROUTES
app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

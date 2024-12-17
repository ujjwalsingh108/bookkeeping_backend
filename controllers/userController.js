const express = require("express");
const User = require("./../models/userModal");
const catchAsync = require("./../utils/catchAsync");

exports.getUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User record fetched!",
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

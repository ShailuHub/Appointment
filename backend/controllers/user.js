const express = require("express");
const User = require("../models/user");

exports.postNewUser = (req, res, next) => {
  const { name, email, phone, date, time } = req.body;
  User.create({
    name,
    email,
    phone,
    date,
    time,
  })
    .then((result) => {
      res.status(201).send("User added");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findAll({ where: { id: userId } })
    .then((user) => {
      return user[0].destroy();
    })
    .then(() => {
      res.status(201).send("User deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedPhone = req.body.phone;
  const updatedDate = req.body.date;
  const updatedTime = req.body.time;
  User.findAll({ where: { id: userId } })
    .then((user) => {
      user[0].name = updatedName;
      user[0].email = updatedEmail;
      user[0].phone = updatedPhone;
      user[0].date = updatedDate;
      user[0].time = updatedTime;
      return user[0].save();
    })
    .then(() => {
      res.status(201).send("User deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSingleUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findAll({ where: { id: userId } })
    .then((user) => {
      res.send(user[0]);
    })
    .catch((err) => console.log(err));
};

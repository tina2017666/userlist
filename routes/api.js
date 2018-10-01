const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/user", (req, res) => {
  console.log(req.url);
  User.find({}).then(data => {
    console.log(data);
    //since it's 倒序 stored
    //res.json(data.slice(0).reverse());
    res.json(data);
  });
});
router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  User.find({ _id: id }).then(data => {
    console.log(data);
    //since it's 倒序 stored
    //res.json(data.slice(0).reverse());
    res.json(data);
  });
});
router.post("/user", (req, res, next) => {
  //the request body should meet the schema rules

  User.create(req.body)
    .then(user => {
      res.send(user);
      // error handling if error , go next,
      // router is a middle-ware
      // next is dealed in server.js
    })
    .catch(next);
});
router.delete("/user/:id", (req, res) => {
  // the id is the unique created by mongoDB
  let id = req.params.id;
  User.findByIdAndRemove({ _id: id }).then(user => {
    // user 是操作的specific的数据
    res.send(user);
  });
});

// change the data
router.put("/user/:id", (req, res) => {
  // console.log(req.params.id);
  // User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(user => {
  //   // User.findOne({ _id: req.params.id }).then(user => {
  //   //   res.send(user);
  //   // });
  //   console.log(user);
  //   res.send(user);
  // });
  const id = req.params.id;
  User.find({ _id: id }).then(data => {
    User.findByIdAndUpdate({ _id: id }, req.body).then(data => {
      res.send(true);
    });
  });
});
module.exports = router;

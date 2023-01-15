var express = require('express');
var router = express.Router();
var user_helper=require('../helpers/user_helper')

/* GET users listing. */
router.get("/", function (req, res, next) {
  try {
    let user = req.session.user;
    let flag = true;
    if (user.admin == true) {
      user_helper.getUsers().then((users) => {
        res.render("index", {
          Name: "Admin",
          item1: "Home",
          Action1: "Login",
          user,
          users,
          h1: "Users",
          col1: "Name",
          col2: "Email",
          flag,
        });
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.redirect("/login");
  }
});
router.get("/add-user", (req, res) => {
  res.render("add_user");
});
router.post("/add-user", (req, res) => {
  user_helper.addUser(req.body).then((response) => {
    res.redirect("/admin");
  });
});

module.exports = router;

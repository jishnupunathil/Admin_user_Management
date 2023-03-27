var express = require('express');
var router = express.Router();
const user_helper = require('../helpers/user_helper');

/* GET home page. */


router.get('/', function(req, res, next) {
  let user=req.session.user
  let products = [{ name: "Iphone 14 pro", category: "Smart Phone", description: "The biggest Pro camera system upgrade ever. Super Retina XDR display with Pro - Motion for a faster, more responsive feel.", Image: "images/iphone14.jpg" },
  { name: "Iphone 13", category: "Smart Phone", description: "IPhone 13 display has rounded corners that follow a beautiful curved design,these corners are within a standard rectangle. ", Image: "images/iphone13.jpg" },
  { name: "Iphone 12 Mini", category: "Smart Phone", description: "IPhone 12 mini display has rounded corners that follows curved design, and these corners are within a standard rectangle.", Image: "images/iphone12mini.avif" },
  { name: "Iphone 11", category: "Smart Phone", description: "Apple iPhone 11 is powered by the Apple A13 Bionic processor. The smartphone comes with a 6.1 inches Liquid Retina IPS LCD", Image: "images/iphone11.webp" },
  { name: "Iphone 12 Mini", category: "Smart Phone", description: "IPhone 12 mini display has rounded corners that follows curved design, and these corners are within a standard rectangle.", Image: "images/iphone12mini.avif" },
  { name: "Iphone 11", category: "Smart Phone", description: "Apple iPhone 11 is powered by the Apple A13 Bionic processor. The smartphone comes with a 6.1 inches Liquid Retina IPS LCD", Image: "images/iphone11.webp" }

  ]

  res.render('index',{products,Action1:'login',Name:'Home',user})
});

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render("login", { loginErr: req.session.userLoginErr });
    req.session.userLoginErr = false;
  }
})

router.get('/signup',(req,res)=>{
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
})

router.post('/signup',(req,res)=>{
  console.log(req.body)
  user_helper.doSignup(req.body).then((response)=>{
    console.log(response);
  })
  res.redirect('/')
})

router.post('/login', function (req, res) {

  user_helper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.userLoginErr="invalid user name or password"
      res.redirect('/login')
    }
  })

})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})


module.exports = router;

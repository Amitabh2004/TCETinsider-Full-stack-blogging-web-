const { Router } = require("express");
const User = require("../models/user.js");
const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signin", async (req,res)=>{
    const {email, password} = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);

    res.cookie('token',token).redirect('/');
    }catch(error){
        res.render('signin', {
            error: 'Incorrect email or password',
        });
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
})

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

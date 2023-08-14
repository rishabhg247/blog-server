import express from "express";
import { db } from "../db.js";
const router = express.Router();

router.post("/register", (req, res) => {
  let { username, email, password } = req.body;
  // Check if user already exists..
  let selectQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(selectQuery, [email, username], (err, data) => {
    if (err) {return res.status(500).json(err)}
    if (data.length) {return res.status(409).json({message:"User or email already exists!"})}
    let insertQuery = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    let values = [username, email, password];
    db.query(insertQuery, [values], (err, _) => {
      if (err) {return res.status(500).json(err)}
      return res.status(200).json({message:"Cheers!! Your account is created.."});
    });
  });
});

router.post("/login",(req,res)=>{
  let{username} = req.body;
//checking username and password..
  let q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) {return res.status(500).json(err)};
    if (data.length === 0) {return res.status(404).json("User not found!")};
    let { password, ...other } = data[0];
    if(req.body.password===password){
res.status(200).json(other);
    }else{return res.status(400).json("Wrong username or password!")}  
    });
});
router.post("/logout", (req,res)=>{
    res.clearCookie("access_token",{sameSite:"none",secure:true}).status(200).json("User is logged out.")
});

export default router;

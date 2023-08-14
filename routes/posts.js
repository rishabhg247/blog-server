import express from "express";
import { db } from "../db.js";
const router = express.Router();

//api to get all the posts..
router.get("/", (req,res) => {
  let q = req.query.cat? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
  db.query(q,[req.query.cat],(err,data)=>{
    err?res.status(500).send(err):res.status(200).json(data);
  });
});

//api to get the post by ID...
router.get("/:id", (req,res) => {
  let postId = req.params.id;
  let q ="SELECT * FROM posts WHERE id=?";
  db.query(q, [postId], (err, data) => {
    err?res.status(500).send(err):res.status(200).json(data[0]);
  });
});

//api to add a new the post...
router.post("/", (req, res) => {
  let {title,desc,img,cat,date,uid}=req.body;
    let q ="INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
    let values = [title,desc,img,cat,date,uid];
    db.query(q, [values], (err,_) => {
      err?res.status(500).send(err) : res.json("Post has been created.");
    });
  });

//api to get username the post by ID...
router.get("/username/:id", (req, res) => {
  let postId = req.params.id;
  let q = "SELECT users.username FROM posts JOIN users ON posts.uid = users.id WHERE posts.id=?";
  db.query(q, [postId], (err, data) => {
    if(err){res.status(500).send(err)}
      if(data.length === 0){res.status(404).json({ error: "Post not found" });
      }else{res.status(200).json(data)}
    }
  );
});

//api to update the post comments by ID...
router.put("/:id", (req,res) => {
  let { resultString } = req.body;
  let postId = req.params.id;
  let q = "UPDATE POSTS SET `comments` = ? WHERE `id` = ?";
  let values = [resultString,postId];
    db.query(q, values, (err,_) => {
      err?res.status(500).send(err) : res.json("Your Comment is added");
    });
  });

export default router;

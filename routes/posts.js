const express = require('express');
const app = express();
app.use(express.json());
const { Posts, Users } = require('../database/mongooseInit');
const router = express.Router();

// API to get all the posts..
router.get("/", async (req, res) => {
  try {
    const cat = req.query.cat;
    const query = cat ? { cat: cat } : {};
    const posts = await Posts.find(query);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to get the post by ID...
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to add a new post...
router.post("/", async (req, res) => {
  try {
    const newPost = new Posts(req.body);
    await newPost.save();
    res.json("Post has been created.");
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Posts.findByIdAndDelete(postId);
    if (!deletedPost) {res.status(404).json({ error: "Post not found" })}
    else {res.status(200).json({ message: "Post deleted successfully" })}
  } catch (err) {res.status(500).send(err)}
});

// API to get username the post by ID...
router.get("/username/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to update the post comments by ID...
router.put("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    await Posts.findByIdAndUpdate(postId, { comments: req.body });
    res.json("Your Comment is added");
  } catch (err) {
    res.status(500).send(err);
  }
});

//API to register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Users.findOne({ $or: [{ email: email }, { username: username }] });
    if (existingUser) {
      return res.status(409).json({ message: "User or email already exists!" });
    }

    const newUser = new Users({
      username: username,
      email: email,
      password: password,
    });

    await newUser.save();
    return res.status(200).json({ message: "Cheers!! Your account is created.." });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username: username });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    if (user.password === password) {
      const { password: _, ...userData } = user.toObject();
      return res.status(200).json(userData);
    } else {
      return res.status(400).json("Wrong username or password!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", { sameSite: "none", secure: true }).status(200).json("User is logged out.");
});

module.exports = router;
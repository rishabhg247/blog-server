import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();

import path from "path";
const _dirname=path.dirname("");
const buildPath =path.join(_dirname,"../client/build");
app.use(express.static(buildPath));
app.get("/",(req,res)=>{
    res.sendFile(
        path.join(__dirname,'../client/build/index.html'),
        (err)=>{if(err){res.status(500).send(err)}}
    )
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {console.log("Connected to port 8800")});

const { Schema } = require('mongoose');

const postSchema = new Schema({
    username: Schema.Types.String,
    title: Schema.Types.String,
    desc: Schema.Types.String,
    img: Schema.Types.String,
    date: Schema.Types.String,
    cat: Schema.Types.String,
    comments: [
      { name: Schema.Types.String, comment: Schema.Types.String }
    ]
  });
  

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = { postSchema, userSchema };
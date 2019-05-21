const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const BoxSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
      },
      files: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
      }],
    },
    {
        timestamps: true
    }
);

const Box = mongoose.model("Box", BoxSchema);

module.exports = Box;
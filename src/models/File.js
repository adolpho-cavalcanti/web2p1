const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const FileSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        require: true,
      },
      /*box: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Box",
        require: true
      },*/
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
      },
    },
    {
        timestamps: true,
        toObject : { virtuals: true },
        toJSON : { virtuals: true }
    }
);
//Campo Virtual
FileSchema.virtual('url').get(function() {
  const url = process.env.URL || 'http://localhost:3333';
    
  return `${url}/files/${encodeURIComponent(this.path)}`;
})

const File = mongoose.model("File", FileSchema);

module.exports = File;
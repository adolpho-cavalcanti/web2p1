const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://elnino:elnino@cluster0-upvky.mongodb.net/pubvideo?retryWrites=true', 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
);

module.exports = mongoose;
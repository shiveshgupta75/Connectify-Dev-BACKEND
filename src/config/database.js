const mongoose=require('mongoose');

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://connectify:1234567pP@connectify.qnehvdh.mongodb.net/connectify"
)};

module.exports=connectDB;
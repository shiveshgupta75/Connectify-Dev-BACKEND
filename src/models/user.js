const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    firstName:{
          type:String,
          required:true,
          minLength:3,
          maxLength:30,
    },
    lastName:{
          type:String,
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
          type:String,
          validate(value){
            if(!["Male","Female","Other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
          }
    },
    photoUrl:{
        type:String,
        default:"https://i1.rgstatic.net/ii/profile.image/745778318417921-1554818815059_Q512/Rod-Hart.jpg",
    },
    about:{
        type:String,
        default:"This user prefers to keep an air of mystery about them.",
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,
});
const User=mongoose.model('User',userschema);
module.exports=User;
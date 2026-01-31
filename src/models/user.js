const mongoose=require('mongoose');
const validator=require("validator");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid :"+ value);
            }
        },
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }
        },
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
          type:String,
          enum:{
            values:["Male","female","Other"],
            message:`{VALUE} is not a valid gender type`
          },
          validate(value){
            if(!["Male","Female","Other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
          }
    },
    photoUrl:{
        type:String,
        default:"https://i1.rgstatic.net/ii/profile.image/745778318417921-1554818815059_Q512/Rod-Hart.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is invalid");
            }
        },
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

userschema.index({firstName:1,lastName:1});
userschema.methods.getJWT=async function(){
    const user=this;
    const token= await jwt.sign({_id: user._id},"Connectify@T",{expiresIn:"7d",});
    return token;
};

userschema.methods.verifyPassword=async function(passwordInputByUser){
    const user =this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}
const User=mongoose.model('User',userschema);
module.exports=User;
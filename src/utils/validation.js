const validator=require("validator");
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid !!😭");
    }
    else if(firstName.Length<3 || firstName.Length>30){
        throw new Error("First Name should be between 3 to 30 characters !!😠");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid !!😫");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough !!😤");
    }
};

module.exports={
    validateSignUpData,
}
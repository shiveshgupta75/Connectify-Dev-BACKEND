const express = require('express');
const profileRouter=express.Router();
const { UserAuth } = require('../middlewares/auth');
const{validateEditProfileData}=require("../utils/validation");
profileRouter.get("/profile/view", UserAuth,async(req,res)=>{
   try{
      const user=req.user;
      res.send(user);
} catch(err){
         res.status(500).send("ERROR :"+ err.message);
}
});


profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request !!");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach(
      (key) => (loggedInUser[key] = req.body[key])
    );

    await loggedInUser.save();

    res.json({
     message: `${loggedInUser.firstName} ${loggedInUser.lastName}, your profile updated successfully`,
     data:loggedInUser,
  });
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

module.exports=profileRouter;
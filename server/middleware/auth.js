const jwt = require("jsonwebtoken");
const config = require("../config/config");


const islogout = async(req,res,next)=>{
  try {
    const token = req.cookies.userid;

    if(typeof token === "undefined"){
      return res.redirect('login');
    }
    
    else{

      const verifyUser = jwt.verify(token, config.jwtSecret);

      if(verifyUser){
              
      }
      else{
        return res.redirect('login');
      }

    }

    next();

  } catch (error) {
    console.log(error);
  }
}



const islogin = async(req,res,next)=>{
  try {

    const token = req.cookies.userid;

    if(typeof token === "undefined"){

    }
    
    else{

      const verifyUser = jwt.verify(token, config.jwtSecret);

      if(verifyUser){

        return res.redirect('/');

      }
      else{

      }

    }

    next();

  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  islogout,
  islogin
}
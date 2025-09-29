import jwt from "jsonwebtoken";
import user from "../../model/userModel.js"
import sendOtpEmail from "../../utils/sendOtp.js";


export const enteremail = async (req, res) => {
  const {email} = req.body;

  if (!email) {
    return res.status(400).json({ success: false, msg: "Email is required" });
  }

  try {
    const u = await user.findOne({ email });

    if (!u) {
      return res.status(400).json({ success: false, msg: "User doesn't exist" });
    }
    const otp= String(Math.floor(100000+ Math.random()*900000)); 
   

      u.Otp=otp;
      u.OtpExpireAt=Date.now()+2*60*1000;  // 2 mins

      await u.save();


await sendOtpEmail(email,otp);
  
return res.json({success:true,msg:"OTP Sent"});

  
return res.json({success:true,msg:"User exists"});
  } catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

 
export const verifyOtp=async(req,res) =>{

const {email,userOtp}=req.body;
  if (!email) {
    return res.status(400).json({ success: false, msg: "Email is required" });
  }

const u = await user.findOne({ email });
 if (!u) {
      return res.status(400).json({ success: false, msg: "User doesn't exist" });
    }

if(!userOtp) {
    return res.json({success:false,msg:"OTP required"});
}
    // Check OTP
    try{
        

    // Check expiry
    if (Date.now() > u.OtpExpireAt) {
      return res.status(400).json({success: false, msg: "OTP has expired" });
    }

    // OTP is valid → clear it
    u.Otp = '';
    u.OtpExpireAt = 0;
    await u.save();

    
    // Generate JWT token
    const token = jwt.sign(
      { id: u._id, email: u.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully",
      token,
    }); 
    }
    catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
}




export default {verifyOtp,enteremail}















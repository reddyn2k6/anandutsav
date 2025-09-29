import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true }, 
Otp:{ type:String, default:'',},
    OtpExpireAt:{ type:Number, default:0,}, 
     fullName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
  phone: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  previousBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }]
}, { timestamps: true });

const user = mongoose.model("User", userSchema);    
export default user;
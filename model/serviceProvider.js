import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, 
  password: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Venue", "Singer", "Artist", "Decorator", "Caterer"], 
    required: true 
  },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
  phone: { type: String, required: true, unique: true }, 
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  previousProjects: [{ type: String }], 
  rating: { type: Number, default: 0 }
}, { timestamps: true });

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);
export default ServiceProvider;
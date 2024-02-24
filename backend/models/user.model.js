import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
  createdAt: {
    type: Date,
    default: Date.now
  },
  address:{
    type: String,
    required: true
  }
},
 {timestamps: true});

 userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          name: this.name
      },
      'verystrongsecret',
  )
}

export const User = mongoose.model("User", userSchema)

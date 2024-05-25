import { model, Schema, Document } from "mongoose";
import { User, UserRole } from "@interfaces/users.interface";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: Object.keys(UserRole),
    },
  },
  { timestamps: true }
);

const userModel = model<User & Document>("User", userSchema);

export default userModel;

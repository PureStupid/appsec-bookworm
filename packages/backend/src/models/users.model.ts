import { model, Schema, Document } from "mongoose";
import { User, UserRole } from "@interfaces/users.interface";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: UserRole,
    },
  },
  { timestamps: true }
);

const userModel = model<User & Document>("User", userSchema);

export default userModel;

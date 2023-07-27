import { Schema, model } from "mongoose";

const schema = new Schema({
  firstName: { type: String, max: 100 },
  lastName: { type: String, max: 100 },
  age: { required: false, type: Number },
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: false, max: 100 },
  cartID: { type: String, required: false, unique: true },
  role: { type: String, required: true, default: "user" },
});
export const UserModel = model("users", schema);

// ,index: true
// ,unique:true

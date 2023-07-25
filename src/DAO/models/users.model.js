import { Schema, model } from "mongoose";

const schema = new Schema({
        email: { type: String, required: true, max: 100 ,unique:true},    
        password: {type: String, required: false,max: 100 ,unique:true},
  });
  export const UserModel = model("users", schema);

// ,index: true
// ,unique:true

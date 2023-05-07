import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminLoginSchema = new Schema(
  {
    adminID: {
      type: mongoose.ObjectId,
      required: true,
      unique: true,
    },
    mail: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: 9,
    },
    pwd: {
      type: String,
      required: true,
      unique: false,
      minlength: 8,
    },
  },
  {
    collection: "adminLogin",
    timestamps: true,
  }
);

const AdminLoginModel = mongoose.model("adminLogin", adminLoginSchema);

export { AdminLoginModel };

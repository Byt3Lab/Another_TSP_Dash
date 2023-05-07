import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
    },
    forename: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
    },
    age: {
      type: Number,
      required: false,
      unique: false,
      minlength: 1,
    },
    genre: {
      type: String,
      required: false,
      unique: false,
      minlength: 1,
    },
    profilePic: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    roleLabel: {
      type: String,
      required: false,
      unique: false,
      default: "admin",
    },
    work_at: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
    },
    status: {
      type: Boolean,
      required: false,
      unique: false,
      default: true,
    },
  },
  {
    collection: "admin",
    timestamps: true,
  }
);

const AdminModel = mongoose.model("admin", adminSchema);

export { AdminModel };

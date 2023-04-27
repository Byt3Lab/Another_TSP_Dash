import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employSchema = new Schema(
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
    birthDate: {
      type: "String",
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
    },
    work_at: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
    },
    roleLabel: {
      type: String,
      required: true,
      unique: false,
    },
    status: {
      type: Boolean,
      required: true,
      unique: false,
      default: true,
    },
    goneDate: {
      type: String,
      required: false,
      unique: false,
    },
  },
  {
    timestamps: true,
    collection: "employ",
  }
);

const EmployModel = mongoose.model("employ", employSchema);

export { EmployModel };

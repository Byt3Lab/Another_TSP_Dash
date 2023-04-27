import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employLoginSchema = new Schema(
  {
    employID: {
      type: mongoose.Types.ObjectId,
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
    collection: "employLogin",
    timestamps: true,
  }
);

const EmployLoginModel = mongoose.model("employLogin", employLoginSchema);

export { EmployLoginModel };

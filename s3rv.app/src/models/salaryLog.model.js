import mongoose from "mongoose";
const Schema = mongoose.Schema;

const salaryLogSchema = new Schema(
  {
    employID: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: false,
    },
    logLabel: {
      type: String,
      required: true,
      unique: false,
    },
    logValue: {
      type: Number,
      required: true,
      unique: false,
    },
    logResult: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  {
    collection: "salaryLog",
    timestamps: true,
  }
);

const SalaryLogModel = mongoose.model("salaryLog", salaryLogSchema);

export { SalaryLogModel };

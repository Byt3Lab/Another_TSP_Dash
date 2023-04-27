import mongoose from "mongoose";
const Schema = mongoose.Schema;

const salaryStateSchema = new Schema(
  {
    employID: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    salary: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  {
    collection: "salaryState",
    timestamps: true,
  }
);

const SalaryStateModel = mongoose.model("salaryState", salaryStateSchema);

export { SalaryStateModel };

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shussekiLogSchema = new Schema(
  {
    timeLabel: {
      type: String,
      required: false,
      unique: false,
      default: () => {
        return moment().format("LLLL");
      },
    },
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
  },
  {
    collection: "shussekiLog",
    timestamps: true,
  }
);

const ShussekiLogModel = mongoose.model("shussekiLog", shussekiLogSchema);

export { ShussekiLogModel };

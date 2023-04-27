import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

const shussekiSchema = new Schema(
  {
    dateLabel: {
      type: String,
      required: false,
      unique: false,
      default: () => {
        return moment().format("dd ll");
      },
    },
    rairin: {
      //attend
      type: [mongoose.Types.ObjectId],
      required: false,
      unique: false,
    },
    saru: {
      //leave
      type: [mongoose.Types.ObjectId],
      required: false,
      unique: false,
    },
    is_validated: {
      type: Boolean,
      required: false,
      unique: false,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "shusseki",
  }
);

const ShussekiModel = mongoose.model("shusseki", shussekiSchema);

export { ShussekiModel };

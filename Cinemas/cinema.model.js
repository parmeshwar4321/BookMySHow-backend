const mongoose = require("mongoose");
const cinemaSchema = new mongoose.Schema(
  {
    cinemaName: {
      type: String,
    },
    location: {
      type: String,
    },
    // movies: [
    //   {
    //     type: schema.Types.ObjectId,
    //     ref: "movie",
    //   }]

  },
  { timestamps: true }
);

const Cinema = mongoose.model("cinema", cinemaSchema);
module.exports = Cinema;

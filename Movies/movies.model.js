const mongoose = require("mongoose");
const schema = mongoose.Schema;
const moviesSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    rating: {
      type: Number,
    },
    languages: {
      type: Array,
      // enum: ["English", "Hindi", "Tamil", "Telgu", "Urdu"],
    },
    genre: {
      type: Array,
    },
    format: {
      type: Array,
    },
    certificate: {
      type: Array,
    },
    releaseDate: {
      type: Date,
    },
    cinema:[ {
      type: schema.Types.ObjectId,
      ref: "cinema",
    },]
  },
  { timestamps: true }
);

const Movies = mongoose.model("movie", moviesSchema);
module.exports = Movies;

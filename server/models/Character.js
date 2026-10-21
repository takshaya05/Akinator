const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    movie: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      trim: true,
      lowercase: true,
    },

    speciality: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "characters",
  }
);

module.exports = mongoose.model("Character", characterSchema);
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ticketSchema = new mongoose.Schema(
    {
        cinema: {
            type: schema.Types.ObjectId,
            ref: "cinema",
        },
        movie: {
            type: schema.Types.ObjectId,
            ref: "movie",
        },
        screen: {
            type: String
        },
        seats: {
            type: Array
        },
        userId: {
            type: schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const ticket = mongoose.model("ticket", ticketSchema);
module.exports = ticket;

import mongoose from "mongoose";

const connectionString = process.env.MONGO_URI || "";

export const db = mongoose.connect(connectionString, { dbName: 'boardgame-db'})
    .then(() =>
        console.log("Connected to MongoDB")
    ).catch(
        (error) => console.error(error)
    )
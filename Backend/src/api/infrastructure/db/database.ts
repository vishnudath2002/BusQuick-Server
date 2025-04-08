import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cleanarch", {
        });
        console.log('\x1b[34m%s\x1b[0m',"Database connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

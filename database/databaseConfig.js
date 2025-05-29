import mongoose from "mongoose";
import config from 'config';

const dbUri = config.get('DB.URI');
const mongooseOptions = config.get('DB.MONGOOSE');

const databaseConnection = async () => {
    try {
        console.log("Connecting to:", dbUri);
        const connection = await mongoose.connect(dbUri, mongooseOptions);
        if (connection) {
            console.log("Successfully connected to MongoDB Atlas!");
        }
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}

export default databaseConnection;

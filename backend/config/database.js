// Import the mongoose library.
// Mongoose is used to connect a Node.js application with MongoDB
// and provides methods to create schemas, models, and perform database operations.
import mongoose from "mongoose";

// Create an asynchronous function to establish a connection with MongoDB.
const connectDB = async () => {

    // mongoose.connect() attempts to connect to the MongoDB database.
    // process.env.MONGO_URI reads the MongoDB connection string
    // from the .env file.
    await mongoose.connect(process.env.MONGO_URI)

        // If the connection is successful, this block executes.
        .then(() => {

            // Print a success message in the terminal.
            console.log("Database connected");

        })

        // If any error occurs while connecting,
        // this block executes.
        .catch((error) => {

            // Print the error in the terminal.
            console.log(error);

        });
};

// Export the connectDB function so it can be imported
// and used in other files (such as index.js).
export default connectDB;














// Application Starts
//         │
//         ▼
// index.js imports connectDB
//         │
//         ▼
// connectDB() is called
//         │
//         ▼
// mongoose.connect(process.env.MONGO_URI)
//         │
//         ├───────────────┐
//         │               │
//         ▼               ▼
// Connection Success   Connection Failed
//         │               │
//         ▼               ▼
// "Database connected"  Print Error
//         │
//         ▼
// Application is ready to use MongoDB
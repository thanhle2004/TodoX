import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();


//middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'})); // Allow requests from the frontend


app.use("/api/tasks", tasksRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database. Server will not start.", error);
    process.exit(1); // Exit the process with an error code
});



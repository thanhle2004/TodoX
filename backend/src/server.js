import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();


//middleware
app.use(express.json());

if(process.env.NODE_ENV !== "production") {
    app.use(cors({origin: 'http://localhost:5173'})); // Allow requests from the frontend
}

app.use("/api/tasks", tasksRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database. Server will not start.", error);
    process.exit(1); // Exit the process with an error code
});



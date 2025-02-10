import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js"
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from "cors";


const app = express();

dotenv.config();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:["Content-Type","Authorization"],

}))

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

try {
    await mongoose.connect(DB_URI);
    console.log("connected to mongoDB");
} catch (error) {
    console.log(error);
}


// DEFINING ROUTES

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);


// Cloudionary Configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);

});
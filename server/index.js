import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
// import multer from "multer";
import authRoutes from "./routes/auth.js";
import mainRoutes from "./routes/main.js";
import { dataMigration } from "./migration.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
    {
        origin: [`http://localhost:3000`],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))

// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// /* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         const date = new Date().getTime();
//         const filename = file.originalname.replace(/\s+/g, "-");
//         const newFilename = `${date}-${filename}`;
//         req.body.picturePath = newFilename;
//         cb(null, newFilename);
//     },
// });
// const upload = multer({ storage });

// /* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);

app.use("/auth", authRoutes);
app.use("/api/recruitment", mainRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, status: 404, message: "Not found" });
});

const PORT = process.env.API_PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    await dataMigration();
    console.log("MongoDB connected successfully!");
}).catch((error) => console.log(`${error} did not connect`))
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

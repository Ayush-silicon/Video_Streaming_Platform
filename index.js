import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid"; 


const app = express();

// multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
    },
  });
  
  // multer configuration
  const upload = multer({ storage: storage });

// cors middleware
app.use(
    cors({
      origin: ["http://localhost:6000", "http://localhost:5173"],
      credentials: true,
    })
  ); 
 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// this is our temporary storage for lessons
const lessons = {};

// upload route handler
app.post("/upload", upload.single("file"), function (req, res) {
  console.log("file uploaded ");
  //res.send("File uploaded successfully");
});

app.get("/", function (req, res) {
    res.json({ message: "Hello World!" });
  });

app.listen(6000, function () {
    console.log("App listening on port 6000!");
  });




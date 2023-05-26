require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("./database");
const cors = require("cors");
const { verifyToken } = require("./util/token.util");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/posts", require("./routes/post.route"));
// token middleware

app.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const decoded = verifyToken(token);
    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
});
app.use("/api/users", require("./routes/users.route"));
app.use("/api/upload", require("./routes/uploadfile.route"));
app.use("/api/comments", require("./routes/comment.route"));
app.use("/api/likes", require("./routes/like.route"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// .env ga kirib databaseni linkini joylab qoyasan
// odatda localniy holati mongodb://... bilan edi adashmasam 
// ok? ha  hozir ham shunay  qildim  
//qara hozir e aytgancha  in mongodb darkornimi 
// ha darkor holiyam

// shuni install qilib keyin npm start qilib kor ishlashi kerak a
// portga mongodbni portini  qoyamanmi
// yoq shartmas po
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./util/database");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");

const app = express();
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(userRouter);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is working on port 3000");
    });
  })
  .catch((err) => console.log(err));

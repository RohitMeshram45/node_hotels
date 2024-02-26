const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db.js")

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello! How can I help you?");
});



const personRoute = require("./routes/personRoutes.js")
const menuRoute = require('./routes/menuRoute.js')

//  Routing the Person and Menu from Express Routing
app.use("/menu", menuRoute)
app.use("/person", personRoute)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

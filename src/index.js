const express = require("express");
const movieRoutes = require("./routes/movies");
const categoryRoutes = require("./routes/categories");
const movcatRoutes = require("./routes/movcat");

const app = express();
const port = 3030;

app.use(express.json());
app.use(movieRoutes);
app.use(categoryRoutes);
app.use(movcatRoutes);

app.listen(port, () => {
  console.log("running API port " + port);
});

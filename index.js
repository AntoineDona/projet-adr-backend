const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});
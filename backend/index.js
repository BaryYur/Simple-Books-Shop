const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/books", (req, res) => {
    req.json();
})

app.listen(PORT, () => {
    console.log('Server is open on port: ', PORT);
});
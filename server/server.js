const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const userRouter = require("./Routes/User");
app.use("/api", userRouter);

db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("Server running on port 8080");
    });
});
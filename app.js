const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('connected to db...'))
    .catch(() => console.log('Couldnt connect'))

app.use(express.json());

//routes
app.use("/api/posts", require('./routes/post'))
app.use("/api/auth", require('./routes/user'))

//PORT listener
const port = process.env.PORT 
app.listen(port, () => {
    console.log("Server is running...")
})
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/dont-cancel", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const User = require('./models/User');

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/user/new', (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password
    });
    user.save();
    res.json(user);
});

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    res.json(result);
});

app.listen(3001, () => console.log("Server started on port 3001"));

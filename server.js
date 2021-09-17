require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.use(cors());

app.use(express.json());
app.use(require('./routes'));
require('./config/passport')(passport);
app.use(passport.initialize());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log('Server is started');
});

if (process.env.NODE_ENV === "production") {
	//Set Static folder
	app.use(express.static("build"));
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
  }
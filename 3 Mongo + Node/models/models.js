var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	created_dt: { type: Date, default: Date.now }
});

var postSchema = new mongoose.Schema({
	text: String,
	created_by: String,
	created_dt: { type: Date, default: Date.now }
});

//declare model
mongoose.model("User", userSchema);
mongoose.model("Post", postSchema);
// index.js
// mongoose schema definition 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Page, User;
var Schema = mongoose.Schema;

// define schemas
var pageSchema = new Schema({
	title: String,
	url_name: String,
	owner_id:   String,
	body:   String,
	date: { type: Date, default: Date.now },
	status: Number
});

var userSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  email: String
});

// compile schemas
Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

// define virtuals 

pageSchema.virtual('full_route').get(function() {
	return '/wiki/' + this.url_name;
});

// export
module.exports = {"Page": Page, "User": User};
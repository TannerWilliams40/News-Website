var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var loggedu;
var loggedp;

app.get('/create/', function(req, response) {
	var u = req.query.uname;
	var p = req.query.pass;

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("news");
		var myobj = { username: u, pass: p };
		/*dbo.dropCollection("users", function(err, delOK) {
    		if (err) throw err;
   			if (delOK) console.log("Collection deleted");
    		db.close();
 		 });*/
		var query = { username: u };
		dbo.collection("users").find(query).toArray(function(err, result) {
			if (err) {
				throw err;
				response.send("Invalid query.");
			}
			else if (result[0] == null) 
			{
			dbo.collection("users").insertOne(myobj, function(err, result) {
				if (err) {
					throw err;
					response.send("Error: account not created.");
				}
				else {
					console.log(result);
					console.log("1 account inserted");
					loggedu = u;
					response.send("Account successfully created.");
				}
					db.close();
				});
			}
			else
			{
				response.send("That email is already in use.")
			}
		});
	});
});

app.get('/login/', function(req, response) {
	var u = req.query.uname;
	var p = req.query.pass;

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("news");
		var query = { username: u };
		dbo.collection("users").find(query).toArray(function(err, result) { 
			if (err) {
				throw err;
				response.send("Invalid query");
			}
			else if (result[0] == null) {
					response.send("Username not found");
			}
			else {
				if(result[0].pass == p) {
					loggedu = u;
					console.log(result);
					response.send("Successfully logged in.");
				}
				else {
					response.send("Error: username and password does not match");
				}
			}
			db.close();
		});
	});
});

app.get('/getcurrentuser/', function(req,response) {
	console.log(loggedu);
	response.send(loggedu);
});
app.get('/clear/', function(req,response) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("news");
		dbo.dropCollection("articles", function(err, delOK) {
    		if (err) throw err;
   			if (delOK) console.log("Collection deleted");
    		db.close();
 		 });
	});
});
app.get('/clearu/', function(req,response) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("news");
		dbo.dropCollection("users", function(err, delOK) {
    		if (err) throw err;
   			if (delOK) console.log("Collection deleted");
    		db.close();
 		 });
	});
});
app.get('/populate/', function(req, response){
	var t = req.query.t;
	var s = req.query.s;
	var d = req.query.d;
	var a = req.query.a;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("news");
		var myobj = { title: t, story: s, date: d, submitted_by: a };
		var query = { title: myobj.title };
		dbo.collection("articles").find(query).toArray(function(err, result) {
			if (err) {
				throw err;
				response.send("Invalid query.");
			}
			else if (result[0] == null)
			{
				dbo.collection("articles").insertOne(myobj, function(err, result) {
					if (err) {
						throw err;
						response.send("Error.");
					}
					else {
						console.log("1 story inserted");
						var query = { title: myobj.title };
						dbo.collection("articles").find(query).toArray(function(err, result) {
							if (err) {
								throw err;
								response.send("Invalid query.");
							}
							else
							{
								//console.log(result[0]);
								response.send(result[0]);
							}
						});
					db.close();
					}
				});
			}
			else
			{
				response.send(result[0]);
			}
		});
	});
});
app.get('/add/', function(req, response){
	var t = req.query.title;
	var s = req.query.words;
	var temp = new Date();
	var d = temp.toLocaleDateString();
	var a = loggedu;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("news");
		var myobj = { title: t, story: s, date: d, submitted_by: a };
		dbo.collection("articles").insertOne(myobj, function(err, result) {
			if (err) {
				throw err;
				response.send("Error.");
			}
			else {
				console.log("1 story inserted");
				var query = { title: myobj.title };
				dbo.collection("articles").find(query).toArray(function(err, result) {
					if (err) {
						throw err;
						response.send("Invalid query.");
					}
					else
					{
						console.log(result[0]);
						response.send(result[0]);
					}
				});
			db.close();
			}
		});
	});
});
app.get('/grab/', function(req, response){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("news");
		dbo.collection("articles").find({}).toArray(function(err, result) {
			if (err) {
				throw err;
				response.send("Invalid query.");
			}
			else if (result[3] == null)
			{
				console.log(result);
				response.send("Empty")
			}
			else
			{
				console.log(result);
				response.send(result[3])
			}
		});
	db.close();
	});
});
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

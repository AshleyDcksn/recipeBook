"use strict"
/**
 * World's simplest express server
 * - used to serve index.html from /public
 */

var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var serveStatic = require('serve-static');
var router = express.Router();
var db = require("./ddb_getitem.js");

app.listen(3000);
console.log('Express listening on port 3000');
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(serveStatic(path.join(__dirname, 'public')));
/*Get one item view*/
app.set('view engine', 'hbs');



app.get("/", function(req,res,next){
	console.log('Index!!!!!!!!');
	var hour = new Date().getHours();
	if(hour < 10){
		//show breakfast
		//res.redirect("/getBreakfast");
	}else if(hour > 9 && hour < 15){
		//show lunch
		//res.redirect("/getLunch");
		res.redirect("/lunch");
	}else if(hour > 14 && hour < 20 ){
		//show dinner
		//res.redirect("/getDinner");
	}else{
		//show dessert
		//res.redirect("/getDessert");
}
});
app.get("/lunch", function(req,res,next){
	// Load the AWS SDK for Node.js
		var AWS = require('aws-sdk');
		// Set the region 
		AWS.config.update({region: 'us-east-2'});
		// Create the DynamoDB service object
		var conn = new AWS.DynamoDB({apiVersion: '2012-10-08'});
		
		var params = {
		  TableName: 'MyRecipes',
		  KeyConditionExpression:"#ct = lunch" ,
		  ExpressionAttributeNames: {
			  "#ct":"Category"
		  }
		};
		// Call DynamoDB to read the item from the table
		conn.query(params, function(err, data) {
		  if (err) {
			console.log("Error", err);
		  } else {
			//res.statusCode = 200;
			//res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
			console.log("logging... " + JSON.stringify(data,undefined,2));
			res.render('recipes', data.Item);
		  }
		});
});
app.get("/viewAll", function(req,res,next){
		// Load the AWS SDK for Node.js
		var AWS = require('aws-sdk');
		// Set the region 
		AWS.config.update({region: 'us-east-2'});
		// Create the DynamoDB service object
		var conn = new AWS.DynamoDB({apiVersion: '2012-10-08'});
		
		var params = {
		  TableName: 'MyRecipes',
		  Key: {
			'RecipeID' : {N: "1"},
		  }
		};
		// Call DynamoDB to read the item from the table
		conn.getItem(params, function(err, data) {
		  if (err) {
			console.log("Error", err);
		  } else {
			//res.statusCode = 200;
			//res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
			console.log("logging... " + JSON.stringify(data,undefined,2));
			res.render('recipes', data.Item);
		  }
		});
});


/* TODO: try again to export db calls..
	app.get("/test", function(req,res, next){
	var result = db.recipedb.getOneItem(req,res,next);
	console.log("result is " + result);
});*/
	
//module.exports = router;
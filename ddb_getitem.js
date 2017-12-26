exports.recipedb = {
	testVar : "hi",
	testFunc: function(){
		console.log("testFunc");
		return "tested Func";
	},
	getOneItem : function(cb){
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
			console.log("in db", data);
			cb(null, data);
			console.log("cb is " + cb);
			result = data;
			console.log("result", result);
			return cb(null, data);
		  }
		});
		
	}		
}
	

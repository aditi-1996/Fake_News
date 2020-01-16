var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
//var details =[];
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Mozscape = require('mozscape').Mozscape;
var moz = new Mozscape('mozscape-400537c3d8','a64ab632e16eaeb5a6673a5290d81aab');
var server = http.createServer(function(req,res){
	if(req.method.toLowerCase() == 'get')
	{
		displayForm(res);
	}
	else if(req.method.toLowerCase() == 'post')
	{
		 processFormFieldsIndividual(req,res);
	}
});

function displayForm(res)
{
	fs.readFile('form.html' , function(err,data){
		res.writeHead(200, {
				'Content-Type' : 'text/html' ,
				'Content-Length' : data.length
		});
		res.write(data);
		res.end();
	});
}
function processFormFieldsIndividual(req,res)
{
	var fields= [];
	var details=[];
	//var i=0;
	var form = new formidable.IncomingForm();
	form.on('field', function(field,value)
	{
		//console.log(field+'\t'+value);
		//console.log(value);
		fields = value;
		details=value;
		
	});

	form.on('end' , function(){
		res.writeHead(200,{
			"Content-Type":"application/json"
		});
		// res.write('recieved the data:\n\n\n');
		console.log(details+'\n');
		var url=String(details);
		moz.urlMetrics(url, ['url', 'links','mozRank','upa'], function(err, output) {
		if (err) {
			console.log(err);
			return;
		}
	//	res.write(output);
		var json = JSON.stringify(output);
		res.end(json);
		});
	});
	form.parse(req);
	
}
server.listen(1337, "127.0.0.1");
console.log("Server running at http://127.0.0.1:1337/");
//create web server
var express = require('express');
var router = express.Router();
var Comments = require('../models/comments');
var Users = require('../models/users');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

router.get('/', function(req, res){
	Comments.find({}, function(err, comment){
		if(err){
			console.log("Error retrieving comments");
			res.status(500).send("Error retrieving comments");
		}
		else{
			res.status(200).send(comment);
		}
	});
});

router.get('/:id', function(req, res){
	Comments.find({id: req.params.id}, function(err, comment){
		if(err){
			console.log("Error retrieving comment");
			res.status(500).send("Error retrieving comment");
		}
		else{
			res.status(200).send(comment);
		}
	});
});

router.post('/', jsonParser, function(req, res){
	var comment = new Comments({
		id: req.body.id,
		user_id: req.body.user_id,
		recipe_id: req.body.recipe_id,
		text: req.body.text
	});
	comment.save(function(err, comment){
		if(err){
			console.log("Error saving comment");
			res.status(500).send("Error saving comment");
		}
		else{
			res.status(200).send(comment);
		}
	});
});

router.put('/:id', jsonParser, function(req, res){
	Comments.findOne({id: req.params.id}, function(err, comment){
		if(err){
			console.log("Error retrieving comment");
			res.status(500).send("Error retrieving comment");
		}
		else{
			comment.id = req.body.id;
			comment.user_id = req.body.user_id;
			comment.recipe_id = req.body.recipe_id;
			comment.text = req.body.text;
			comment.save(function(err, comment){
				if(err){
					console.log("Error saving comment");
					res.status(500).send("Error saving comment");
				}
				else{
					res.status(200).send(comment);
				}
			});
		}
	});
});

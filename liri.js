// node packages
require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var omdbc = require("omdb-client");
var request = require("request");
var fs = require("fs");

//import keys.js
keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//cl arguments
var args = process.argv;
command = args[2];
target = args[3];

//spotify function
var spotifySearch = function(songName){
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	  console.log(JSON.stringify(data.tracks.items[0].name,null,3)); 
	});
};
//twitter function
var tweetLog = function() {
	var params = {screen_name: "vsambros", tweet_mode: "extended"};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (i = 0; i < tweets.length; i++) {
				console.log(tweets[i].user.name + " tweeted: \n'" + tweets[i].full_text + "' \n" + tweets[i].created_at + "\n~~~~~~~~~~~~~~");
			};
		} else { console.log(error)};
		});
};
//omdb function 
var movieSearch = function(){
	var params = {apiKey: 'trilogy', title: target}
	omdbc.get(params, function(err, data) {
	    // process response...
	    console.log("title: "+data.Title +"\n year: "+data.Year +"\n imdb rating: "+ data.Ratings[0].Value+"\n RT: "+data.Ratings[1].Value+"\n lang: "+data.Language+"\n plot: "+data.Plot+"\n actors: "+data.Actors);
	});
};

//read from file 
var reader = function(){
	fs.readFile("random.txt","UTF8",function(err,data){
		if(err) throw err;
		if(data.indexOf(",")== -1){
			command = data
		} else{
			command = data.substring(0,data.indexOf(","));
			target = data.substring(data.indexOf(",")+1,data.length).trim();
		}
		functionSwitcher();
	});
}



//function that reads a command from the text file
var functionSwitcher = function(){
	switch(command){
		case "my-tweets":
			console.log("print tweets");
			tweetLog();
			break;
		case "spotify-this-song":
			console.log("look up" +target);
			spotifySearch(target);
			break;
		case "movie-this":
			console.log("look up a movie");
			movieSearch();
			break;
		case "do-what-it-says":
			console.log("what it says");
			reader();
			break;
		default:
			console.log("fix your syntax");
	};
};

functionSwitcher();





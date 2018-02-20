
// node packages
require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var request = require("request");

//import keys.js
keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//cl arguments
var args = process.argv;
command = args[2];
console.log(args);



//twitter stuff
var params = {screen_name: 'vsambros'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
  }
});

//spotify stuff here 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 



console.log(JSON.stringify(data.tracks.items[0].name,null,3)); 
});

switch(command){
	case "tweets":
		console.log("print tweets");
		break;
	case "spotify":
		console.log("look up song");
	default:
		console.log("fix your syntax");
}


require("dotenv").config();


var Spotify = require("node-spotify-api");

require("request");
var Twitter = require("twitter");

//import keys.js
keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//console.log(spotify)
//console.log(client)

var params = {screen_name: 'vsambros'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
  }
});


spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(JSON.stringify(data.tracks,null,4)); 
});
require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var x = "";
var nodeArgv = process.argv;
var command = process.argv[2];
var request = require('request');
var moment = require('moment');
var fs = require('fs');

for (var i = 3; i < nodeArgv.length; i++){
    if (i > 3 && i < nodeArgv.length){
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

switch (command) {
    case "spotify-this-song":
   if(x){
       spotifySong(x);
   }else {
       spotifySong("Closer To The Sun");
   }
      break;
    
    case "movie-this":
    if(x){
        omdbMovie(x);
    }else {
        omdbMovie("The Mask");
    }
      break;
    
    case "concert-this":
    //   withdraw();
      break;
    
    case "do-what-it-says":
    //   lotto();
      break;
    }

function spotifySong(song){
 
spotify.search({ type: 'track', query: song, limit:3 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }else {
        for (var i = 0; i < data.tracks.items.length; i++){
            var spotifydata = data.tracks.items[i];
            console.log("Artist: "+ spotifydata.artists[0].name);
            console.log("Song: "+ spotifydata.name);
            console.log("previewURL: "+spotifydata.preview_url);
            console.log("Album: "+ spotifydata.album.name);
            console.log("--------------------------------------------------------------------");

            

        }
       
    }
// console.log(spotifydata);
// console.log(data.tracks);
});
}

function omdbMovie(movieName){
 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl,function(err, response, body) {

                var body = JSON.parse(body);

                console.log("Title: " + body.Title);
                console.log("Year: " + body.Year);
                console.log("Rated: " + body.Rated);
                console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
                console.log("Country created: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);


                // console.log("Title: "+ spotifydata.artists[0].name);
                // console.log("Song: "+ spotifydata.name);
                // console.log("previewURL: "+spotifydata.preview_url);
                // console.log("Album: "+ spotifydata.album.name);
                console.log("--------------------------------------------------------------------");

                
    

           
  
    // console.log(spotifydata);
    // console.log(data.tracks);
    });
    }
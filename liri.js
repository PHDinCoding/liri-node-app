var command1 = process.argv[2];
var command2 = process.argv[3];
var aOfBaseKey = "0hrBpAOgrt8RXigk83LLNE";

var keys = require('./keys.js');
var Twitter = require('twitter');
var fs = require('fs');
var spotify = require('spotify');

//Twitter keys instantiation.....
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

// var twitterCommand = "my_tweets";
// console.log(keys);
// console.log(keys.twitterKeys.consumer_key);

//When my-tweets gets passed, this function gets called
var twitterFunction = function(){
client.get('statuses/home_timeline', function(error, tweets, response) {
    if (!error) {
    //  console.log(tweets);
    //!!!Using this to get the tweets in a stringify format so I can make sense of this..... Nothing to see here...
    //  fs.appendFile('json.txt', JSON.stringify(tweets), (err) => {
    //     if (err) throw err;
    //     console.log('The "data to append" was appended to file!');
    // });
    for(i=0; i<tweets.length; i++){

        console.log(tweets[i].text);
        
    }
  }
});
};

//When spotify-this-song gets passed, this function gets called
var spotifyFunction = function(){
spotify.search({ type: 'track', query: command2 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // console.log(JSON.stringify(data));
    
    
    var randomNum = Math.floor(Math.random() * data.tracks.items.length);

    var artist = JSON.stringify((data).tracks.items[randomNum].album.artists[0].name);
    var song = JSON.stringify((data).tracks.items[randomNum].name);
    var preview = JSON.stringify((data).tracks.items[randomNum].preview_url);
    var album = JSON.stringify((data).tracks.items[randomNum].album.name);

    console.log("\n");
    console.log("Artist: " + artist + "\n" + "Song: "+ song + "\n" + "Preview: " +preview +"\n"+ "Album: "+album);
    console.log("\n");
    
//Just for my use, to parse JSON for my sanity......
    // fs.writeFile('spotify_json.json', JSON.stringify((data).tracks.items[0].album.name), (err) => {
    //     if (err) throw err;
    //     console.log('The "data to append" was appended to file!');
    // });

});
};

var theSign = function(){
    spotify.lookup({ type: 'track', id:aOfBaseKey }, function(err, data) {
        
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // console.log("This is from theSign function");
    // console.log(JSON.stringify(data));
    // var randomNum = Math.floor(Math.random() * data.tracks.items.length);
    
    // console.log(data);
    var artist = data.album.artists[0].name;
    var song = data.name;
    var preview = data.preview_url;
    var album = data.album.name;
     
     console.log("\n");
     console.log('"'+song +'"'+ " by " + artist);
     console.log("Preview of the song: " + preview);
     console.log("Album: " + album);
     console.log("\n");
    
    
// // Just for my use, to parse JSON for my sanity......I know.....
//     fs.writeFile('spotify_json.json', JSON.stringify(data), (err) => {
//     // fs.writeFile('spotify_json.json', JSON.stringify(song + " by " + artist), (err) => {
//         if (err) throw err;
//         console.log('The "data to append" was appended to file!');
//     });

});
};



// console.log(client);

switch(command1){
    //This is a twitter API at work
case "my-tweets":
{    
    twitterFunction(); 
        break;
}
    //This is spotify API at work
case "spotify-this-song": 
{
 //Check to see if the 4th element of the command line arg is null if that's false
 //then the AND condition fails and goes to the Else part.
    if( process.argv[3] == null  && command1 === "spotify-this-song")
    {
        theSign();
        
        
    }else
    {
        spotifyFunction();
    }
        break;
}

default:{
    console.log("\n");
    console.log("Please check your command, you might have misspelled something?");
    console.log("\n");
}
}




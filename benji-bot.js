/*
Benji-Bot, a simple pet to bring joy to your server :)
*/

//Imports
const Discord = require('discord.js');
var fs = require('fs');

//Extract login and command data from the json files
var logindata = JSON.parse(fs.readFileSync('login.json'));
var botid = logindata['botid'];
var botusername = logindata['botusername'];
var bottoken = logindata['bottoken'];
;var channelname = logindata['channelname']

var tricksdata = JSON.parse(fs.readFileSync('tricks.json'));
var commands = tricksdata['Commands'];
var config = tricksdata['Configuration'];

//Create bot
const bot = new Discord.Client();

//On connection code
bot.on('ready', () => {
    console.log('I am ready! Logged in as ' + bot.user);
  });

  //On message code
bot.on('message', message => {
    if(message.channel.name == channelname){
        var messageText = message.content.toLowerCase();
        if(messageText === "!commands") {
            var benjiWords = "Here is a list of everything Benji will respond to! To interact with Benji type \'benji! \' followed by a command!\n";

            for(var entry in commands) {
                    benjiWords += commands[entry]['Command'] + "\n";
            }
            message.channel.send(benjiWords);
            console.log("Writing our message: benjiWords");
        } else if(getFirstWord(messageText) === 'benji!'){
            var declaration = stripFirstWord(messageText);
            for(var entry in commands){
                if(commands[entry]['Command'] === declaration){
                    message.channel.send(commands[entry]['Response']);
                }
            }
        }
    }
});


//Connect the bot
bot.login(bottoken);

//----------------------------------------------------
//----------------Helper Functions--------------------
//----------------------------------------------------


//Returns first word if there are multiple words or the entire string if there are not.
function getFirstWord(message) {
    var index = message.indexOf(' ');
    if(index > -1){
        return message.substr(0,index);

    } else {
        return message;
    }   
}


// Removes the first word if there are multiple words or null if there is only one
function stripFirstWord (message) {
    var index = message.indexOf(' ');
    if(index > -1){
        return message.substr(index + 1);
    } else {
        return "null"
    } 
}
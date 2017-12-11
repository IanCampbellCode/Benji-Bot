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

/*
//set bot variables
bot.token = bottoken;
bot.id = botid;
bot.username = botusername;
*/

//On connection code
bot.on('ready', () => {
    console.log('I am ready! Logged in as ' + bot.user);
  });

  //On message code
bot.on('message', message => {
    console.log(message.content);
    console.log(message.channel.name);
    console.log(message.channel.name == channelname);
    console.log(message.content == !commands)
    if(message.channel.name == channelname){
        if(message.content == "!commands") {
            var benjiWords = "Here is a list of everything Benji will be able to do soon!\n";
            for(var entry in commands) {
                    benjiWords += commands[entry]['Command'] + "\n";
            }
            message.channel.send(benjiWords);
            console.log("Writing our message: benjiWords");
        } else if(message == "!benji sleep tight pupper") {
            console.log("We'll need to disconnect here");
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
    var index = message.substr(" ");
    if(index > -1){
        return message.substr(0,message.indexOf(" " + 1));
    } else {
        return message;
    }   
}


// Removes the first word if there are multiple words or null if there is only one
function stripFirstWord (message) {
    var index = message.substr(" ");
    if(index > -1){
        return message.substr(message.indexOf(" ") + 1);
    } else {
        return "null"
    } 
}
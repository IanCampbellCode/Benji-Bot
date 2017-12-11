var Discord = require('discord.io');
var fs = require('fs');

var logindata = JSON.parse(fs.readFileSync('login.json'));
var botid = logindata['botid'];
var botusername = logindata['botusername'];
var bottoken = logindata['bottoken'];
var channelid = logindata['channelid'];

var tricksdata = JSON.parse(fs.readFileSync('tricks.json'));
var commands = tricksdata['Commands'];
var config = tricksdata['Configuration'];

//create bot
var bot = new Discord.Client({
    autorun: false
});

//set bot variables
bot.token = bottoken;
bot.id = botid;
bot.username = botusername;


bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
}); 

bot.on('message', function(botusername, botid, channelid, message, event) {
    if(message == !commands) {
        var benjiWords = "Here is a list of everything Benji will be able to do soon!\n";
        for(var entry in commands) {
                benjiWords += commands[entry] + "\n";
        }

        bot.sendMessage({
            to: channelid,
            message: benjiWords
        });
        console.log("Writing our message: benjiWords");
    } else if(message == "!benji sleep tight pupper") {
        console.log("We'll need to disconnect here");
    }
});


//Connect the bot
bot.connect();

var benjiWords = "Here is a list of everything Benji will be able to do soon!\n";
for(var entry in commands) {
        benjiWords += JSON.stringify(commands[entry]) + "\n";
}
console.log(bot.connect());
bot.sendMessage({
    to: channelid,
    message: benjiWords
});

console.log("Writing our message:\n" + benjiWords);


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
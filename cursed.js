const {
    Client,
    Attachment
} = require('discord.js');
const bot = new Client();

const cheerio = require('cheerio');

const request = require('request');



const token = 'NjE5NjA3Mzc1NDkzNDY0MDg0.XXKsjw.o1LNrdycQNW8IrIznTYPWXk6xXo';

const PREFIX = 'a!';

var version = '1.3';


bot.on('ready', () => {
    console.log('This bot is online! ' + version);

})




bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'image':
        image(message);

        break;
    }

});

function image(message){

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "cursed image",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };





    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
  
 
        $ = cheerio.load(responseBody); 
 

        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        
        console.log(urls);

        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 







}

bot.login(token);
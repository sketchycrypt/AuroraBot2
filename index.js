const config = require('./config.json');
const Discord = require('discord.js')
const bot = new Discord.Client();
const cheerio = require('cheerio')
const request = require('request')

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

const PREFIX = 'a!';

bot.on('ready' , () =>{
    console.log('This bot is now online')
    bot.user.setActivity('with time and space' , { type : 'PLAYING'}).catch(console.error);
})

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return

    channel.send(`Welcome!, ${member}`)
});

const usedCommandRecently = new Set();

bot.on('message', msg=>{

    const ownerSent = (msg.author.id === '470180449163935744')
    const args = msg.content.slice(PREFIX.length).split(' ');
    if (!msg.content.startsWith(PREFIX)) return;

    switch(args[0]){

           case 'website' :
             msg.channel.sendMessage('https://auroraservers.net/')
            break;

            case 'cursed':
                cursed(msg)
            break;
            
            case 'info':
                if(args[1] === 'version'){
                    msg.channel.sendMessage('This bot is in version 1.0.0')
                }else{
                    msg.channel.sendMessage(':no_entry_sign: | Please put a valid argument')
                }
                break;

                case 'token':
                    if(ownerSent) {
                        msg.author.send('||NjE5NjA3Mzc1NDkzNDY0MDg0.XXKsjw.o1LNrdycQNW8IrIznTYPWXk6xXo||')                        
                    }else {
                        msg.channel.sendMessage(':no_entry_sign: | Restricted Access')
                    }
                break;

                case 'warn':
            const mentionedUser = msg.mentions.users.first();
                    if(msg.member.hasPermission('MANAGE_GUILD')){
                        let reason = args.slice(2).join(' ')
                        mentionedUser.send(`**You were warned in ${msg.guild.name} for** : ` + reason)
                    }else {
                        msg.channel.sendMessage('You do not have enough permission')
                    }
                break;

                case 'credit':
                    msg.channel.sendMessage('**Main coding** : sketchy \n**Help from** : CommieDog')
                break;

                case 'pardon':
            const mentionedUser2 = msg.mentions.users.first();
                    if(msg.member.hasPermission('MANAGE_GUILD')){
                        let reason = args.slice(2).join(' ')
                        mentionedUser2.send(`**You were pardoned in ${msg.guild.name} for** : ` + reason)
                    }else {
                        msg.channel.sendMessage('You do not have enough permission')
                    }
                break;

                case 'kek':
                    const kek = new Discord.RichEmbed()
                    .setImage('https://archive-media-1.nyafuu.org/bant/image/1495/84/1495841700462.jpg')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(kek)
                break;


                case 'ping':
                    msg.channel.sendMessage('Pong!')
                break;
               

                case 'status':
                    msg.channel.sendMessage('**Bot status** : :gear: Being developed on')
                    msg.channel.sendMessage('**Version** : 1.0.0')
                break;

                case 'clear':
                    if(msg.member.hasPermission('MANAGE_MESSAGES')) {
                        msg.channel.bulkDelete(args[1]);
                    }else {
                        msg.channel.sendMessage("Insufficient Permission")
                    }
                break;

                case 'dancing':
                    const dancing = new Discord.RichEmbed()
                    .setImage('https://i.kym-cdn.com/photos/images/newsfeed/000/059/601/spiderman116_spideydancing1.gif')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(dancing);
                break;

        
                case 'userprofile':
                    const embed = new Discord.RichEmbed()
                    .setTitle('**User Information**')
                    .addField('User', msg.author.username)
                    .addField('Current Server', msg.guild.name)
                    .addField('User ID' , msg.author.id)
                    .setColor(0x00FFF8)
                    .setThumbnail(msg.author.avatarURL)
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(embed);
                break; 

                case 'help':
                    const help = new Discord.RichEmbed()
                    .setTitle('Commands')
                    .addField('**a!website**' , 'Website for Aurora!')
                    .addField('**a!userprofile**' , 'Shows your user profile')
                    .addField('**a!help**' , 'shows this window')
                    .addField('**a!status**' , 'shows status of the bot')
                    .addField('**a!serverinfo**' , 'shows server info')
                    .addField('**a!reaction**' , 'opens up the help menu for reaction commands')
                    .addField('**a!staffhelp**' , 'Opens a section of help for staff members.')
                    .addField('**a!avatar**' , 'shows avatar of mentioned user, if no user is mentioned than it shows your avatar')
                    .setColor(0x00FFF8)
                    
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(help);
                break;

                case 'reaction':
                    const reaction = new Discord.RichEmbed()
                    .setTitle('Reactions')
                    .addField('**a!sad**' , 'Sends sad picture of cat')
                    .addField('**a!elmo**' , 'Picture of elmo with a scared face')
                    .addField('**a!happy**' , ':D')
                    .addField('**a!scream**' , 'NOOOOO')
                    .addField('**a!peanut**' , 'the holy peanut')
                    .addField('**a!F**' , 'F')
                    .addField('**a!uwu**' , 'uwu')
                    .addField('**a!owo**' , 'owo')
                    .addField('**a!dancing**' , 'doo doo doo peter')
                    .addField('**a!kek**' , 'doggo likes the kek')
                    .addField('**a!epic**' , 'Now thats epic')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(reaction)
                break;

                case 'peanut':
                    const peanut = new Discord.RichEmbed()
                    .setImage('https://steamuserimages-a.akamaihd.net/ugc/930435675451015520/F6CEA71B8E123B6532576A34F7493D31D9D67A41/')
                    .setFooter('beep boop i am a bot')
                    .setColor(0x00FFF8)
                    msg.channel.sendEmbed(peanut)
                break;

                case 'sad':
                    const sad = new Discord.RichEmbed()
                    .setImage ('https://66.media.tumblr.com/cda7e1958de7f8dcb34151143035a967/tumblr_pgp91sWx0N1vmskmwo4_500.jpg')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(sad);
                break; 

                case 'elmo':
                    const elmo = new Discord.RichEmbed()
                    .setImage('https://data.whicdn.com/images/329365235/large.jpg')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(elmo)
                break;

                case 'happy':
                    const happy = new Discord.RichEmbed()
                    .setImage ('https://i.imgflip.com/38nqie.jpg')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(happy)
                break;

                case 'scream':
                    const scream = new Discord.RichEmbed()
                    .setImage ('https://pbs.twimg.com/media/Dxe69DhV4AEis7e.jpg')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(scream)
                break;


                case 'serverinfo':
            const serverinfo = new Discord.RichEmbed()
            .setTitle('**Server Info**')
            .setAuthor(msg.guild.name , msg.guild.iconURL)
            .addField('Total members: ' , msg.guild.memberCount)
            .addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
            .setThumbnail(msg.guild.iconURL)

            .setColor(0x00FFF8)

            .setFooter('beep boop i am a bot')
            msg.channel.sendEmbed(serverinfo);

        break;

              case 'F':
                  const F = new Discord.RichEmbed()
                  .setImage('https://numbersandletters.com/images/products/1546.gif')
                  .setFooter('beep boop i am a bot')
                  msg.channel.sendEmbed(F)
                break;

                case 'epic':
                    const epic = new Discord.RichEmbed()
                    .setImage('https://s3.amazonaws.com/word-art/5d8780c0d7a4c6254ea68e18.png')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(epic)
                break;

                case 'meme':
                    meme(msg)
                break;

    
                case 'uwu':
                    const uwu = new Discord.RichEmbed()
                    .setImage('https://i.scdn.co/image/757bb1e2e3cb6cbaa1578b5cdad8a3a0eeb7b6cc')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(uwu)
                break;

                case 'owo':
                    const owo = new Discord.RichEmbed()
                    .setImage('https://res.cloudinary.com/teepublic/image/private/s--4KdhPyGV--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1541978527/production/designs/3484388_0.jpg')
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(owo)
                break;

                case 'kick':
                                if(msg.member.hasPermission('MANAGE_GUILD'))
                                {
                                    if(!args[1]) return msg.reply(':no_entry_sign: | Please enter a user to kick');
                                    const mentionedUserkick = msg.mentions.users.first();
                                    let kickReason = args.slice(2).join(' ')
                                    mentionedUserkick.send(`You have been kicked in ** ${msg.guild.name} ** for ` + kickReason)
                                    var member= msg.mentions.members.first();
                                    member.kick().then((member) => {
                                        msg.channel.send(member.displayName + " has been thrown into the void. ");
                                    })
                    
                               }else {
                                   msg.channel.sendMessage(':no_entry: | Insufficient Permission')
                               }
                            break;

                            case 'staffhelp':
                                if(msg.member.hasPermission('MANAGE_CHANNELS'))
                                {
                                    const staffhelp = new Discord.RichEmbed()
                                    .setTitle('Help commands for Staff')
                                    .addField('**a!kick**' , 'Kicks members from server, requires manage guild')
                                    .addField('**a!ban**' , 'Bans members from the discord, also needs manage guild perms')
                                    .addField('**a!clear**' , 'Clears desired messages')
                                    .addField('**a!warn**' , 'Warns member')
                                    .addField('**a!pardon**' , 'Pardons user who was warned')
                                    .setFooter('beep boop i am a bot')
                                    msg.channel.sendEmbed(staffhelp)
                                }else {
                                    msg.channel.sendMessage(':no_entry_sign: | Insufficient Permission')
                                }
                            break;

                            case 'ban':
                                    if(msg.member.hasPermission('MANAGE_GUILD'))
                                    {
                                        if(!args[1]) return msg.reply(':no_entry_sign: | Please enter a user to ban');
                                        const mentionedUserBan = msg.mentions.users.first();
                                        let banReason = args.slice(2).join(' ')
                                        mentionedUserBan.send(`You have been banned in ** ${msg.guild.name} ** for ` + banReason)
                                        var member= msg.mentions.members.first();
                                        member.ban().then((member) => {
                                            msg.channel.send(member.displayName + " has been deleted from existence. ");
                                        })
                        
                                   }else {
                                       msg.channel.sendMessage(':no_entry: | Insufficient Permission')
                                   }
                                break;
                            

                           

            

                case 'avatar': 
        if (!msg.mentions.users.size)
        {
            return msg.channel.send(`Your avatar: ${msg.author.displayAvatarURL}`);
        }
            const avatarList = msg.mentions.users.map(user => {
            return `${user.username}\'s avatar: ${user.displayAvatarURL}`;
        });
            msg.channel.send(avatarList);

        break;


       

             
                
    }
    
});

function cursed(msg){

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
        const cursedf = new Discord.RichEmbed()
        .setImage( urls[Math.floor(Math.random() * urls.length)])
        .setFooter('beep boop i am a bot')
        msg.channel.sendEmbed(cursedf)
    });
}


function meme(msg){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "modern meme",
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
        const memem = new Discord.RichEmbed()
        .setImage( urls[Math.floor(Math.random() * urls.length)])
        .setFooter('beep boop i am a bot')
        msg.channel.sendEmbed(memem)
    });
}

const http = require('http')
var server = http.createServer();
server.listen(process.env.PORT || 5000)

setInterval(function() {
    http.get("http://aurorabot2k19.herokuapp.com/");
    console.log("Pinged!")
}, 300000);

bot.login(config.token);
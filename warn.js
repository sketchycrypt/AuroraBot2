const Discord = require('discord.js');
exports.run = (bot, msg, args) => {
    var embedColor = '#ffffff' // Change this to change the color of the embeds!
    
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `a!warn [@User] [Reason]')
        .setTimestamp();
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = msg.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return msg.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return msg.channel.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle(`You've been warned in ${msg.guild.name}`)
        .addField('Warned by', msg.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
        .setTitle('User Successfully Warned!');
        msg.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
        msg.delete(); // Deletes the command
}
exports.help = {
  name:"warn"
}
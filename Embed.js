const Discord = require('discord.js');

module.exports.buildErrorEmbed = function(error){
  const embed = new Discord.MessageEmbed()
    .setAuthor("Remind Bot")
    .setTitle(error + " - See Commands Below")
    .setColor('#FF0000')
    .setDescription("$remind touch \n" +
                    "$remind setreminder {DATE} {TIME} {CHANNELID} {REMINDER} \n" +
                    "   ex: $remind setreminder 8/23/2021 1430 879207683134222358 funko drop at 12 \n" +
                    "$remind help")
    .setFooter('Remind Bot - created by @lilcpap#3949', 'https://cdn.discordapp.com/avatars/503957762586443786/1ef858f678f2fd63f25181bf461d5834.png');
  return(embed);
}

module.exports.buildHelpEmbed = function(){
  const embed = new Discord.MessageEmbed()
    .setAuthor("Remind Bot")
    .setTitle("Remind Commands")
    .setColor(0x0)
    .setDescription("$remind touch \n" +
                    "$remind setreminder {DATE} {TIME} {CHANNELID} {REMINDER} \n" +
                    "   ex: $remind setreminder 8/23/2021 1430 879207683134222358 funko drop at 12 \n" +
                    "$remind help")
    .setFooter('Remind Bot - created by @lilcpap#3949', 'https://cdn.discordapp.com/avatars/503957762586443786/1ef858f678f2fd63f25181bf461d5834.png');
  return(embed);
}

module.exports.buildTouchEmbed = function(){
  const embed = new Discord.MessageEmbed()
      .setTitle('Remind Bot is online')
      .setColor('#57FF33')
      .setFooter('Remind Bot - created by @lilcpap#3949', 'https://cdn.discordapp.com/avatars/503957762586443786/1ef858f678f2fd63f25181bf461d5834.png');
  return(embed);
}

module.exports.buildReminderEmbed = function(reminderObj){
  const embed = new Discord.MessageEmbed()
    .setAuthor("Remind Bot")
    .setTitle("Reminder")
    .setColor(0x0)
    .setDescription(reminderObj.reminder)
    .setFooter('Remind Bot - created by @lilcpap#3949', 'https://cdn.discordapp.com/avatars/503957762586443786/1ef858f678f2fd63f25181bf461d5834.png');
  return(embed);
}

module.exports.buildReminderCreationEmbed = function(reminder){
  const embed = new Discord.MessageEmbed()
      .setAuthor("Remind Bot")
      .setTitle("Reminder Set")
      .addFields(
        {name: 'Date:', value: reminder.date, inline: true},
        {name: 'Time:', value: reminder.time, inline: true}
      )
      .setColor('#3360FF')
      .setTimestamp()
      .setFooter('Remind Bot - created by @lilcpap#3949', 'https://cdn.discordapp.com/avatars/503957762586443786/1ef858f678f2fd63f25181bf461d5834.png')
      .setDescription(reminder.reminder);
  return(embed);
}

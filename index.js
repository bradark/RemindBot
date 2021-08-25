const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = 'ODc5MTk5MDk1NTk4Nzc2MzIw.YSMP9w.cjeuB_yW9lX3c780yRR-2T7aPh0';
var dataBase = require('./dbfunctions.js');

bot.login(TOKEN);

bot.on('message', msg => {
  if(msg.content.includes('$remind touch')){
    msg.channel.send(buildTouchEmbed());
  }else if(msg.content.includes('$remind setreminder')){
    setReminder(msg);
  }else if(msg.content.includes('$remind help')){
    msg.channel.send(buildHelpEmbed());
  }
})

function setReminder(msg){
  var splitMsg = msg.content.split(' ');
  if(splitMsg[2].length > 5){
    if(splitMsg[3].length == 4){
      if(splitMsg[4] > 15){
        var reminder = parseReminderCommand(msg.content);
        msg.channel.send(buildReminderCreationEmbed(reminder));
        createReminder(msg, reminder);
      }else{
        msg.channel.send(buildErrorEmbed("Invalid Channel"));
      }
    }else{
      msg.channel.send(buildErrorEmbed("Invalid Time"));
    }
  }else{
    msg.channel.send(buildErrorEmbed("Invalid Date"));
  }
}

function createReminder(msg, reminder){
  setTimeout(function(){
    var channel = bot.channels.cache.get(reminder.channel);
    channel.send(buildReminderEmbed(reminder));
  }, reminder.timeout);
}

function parseReminderCommand(command){
  var splitCmd = command.split(' ');
  var date = splitCmd[2];
  var splitDate = date.split('/');
  var time = splitCmd[3];
  var channel = splitCmd[4];
  var hours = time.charAt(0) + time.charAt(1);
  var minutes = time.charAt(2) + time.charAt(3);
  var month = splitDate[0];
  var day = splitDate[1];
  var year = splitDate[2];
  var reminder = '';
  for(let i = 5; i < splitCmd.length; i++){
    reminder = reminder + ' ' + splitCmd[i];
  }
  var now = new Date();
  var reminderDate = new Date(parseInt(year), (parseInt(month) - 1), parseInt(day), parseInt(hours), parseInt(minutes), 0, 0);
  var timeout = (reminderDate.getTime() - now.getTime());
  var reminderObj = { date:date , time:time , reminder:reminder , timeout:timeout, channel:channel };
  console.log("Reminder created for -> " + reminderDate);
  return reminderObj;
}

function buildErrorEmbed(error){
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

function buildHelpEmbed(){
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

function buildTouchEmbed(){
  const embed = new Discord.MessageEmbed()
      .setTitle('Remind Bot is online')
      .setColor('#57FF33')
      .setFooter('Remind Bot - created by @lilcpap#3949', 'https://cdn.discordapp.com/avatars/503957762586443786/1ef858f678f2fd63f25181bf461d5834.png');
  return(embed);
}

function buildReminderEmbed(reminderObj){
  const embed = new Discord.MessageEmbed()
    .setAuthor("Remind Bot")
    .setTitle("Reminder")
    .setColor(0x0)
    .setDescription(reminderObj.reminder)
    .setFooter('Remind Bot - created by @lilcpap#3949', 'https://cdn.discordapp.com/avatars/503957762586443786/1ef858f678f2fd63f25181bf461d5834.png');
  return(embed);
}

function buildReminderCreationEmbed(reminder){
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

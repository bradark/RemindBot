const Discord = require('discord.js');
const Embed = require('./Embed.js');
const bot = new Discord.Client();
const TOKEN = 'ODc5MTk5MDk1NTk4Nzc2MzIw.YSMP9w.cjeuB_yW9lX3c780yRR-2T7aPh0';
var dataBase = require('./dbfunctions.js');

bot.login(TOKEN);

bot.on('message', msg => {
  if(msg.content.includes('$remind touch')){
    msg.channel.send(Embed.buildTouchEmbed());
  }else if(msg.content.includes('$remind setreminder')){
    setReminder(msg);
  }else if(msg.content.includes('$remind help')){
    msg.channel.send(Embed.buildHelpEmbed());
  }
})

function setReminder(msg){
  var splitMsg = msg.content.split(' ');
  if(splitMsg[2].length > 5){
    if(splitMsg[3].length == 4){
      if(splitMsg[4] > 15){
        var reminder = parseReminderCommand(msg.content);
        msg.channel.send(Embed.buildReminderCreationEmbed(reminder));
        createReminder(msg, reminder);
      }else{
        msg.channel.send(Embed.buildErrorEmbed("Invalid Channel"));
      }
    }else{
      msg.channel.send(Embed.buildErrorEmbed("Invalid Time"));
    }
  }else{
    msg.channel.send(Embed.buildErrorEmbed("Invalid Date"));
  }
}

function createReminder(msg, reminder){
  setTimeout(function(){
    var channel = bot.channels.cache.get(reminder.channel);
    channel.send(Embed.buildReminderEmbed(reminder));
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

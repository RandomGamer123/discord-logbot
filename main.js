const Discord = require('discord.js');
const client = new Discord.Client();
const ramtid = 259943329028898816;
const jclid = 214869811547734016;
const logchannelramt = "modchat";
const logchanneljcl = "log";
const adchannelramt = "ads";
const token = process.env.TOKEN;
console.log('Starting Up.');
console.log(process.env.TOKEN);
console.log(token);
client.on('ready', () => {
  console.log(`Success!`);
});

client.on('messageDelete', message => {
    var logchannel = 0;
    if (message.guild.id == ramtid) {
      logchannel = logchannelramt;
    } else if (message.guild.id == jclid) {
      logchannel = logchanneljcl;
    } else {
        message.channel.send('An error has happened, please report this to RandomGamer123 #5222 immediately');
    }
    var channelobj = message.guild.channels.find("name", logchannel);
      var desc = "Message sent by <@" + message.member.id +"> deleted in <#" + message.channel.id + ">";
      channelobj.send({embed: {
        color: 16711680,
        title: "Message Deleted",
        description: desc,
        fields: [{
            name: "Original Message:",
            value: message.content
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "User id of original message sender: " + message.member.id
        }
      }
    });
  });
  client.on('messageUpdate', (message, emessage) => {
    var logchannel = 0;
    if (message.guild.id == ramtid) {
      logchannel = logchannelramt;
    } else if (message.guild.id == jclid) {
      logchannel = logchanneljcl;
    } else {
        message.channel.send('An error has happened, please report this to RandomGamer123 #5222 immediately');
    }
  var channelobj = message.guild.channels.find("name", logchannel);
      channelobj.send({embed: {
        color: 16711680,
        title: "Message Edited",
        description: "Message sent by <@" + message.member.id +"> edited in <#" + message.channel.id + ">",
        fields: [{
            name: "Original Message:",
            value: message.content
          },
          {
            name: "Edited Message:",
            value: emessage.content
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "User id of original message sender: " + message.member.id
        }
      }
    });
});
client.on('message', message => {
  if (message.guild.id == ramtid) {
    var regex = /discord\.gg\/[A-z]{6,7}/;
    var msgcontent = message.content.toLowerCase();
    if (regex.test(msgcontent)) {
      var logchannel = logchannelramt;
      var channelobj = message.guild.channels.find("name", logchannel);
      var excepted = 0;
      if (message.channel.name != adchannelramt) {
        if (msgcontent.startsWith('/advertexcept')) {
            if (message.member.hasPermission('MANAGE_CHANNELS',false,true,true)) {
              excepted = 1;
            }
        }
        if (excepted == 0) {
          console.log('testlog3');
          var memberid = message.member.id;
          var channelid = message.channel.id;
          message.delete();
          var desc = "Message sent by <@" + memberid +"> advertized in <#" + channelid + "> Message Deleted.";
            channelobj.send({embed: {
              color: 16711680,
              title: "Message Sent That Advertized. To allow a one-time exception to this, please do command /advertexcept [ADVERT] from an account with Manage Channels permissions, then edit the /advertexcept out.",
              description: desc,
              fields: [{
                  name: "Original Message:",
                  value: messagecontent
                },
              ],
              timestamp: new Date(),
              footer: {
                text: "User id of original message sender: " + memberid
              }
            }})
        }
      }
    }
  if (message.startsWith('/randomvote')) {
    var msgcontent = message.content;
    var channelobj = message.channel;
    var argarray = msgcontent.split(" ");
    argarray.shift();
    if (0 < argarray.length && argarray.length < 3) {
      if ( 0 < argarray[0] && argarray[0] < 27) {
        // Add functions to process random voting command here. TODO!
      } else {
        channelobj.send('Argument of letters in vote must be between 1 and 26');
      }
    } else {
      channelobj.send('Argument amount must be between 1 and 2.');
    }
  }
  }
});
client.login(token);

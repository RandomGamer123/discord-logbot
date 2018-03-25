const Discord = require('discord.js');
const client = new Discord.Client();
const ramtid = 259943329028898816;
const jclid = 214869811547734016;
const logchannelramt = "modchat";
const logchanneljcl = "log";
const token = process.env.TOKEN;
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
client.login(token);

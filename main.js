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
    var mentionedrole = false;
    var rolelist = message.guild.roles.array();
    for(i = 0; i < rolelist.length; i++) {
      if (message.isMentioned(rolelist[i])) {
        mentionedrole = true;
      }
    }
      if (mentionedrole = true) {
        if (message.member.permissions.has("MENTION_EVERYONE")) {
          var logchannel = logchannelramt;
          console.log('testlog1');
          var channelobj = message.guild.channels.find("name", logchannel);
          var desc = "Message sent by <@" + message.member.id +"> mentioned a role in <#" + message.channel.id + "> Not deleted as member can mention everyone.";
          channelobj.send({embed: {
            color: 16711680,
            title: "Message Sent That has Role.",
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
          }})
        } else {
          var memberid = message.member.id;
          var channelid = message.channel.id;
          var messagecontent = message.content;
          var logchannel = logchannelramt;
          var channelobj = message.guild.channels.find("name", logchannel);
          message.delete()
          console.log('testlog2');
          var desc = "Message sent by <@" + memberid +"> mentioned a role in <#" + channelid + "> Message Deleted.";
          channelobj.send({embed: {
            color: 16711680,
            title: "Message Sent That has Role.",
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
  if (mentionedrole = false) {
    var regex = /discord.gg\/[A-z]{6,7}/
    if (regex.test(message.content)) {
      var logchannel = logchannelramt;
      var channelobj = message.guild.channels.find("name", logchannel);
      if (message.channel.name != adchannelramt) {
        console.log('testlog3');
        var memberid = message.member.id;
        var channelid = message.channel.id;
        var messagecontent = message.content;
        message.delete();
        var desc = "Message sent by <@" + memberid +"> advertized in <#" + channelid + "> Message Deleted.";
          channelobj.send({embed: {
            color: 16711680,
            title: "Message Sent That Advertized.",
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
});
client.login(token);

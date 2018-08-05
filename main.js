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
client.user.setPresence({ game: { name: 'msglogbot:help | Made by RandomGamer123#5222' }})
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
client.on('message', msg => {
  if (msg.author.bot == false) {
    if (msg.guild.id == ramtid) {
      if (msg.content == "msglogbot:ping") {
        msg.channel.send('Pong!');
      }
      if (msg.content == "msglogbot:teams list") {
          if (msg.guild.available) {
            var teamroles = [];
            var serverroles = msg.guild.roles.array();
            for (var i = 0; i < serverroles.length; i++) {
              if (serverroles[i].name.startsWith("#Team")) {
                teamroles[teamroles.length] = serverroles[i].name;
              }
            }
            msg.channel.send(teamroles);
          }
      }
      if (msg.content.startsWith("msglogbot:teams get")) {
          if (msg.guild.available) {
            var teamroles = [];
            var serverroles = msg.guild.roles.array();
            for (var i = 0; i < serverroles.length; i++) {
              if (serverroles[i].name.startsWith("#Team")) {
                teamroles[teamroles.length] = serverroles[i];
              }
            }
            var getteam = msg.content.slice(20);
            var teamnames = [];
            for (var i = 0; i < teamroles.length; i++) {
              teamnames[teamnames.length] = teamroles[i].name.slice(5);
            }
            console.log(teamnames)
            if (teamnames.includes(getteam)) {
                if (msg.member) {
                  msg.member.addRole(teamroles[teamnames.indexOf(getteam)]);
                  msg.channel.send("Role given.")
                }
            } else {
              msg.channel.send("Team name not recongized. Use msglogbot:teams list to list all teams.")
            }
          }
      }
    }
  if (msg.content == "msglogbot:help") {
    msg.channel.send("**Modules:**\n`(msg) Message Edit and Delete Logging`\n`(team) Team Flairs`\n`(help) Help Module`\n`(misc) Misc Commands`\n Do msglogbot:help [module] for help about commands and functions of that module.\n *-Made by RandomGamer123#5222 for use in Random Random's Mini-twow and JCL Kaytwo's minitwow.*")
  }
  if (msg.content == "msglogbot:help help") {
    msg.channel.send("**Help Module:**\nThis module provides help info about other modules.\n**Commands:**\n`msglogbot:help - The basic help command, displays all modules.`\n`msglogbot:help [module] - Gives module specific help info`")
  }
  if (msg.content == "msglogbot:help misc") {
    msg.channel.send("**Misc Module:**\nThis module has miscellaneous commands:\n`msglogbot:misc say [TEXT] - Sends a message containing the text in the argument of the command. (Cannot be empty)`")
  }
  if (msg.content.startsWith("msglogbot:misc say")) {
    var text = msg.content.slice(19);
    if (text != "") {
      msg.channel.send(text);
    } else {
      msg.channel.send("Argument cannot be empty");
    }
  }
  }
});
client.login(token);

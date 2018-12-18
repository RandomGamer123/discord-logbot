const Discord = require('discord.js');
const client = new Discord.Client();
const ramtid = 259943329028898816;
const jclid = 214869811547734016;
const ramtpunished = "318299184757211136";
const randomid = 156390113654341632;
const randomaltid = 318305360823844865;
const moderator = 318298988124307456;
const trialmod = 318299840431783938;
const ramtsignupchannel = "s7microsignups";
const signuprole = "343678536562900992";
const logchannelramt = "modchat";
const logchanneljcl = "log";
const adchannelramt = "ads";
const token = process.env.TOKEN;
console.log('Starting Up.');
console.log(process.env.TOKEN);
console.log(token);
client.on('ready', () => {
  console.log(`Success!`);
  client.user.setActivity('msglogbot:help | Made by RandomGamer123#5222');
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
client.on('message', msg => {
  if (msg.author.bot == false) {
    if (msg.guild.id == ramtid) {
      if (msg.member) {
        if (msg.content == "msglogbot:signup") {
          if (msg.channel.name == ramtsignupchannel) {
            let roleobj = msg.guild.roles.get(signuprole);
            msg.member.addRole(roleobj)
          }
        }
        var rolearray = msg.member.roles.array();
        if (msg.member.id == randomid || msg.member.id == randomaltid || rolearray.includes(moderator) || rolearray.includes(trialmod)) {
          if (msg.content.startsWith("msglogbot:moderation punish")) {
            var target = msg.content.slice(28);
            if (msg.guild) {
              if (msg.guild.available) {
                if (msg.guild.member(target)) {
                  var targetobject = msg.guild.member(target);
                  var targetroles = targetobject.roles;
                  targetroles.delete(ramtpunished);
                  if (targetobject.id == randomid || targetobject.id == randomaltid) {
                    msg.channel.send('You cannot punish this person.');                    
                  } else {
                    targetobject.removeRoles(targetroles);
                    targetobject.addRole(ramtpunished);
                    msg.channel.send('User Punished.');
                  }
                }
              }
            }
          }
        } else {
          if (msg.content.startsWith("msglogbot:moderation punish")) {
            msg.channel.send('You do not have permission to use this command.');
          }
        }
      }
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
    msg.channel.send("**Modules:**\n`(msg) Message Edit and Delete Logging`\n`(team) Team Flairs`\n`(signup) Signup Module`\n`(help) Help Module`\n`(misc) Misc Commands`\n Do msglogbot:help [module] for help about commands and functions of that module.\n Github: <https://github.com/RandomGamer123/discord-logbot>\n *-Made by RandomGamer123#5222 for use in Random Random's Mini-twow and JCL Kaytwo's minitwow.*")
  }
  if (msg.content == "msglogbot:help help") {
    msg.channel.send("**Help Module:**\nThis module provides help info about other modules.\n**Commands:**\n`msglogbot:help - The basic help command, displays all modules.`\n`msglogbot:help [module] - Gives module specific help info`")
  }
  if (msg.content == "msglogbot:help msg") {
    msg.channel.send("**Message Edit and Delete Logging Module:**\nThis module logs the editing and deleting of messages, and is the only module in JCL's minitwow. Although, the help module this command belongs to isn't enabled in JCL's minitwow,so **if you see this message in his minitwow, report it ASAP.** \n **Commands:**\n`None`")
  }
  if (msg.content == "msglogbot:help misc") {
    msg.channel.send("**Misc Module:**\nThis module has miscellaneous commands.\n`msglogbot:misc say [TEXT] - Sends a message containing the text in the argument of the command. (Cannot be empty)`")
  }
  if (msg.content == "msglogbot:help team") {
    msg.channel.send("**Teams Module:**\nThis module has commands related to team flairs.\n**Commands:**\n`msglogbot:teams list - Lists all teams in the server. (Defined as roles beginning with '#Team'.)`\n`msglogbot:teams get [team name] - Gives you the role corresponding to the team name you typed in. (You don't need to type #Team, just the name of the contestant.)`")
  }
  if (msg.content == "msglogbot:help signup") {
    msg.channel.send("**Signup Module:**\nThis module has commands related to signing up.\n**Commands:**\n`msglogbot:signup - Signs you up for the minitwow that is currently in signups. (Can only be used in 1 channel)`")
  }
  if (msg.content.startsWith("msglogbot:misc say")) {
    var text = msg.content.slice(19);
    if (text != "") {
      msg.channel.send(text);
    } else {
      msg.channel.send("Argument cannot be empty");
    }
  }
  if (msg.content == "msglogbot:misc fym") {	
     var requester = msg.author.username
     msg.channel.send('**FYM!**\nRequested by: '.concat(requester));	
  }
  }
});
client.login(token);

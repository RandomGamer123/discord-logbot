const Discord = require('discord.js');
var Jimp = require('jimp');
const client = new Discord.Client();
const ramtid = 259943329028898816;
const jclid = 214869811547734016;
const ramtpunished = "318299184757211136";
const randomid = 156390113654341632;
const randomaltid = 318305360823844865;
const moderator = 318298988124307456;
const trialmod = 318299840431783938;
const ramtsignupchannel = "s7nanosignups";
const signuprole = "343678536562900992";
const logchannelramt = "modchat";
const logchanneljcl = "log";
const adchannelramt = "ads";
const token = process.env.TOKEN;
const starpinreq = 3;
var logpresence = false;
var banhonda = false;
const modchannel = 229998526950670336;
console.log('Starting Up.');
console.log(process.env.TOKEN);
console.log(token);
client.on('ready', () => {
  console.log(`Success!`);
  client.user.setActivity('msglogbot:help | Made by RandomGamer123#5222');
});
client.on('guildMemberAdd', (member) => {
  if (banhonda == true) {
    if (member.user.username.toLowerCase().includes("h0nda")) {
      member.ban();
    }
  }
});
client.on('messageReactionAdd', (reaction, user) => {
  var logchannel = 0;
  if (reaction.message.guild.id == ramtid) {
    logchannel = logchannelramt;
  } else if (reaction.message.guild.id == jclid) {
    logchannel = logchanneljcl;
  } else {
      message.channel.send('An error has happened, please report this to RandomGamer123 #5222 immediately');
  }
  if (reaction.emoji.name !== '⭐') return;
  if (reaction.count < starpinreq) return;
  var channelobj = reaction.message.guild.channels.find("name", logchannel);
	channelobj.send({embed:{ 
    color: 0x00FF00,
    title: "Recommendation to star message:",
    description: "Message has reached " + reaction.count.toString() +" stars.",
    fields: [{
            name: "Original Message:",
            value: reaction.message.content
      },
      {
      name: "Permalink:",
      value: reaction.message.url
      },
    ],
    timestamp: new Date()
  }});
});
client.on("presenceUpdate", (oldMember, newMember) => {
	if (logpresence == true) {
	  var logchannel = 0;
	  if (newMember.guild.id == ramtid) {
	    logchannel = logchannelramt;
	  } else if (newMember.guild.id == jclid) {
	    logchannel = logchanneljcl;
	  } else {
	      message.channel.send('An error has happened, please report this to RandomGamer123 #5222 immediately');
	  }
	  let username = newMember.user.username;
	  let id = newMember.id;
	  let oldstatus = oldMember.presence.status;
	  let newstatus = newMember.presence.status;
	  if (oldstatus == newstatus) return;
	  var channelobj = newMember.guild.channels.find("name", logchannel);
	  channelobj.send("User: " + username + ", with id: " + id + " has changed their presence from: " + oldstatus + " to " + newstatus);
	}
})
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
    msg.channel.send("**Misc Module:**\nThis module has miscellaneous commands.\n`msglogbot:misc say [TEXT] - Sends a message containing the text in the argument of the command. (Cannot be empty)`\n`msglogbot:misc fym - Sends a message in the format of 'fuck your mother -Requested by [YOUR NAME]'`\n`msglogbot:misc glitch [OVERFLOWPARAMETER] [MAXCHANGE] [LINK TO IMG] - Changes each channel of each pixel of the image by a random value between 0 and MAXCHANGE (No spaces allowed in [LINK TO IMG]), the values of pixels can overflow/underflow if the overflow parameter is [-overflow], and it cannot if the parameter is [-nooverflow], there is **NO** default value for the overflow parameter.`")
  }
  if (msg.content == "msglogbot:help team") {
    msg.channel.send("**Teams Module:**\nThis module has commands related to team flairs.\n**Commands:**\n`msglogbot:teams list - Lists all teams in the server. (Defined as roles beginning with '#Team'.)`\n`msglogbot:teams get [team name] - Gives you the role corresponding to the team name you typed in. (You don't need to type #Team, just the name of the contestant.)`")
  }
  if (msg.content == "msglogbot:help signup") {
    msg.channel.send("**Signup Module:**\nThis module has commands related to signing up.\n**Commands:**\n`msglogbot:signup - Signs you up for the minitwow that is currently in signups. (Can only be used in 1 channel)`")
  }
  if (msg.channel.id == modchannel || msg.member.id == randomid) {
	if (msg.content == "msglogbot:misc togglepresencelog") {
		if (logpresence == true) {
			logpresence = false;
			msg.channel.send("Presence logging is now off.");
		} else {
			logpresence = true;
			msg.channel.send("Presence logging is now on.");
		}
	}
        if (msg.content == "msglogbot:misc togglehondabanning") {
		if (banhonda == true) {
			banhonda = false;
			msg.channel.send("Banning users with h0nde in their username is now off.");
		} else {
			banhonda = true;
			msg.channel.send("Banning users with h0nde in their username is now on.");
		}
	}
  }
  if (msg.content.startsWith("msglogbot:misc glitch -nooverflow")) {
    var text = msg.content.slice(34);
    var args = text.split(" ");
    var maxchange = args[0];
    var link = args[1];
    Jimp.read(link)
      .then(imgfile => {
          imgfile.scan(0, 0, imgfile.bitmap.width, imgfile.bitmap.height, function(x, y, idx) {
                  this.bitmap.data[idx] = Math.min(255,Math.max(0,this.bitmap.data[idx] + Math.round((Math.random()-0.5)*2*maxchange)));
                  this.bitmap.data[idx+1] = Math.min(255,Math.max(0,this.bitmap.data[idx+1] + Math.round((Math.random()-0.5)*2*maxchange)));
                  this.bitmap.data[idx+2] = Math.min(255,Math.max(0,this.bitmap.data[idx+2] + Math.round((Math.random()-0.5)*2*maxchange)));
              });
          imgfile.getBuffer(imgfile.getMIME(), function(err, bufferimg) {
            var discattachment = new Discord.Attachment(bufferimg);
            msg.channel.send("Your 'glitched' image:", discattachment);
          });
      })
      .catch(err => {
          console.error(err);
          msg.channel.send("**ERROR**\n" + err);
      });
  }
  if (msg.content.startsWith("msglogbot:misc glitch -overflow")) {
    var text = msg.content.slice(32);
    var args = text.split(" ");
    var maxchange = args[0];
    var link = args[1];
    Jimp.read(link)
      .then(imgfile => {
          imgfile.scan(0, 0, imgfile.bitmap.width, imgfile.bitmap.height, function(x, y, idx) {
                  this.bitmap.data[idx] = this.bitmap.data[idx] + Math.round((Math.random()-0.5)*2*maxchange);
                  this.bitmap.data[idx+1] = this.bitmap.data[idx+1] + Math.round((Math.random()-0.5)*2*maxchange);
                  this.bitmap.data[idx+2] = this.bitmap.data[idx+2] + Math.round((Math.random()-0.5)*2*maxchange);
              });
          imgfile.getBuffer(imgfile.getMIME(), function(err, bufferimg) {
            var discattachment = new Discord.Attachment(bufferimg);
            msg.channel.send("Your 'glitched' image:", discattachment);
          });
      })
      .catch(err => {
          console.error(err);
          msg.channel.send("**ERROR**\n" + err);
      });
  }
  if (msg.content.startsWith("msglogbot:misc say")) {
    var text = msg.content.slice(19);
    if (text != "") {
      msg.channel.send(text);
    } else {
      msg.channel.send("Argument cannot be empty");
    }
  }
  if (msg.content.startsWith("msglogbot:misc say -s")) {
    var text = msg.content.slice(22);
    if (text != "") {
      msg.channel.send(text);
    } else {
      msg.channel.send("Argument cannot be empty");
    }
  }
  if (msg.content == "msglogbot:misc fym") {	
     var requester = msg.author.username
     msg.channel.send('fuck your mother\nRequested by: '.concat(requester));	
  }
  }
});
client.login(token);

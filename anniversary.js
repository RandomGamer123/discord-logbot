const Discord = require('discord.js');
const client = new Discord.Client();
const general = 235490833225220096;
const token = process.env.TOKEN;
console.log('Starting Up.');
console.log(process.env.TOKEN);
console.log(token);
client.on('ready', () => {
  console.log(`Success!`);
  for x in client.channels.array() {
    if (x.id == general) {
      x.send('Happy  2nd anniversary!');
    }
  }
});

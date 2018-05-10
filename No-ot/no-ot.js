/* eslint-disable no-console */
const Discord = require('discord.js');

const client = new Discord.Client();

// Load the config.json file that contains our token and our prefix values.
const config = require('../config.json');

client.on('ready', () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('guildCreate', guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('guildDelete', guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on('message', async message => {

	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === 'ping') {
		const m = await message.channel.send('Ping?');
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}

	if(command === 'avatar') {
		message.reply(message.author.avatarURL);
	}

});

client.on('guildMemberAdd', async member => {
	member.channel.send('Welcome ' + member.name + ' to the server');
});

client.on('guildMemberRemove', async member => {
	member.channel.send('Cya ' + member.name);
});

client.on('roleCreate', async role => {
	role.channel.send('Role ' + role.name + ' created');
});

client.login(config.token);
const Discord = require('discord.js');

module.exports = {
	name: 'slap',
	usage: '!slap @example',
	description: 'Golpea en la cara a la persona que menciones!',
	execute(message) {

		const member = message.mentions.members.first();
		if (!member) return message.reply('Necesitas mencionar a alguien!');

		const cartel = new Discord.RichEmbed()
			.setColor('#ffd700')
			.setTitle(`${message.author.username} golpeo en la cara a ${member.user.username}! :wave:`)
			.setImage('https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif');

		message.channel.send(cartel);

	},
};

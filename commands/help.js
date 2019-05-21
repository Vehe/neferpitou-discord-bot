const fs = require('fs')
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	usage: '!help',
	description: 'Muestra toda la información sobre los comandos disponibles.',
	execute(message) {

        const cartel = new Discord.RichEmbed()
            .setColor('#FF1493')
			.setTitle('Que funciones tengo?');
		
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
            cartel.addField(command.usage, command.description);
		}

		cartel.addBlankField().setImage('https://thumbs.gfycat.com/FoolhardyFineAldabratortoise-size_restricted.gif');
		message.channel.send(cartel);
        
	},
};
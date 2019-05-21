module.exports = {
	name: 'skip',
	usage: '!skip',
	description: 'Salta a la canción siguiente!',
	execute(message) {

		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel) return message.reply('Debes estar en un canal de voz para poder saltar de canción!', {file: './img/hisoka.gif'});
		if (!serverQueue) return message.reply('No hay ninguna canción que pueda saltar!');
        serverQueue.connection.dispatcher.end();
        
	},
};
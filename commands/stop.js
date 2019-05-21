module.exports = {
	name: 'stop',
	description: 'Para todas las canciones en la lista de reprodución!',
	execute(message) {

		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel) return message.reply('Debes estar en un canal de voz para poder parar la música!', {file: './img/hisoka.gif'});
		serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        
	},
};
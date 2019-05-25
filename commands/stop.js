module.exports = {
	name: 'stop',
	usage: '!stop',
	description: 'Para todas las canciones en la lista de reprodución y la que está sonando!',
	execute(message) {

		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel) return message.reply('Debes estar en un canal de voz para poder parar la música!', {file: './img/hisoka.gif'});
		if (!serverQueue) return message.reply('En este momento no hay nada que parar!');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();

	},
};
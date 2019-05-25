module.exports = {
	name: 'sonando',
	usage: '!sonando',
	description: 'Devuelve la info de la canción que está sonando!',
	execute(message) {

		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.reply('En este momento no hay nada sonando! :musical_note:', {file: './img/hisoka.gif'});
		return message.reply(`Ahora sonando: ${serverQueue.songs[0].title}`, {file: './img/hisoka.gif'});

	},
};
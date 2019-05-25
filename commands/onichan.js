const ytdl = require('ytdl-core');

module.exports = {
	name: 'onichan',
	usage: '!onichan',
	description: 'Neferpitou te susurra onichan al oido!',
	execute(message) {

		const serverQueue = message.client.queue.get(message.guild.id);
		if(!message.member.voiceChannel) return message.reply('Debes estar primero en un canal de voz!');
		if(serverQueue) serverQueue.voiceChannel.leave();

		let voiceChannel = message.member.voiceChannel;

		voiceChannel.join().then(connection => {
			connection.playStream(ytdl('https://www.youtube.com/watch?v=tJf9cSSRDrA', { filter: 'audioonly'}))
				.on('end', () => voiceChannel.leave())
				.on('error', (error) => {
						voiceChannel.leave();
						console.error(error);
				});
		});

	},
};

const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	usage: '!play <url>',
	description: 'Reproduce una canción en el canal de voz!',
	async execute(message, args) {

		const queue = message.client.queue;
		const serverQueue = message.client.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;
		
		// Comprobamos que el usuario esta en un canal de voz, y que tenemos permisos suficientes para poder ejecutarnos.
		if (!voiceChannel) return message.reply('Debes estar en un canal de voz para poder poner una canción! :cold_sweat:');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send('Vaya, parece que no tengo permisos suficientes! :scream_cat:');
		if(args.length <= 0) return message.reply('No me has dicho lo que tengo que reproducir! :cold_sweat:');

		// Saca información sobre el vídeo introducido.
		let songInfo;
		try {
			songInfo = await ytdl.getInfo(args[0]);
		} catch(e) {
			return message.reply('No he podido encontrar el vídeo indicado! :tired_face:');
		}
			
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
		};

		// Comprueba si la lista de reprodución está vacía.
		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 1,
				playing: true,
			};

			queue.set(message.guild.id, queueContruct);

			queueContruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueContruct.connection = connection;
				this.play(message, queueContruct.songs[0]);
			} catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				return message.channel.send(err);
			}
		} else {
			serverQueue.songs.push(song);
			return message.reply(`La canción '${song.title}' ha sido añadida a la cola!`, {file: './img/hisoka.gif'});
		}
	},

	// Reproduce la canción seleccionada.
	play(message, song) {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(message.guild.id);
	
		if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}
	
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', () => {
				serverQueue.songs.shift();
				this.play(message, serverQueue.songs[0]);
			})
			.on('error', error => {
				serverQueue.voiceChannel.leave();
				console.error(error);
			});

		dispatcher.setVolumeLogarithmic(serverQueue.volume / 3);
	}
};

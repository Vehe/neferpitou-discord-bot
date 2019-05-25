module.exports = {
	name: 'delete',
	usage: '!delete 3',
	description: 'Borra una cantidad determinada de mensajes!',
	execute(message, args) {

		if( args.length <= 0 ) return message.reply('Debes especificar el número de mensajes del canal a borrar! :confounded:');
		message.channel.bulkDelete(parseInt(args[0]) + 1).catch(console.error);

	},
};
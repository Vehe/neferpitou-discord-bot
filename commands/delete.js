module.exports = {
	name: 'delete',
	description: 'Borra una cantidad determinada de mensajes!',
	execute(message, args) {

        if( args.length <= 0 ) return message.reply('Debes especificar el número de mensajes del canal a borrar! :confounded:');
        message.channel.bulkDelete(args[0]).catch(console.error);
        
	},
};
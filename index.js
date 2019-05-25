const fs = require('fs');
const mysql = require('mysql');
const Discord = require('discord.js');

const Client = require('./client/Client');
const client = new Client();
client.commands = new Discord.Collection();

/**
 * Busca en la carpeta commands todos los archivos JS y los almacena en una collection.
 */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

/**
 * Se ejecuta cuando se conecta el bot al servidor.
 */
client.once('ready', () => {

	console.log(`Bot conectado como: ${client.user.tag}!`);

	const connection = mysql.createConnection({host:'localhost', user:'admin', password:'password', database:'bot'});
	connection.connect(err => { if(err) return console.log(err); });

	client.users.map( user => {
		connection.query(`INSERT INTO bot (user, points) VALUES ("${user.id}", 100)`);
	});

	connection.end();

});

/**
 * Se ejecuta cuando algún usuario envía un mensaje.
 */
client.on('message', async message => {

	// Comprobamos que se llame al bot con el prefix correspondiente, así como dividir el comando de los argumentos.
	if (!message.content.startsWith('!') || message.author.bot) return;
	const args = message.content.slice(1).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Si no se tiene el role de ROYAL GUARD no se pueden ejecutar comandos en el bot.
	if(!message.member.roles.find(r => r.name === "ROYAL GUARD")) return message.reply({file: './img/sinpermisos.gif'});

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	// Intentamos ejecutar el comando input del usuario, y le hacemos un catch al error.
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Ops! Ha habido algún error al ejecutar el comando!');
	}

});

client.login(process.env.BOT_TOKEN);

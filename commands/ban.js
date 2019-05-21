module.exports = {
	name: 'ban',
	description: 'Banea a un usuario en concreto!',
	execute(message) {

		const member = message.mentions.members.first();
		if (!member) return message.reply('You need to mention the member you want to ban him');

		return member
			.ban()
			.then(() => message.reply(`${member.user.tag} Ha sido baneado. :smiling_imp:`))
            .catch(error => message.reply('Ops! Algo ha salido mal hoho.'));
            
	},
};
const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nepu')
		.setDescription('Calls me, Nepu!'),
	async execute(interaction) {
		await interaction.reply('Nepu?!')
	},
}

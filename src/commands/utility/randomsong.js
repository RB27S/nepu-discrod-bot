const {SlashCommandBuilder} = require('@discordjs/builders')
const {getRandomSong} = require('../../services/spotify/getRandomSong')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomsong')
		.setDescription('Recommends a random song to listen to from my personal playlist'),
	async execute(interaction) {
		const randomSong = await getRandomSong()

		await interaction.reply(`Nepu?! You definitely need to listen to **${randomSong.name}**\n${randomSong.url}`)
	},
}

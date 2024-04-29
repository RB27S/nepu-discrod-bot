const dotenv = require('dotenv')

dotenv.config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID

const getToken = async () => {
	try {
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'grant_type=client_credentials'
		})
		const data = await response.json()
		return data.access_token
	} catch (error) {
		console.error('Error getting access token:', error)
		throw error
	}
}

const getPlaylistSongs = async () => {
	try {
		const accessToken = await getToken()
		const response = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		})
		const data = await response.json()
		return data.items.map(item => ({name: item.track.name, url: item.track.external_urls.spotify}))
	} catch (error) {
		console.error('Error getting liked songs:', error)
		throw error
	}
}

const getRandomSong = async () => {
	try {
		const playlistSongs = await getPlaylistSongs()
		return playlistSongs[Math.floor(Math.random() * playlistSongs.length)]
	} catch (error) {
		console.error('Error getting random song:', error)
		throw error
	}
}

module.exports = {getRandomSong}

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

const getRandomSong = async () => {
	try {
		const accessToken = await getToken()

		// Gets the total number of songs
		const totalSongsResponse = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=1`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		})
		const totalSongs = (await totalSongsResponse.json()).total

		// Calculates a random offset for the API request
		const randomOffset = Math.floor(Math.random() * totalSongs)

		// Gets a random song with the calculated offset
		const response = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=1&offset=${randomOffset}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		})
		const data = await response.json()
		const song = data.items[0].track

		return {
			name: song.name,
			artist: song.artists[0].name,
			url: song.external_urls.spotify
		}
	} catch (error) {
		console.error('Error requesting random song:', error)
		throw error
	}
}

module.exports = {getRandomSong}

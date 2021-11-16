/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		mapBoxToken: process.env.MAPBOX_TOKEN
	}
}

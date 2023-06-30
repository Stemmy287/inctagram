/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['storage.yandexcloud.net']
	},
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'en',
		localeDetection: false
	}
}

module.exports = nextConfig

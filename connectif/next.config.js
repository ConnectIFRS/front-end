/** @type  {import('next').NextConfig} */

const  path  =  require('path')

const  nextConfig  = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['192.168.2.17'],
	}
}

module.exports  =  nextConfig
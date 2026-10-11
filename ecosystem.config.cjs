// PM2 config untuk server produksi @sveltejs/adapter-node.
// Deploy: npm ci && npm run build && pm2 startOrReload ecosystem.config.cjs --env production --update-env
const fs = require('node:fs');
const path = require('node:path');
const { parseEnv } = require('node:util');

// Baca file .env bila ada; isinya menimpa nilai bawaan di bawah.
function loadEnv(file) {
	const full = path.join(__dirname, file);
	return fs.existsSync(full) ? parseEnv(fs.readFileSync(full, 'utf8')) : {};
}

module.exports = {
	apps: [
		{
			name: 'scrshot',
			script: 'build/index.js',
			cwd: __dirname,

			exec_mode: 'fork',
			instances: 1,

			autorestart: true,
			watch: false,
			max_memory_restart: '300M',
			max_restarts: 10,
			min_uptime: '10s',
			restart_delay: 2000,

			// Beri waktu server menutup koneksi aktif sebelum PM2 mematikan proses.
			kill_timeout: 10000,

			time: true,
			out_file: 'logs/out.log',
			error_file: 'logs/error.log',

			env: {
				NODE_ENV: 'development',
				HOST: '127.0.0.1',
				PORT: 3000
			},
			env_production: {
				NODE_ENV: 'production',
				// Hanya terima koneksi lokal; publik masuk lewat reverse proxy (nginx/Caddy).
				HOST: '127.0.0.1',
				PORT: 4455,
				// Ambil IP asli pengunjung dari header reverse proxy.
				ADDRESS_HEADER: 'x-forwarded-for',
				XFF_DEPTH: 1,
				// Harus lebih kecil dari kill_timeout (dalam detik).
				SHUTDOWN_TIMEOUT: 8,
				BODY_SIZE_LIMIT: '512K',
				...loadEnv('.env'),
				NODE_ENV: 'production'
			}
		}
	]
};

/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type ServerOptions } from 'vite';
import { configDefaults } from 'vitest/config';

import packageJson from './package.json';
import { createSecurityHeadersPlugin, localPreviewOptions, remotePreviewOptions } from './vite-securityHeaders.helpers';

const appVersion = JSON.stringify(packageJson.version);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	const devServerOptions: Partial<ServerOptions> = {
		host: 'ielect.agent.local',
		port: 3001,
		strictPort: true,
		https: {
			cert: './.cert/cert.pem',
			key: './.cert/key.pem',
		},
	};

	const currentDate = Date.now();

	const getServerConfig = () => (['development'].includes(mode) ? devServerOptions : {});
	const getPreviewConfig = () => (['development'].includes(mode) ? localPreviewOptions : remotePreviewOptions);
	const env = loadEnv(mode, process.cwd(), '');
	return {
		define: {
			APP_VERSION: appVersion,
			BUILD_TIMESTAMP: JSON.stringify(currentDate),
			...Object.keys(env).reduce((prev: any, key) => {
				prev[`process.env.${key}`] = JSON.stringify(env[key]);
				return prev;
			}, {}),
		},
		base: '/',
		preview: getPreviewConfig(),
		server: {
			...getServerConfig(),
			cors: false,
			//   proxy: {
			//     "/proxy": {
			//       target: process.env.VITE_BASE_API_URL,
			//       changeOrigin: true,
			//       secure: false,
			//       xfwd: true,
			//       rewrite: (pathname) => pathname.replace(/^\/proxy/, ""),
			//     },
			//   },
		},
		build: {
			outDir: path.resolve(__dirname, './dist'),
			emptyOutDir: true,
			sourcemap: true,
			rollupOptions: {
				treeshake: true,
				output: {
					// entryFileNames: `${currentDate}/[name].[hash].js`,
					// chunkFileNames: `${currentDate}/[name].[hash].js`,
					// assetFileNames: `${currentDate}/[name].[hash][extname]`,
					manualChunks: {
						'form-hook': ['@hookform/resolvers', 'react-hook-form', 'yup'],
						'react': ['react', 'react-dom'],
						'react-router': ['react-router'],
						'redux': ['@reduxjs/toolkit', 'react-redux'],
					},
				},
			},
		},
		plugins: [
			react(),
			createSecurityHeadersPlugin({
				strictTransportSecurity: {
					maxAge: 31536000,
					includeSubDomains: true,
					preload: true,
				},
				contentSecurityPolicy: {
					imgSrc: ["'self'", 'data:', 'blob:'],

					connectSrc: [
						"'self'",
						'https://core-ielect.ngrok.app/',
						'https://query-ielect.ngrok.app',
						'https://command-ielect.ngrok.app',
						'https://media-manager-ielect.ngrok.app/api/FileManager/upload-image',
						'blob:',
						'data:',
					],
					fontSrc: ["'self'"],
					objectSrc: ["'none'"],
					mediaSrc: ["'self'", 'data:'],
					frameSrc: ["'none'"],
					frameAncestors: ["'none'"],
					formAction: ["'self'"],
					workerSrc: ["'self'"],
				},
				permissionsPolicy: {
					'camera': ["'none'"],
					'microphone': ["'none'"],
					'geolocation': ["'self'"],
					'encrypted-media': ["'self'"],
				},
				crossOrigin: {
					openerPolicy: 'same-origin',
					resourcePolicy: 'cross-origin',
					embedderPolicy: 'unsafe-none',
				},
				referrerPolicy: 'strict-origin-when-cross-origin',
				xFrameOptions: 'DENY',
				expectCT: {
					maxAge: 86400,
					enforce: true,
				},
			}),
			{
				name: 'handle-malformed-uri',
				configureServer(server) {
					server.middlewares.use((req, res, next) => {
						try {
							// Try to decode the URI to catch malformed ones early
							if (req.url) {
								decodeURIComponent(req.url);
							}
							next();
						} catch (error) {
							console.warn('Malformed URI detected:', req.url);
							res.statusCode = 400;
							res.end('Bad Request: Malformed URI');
						}
					});
				},
			},
		],
		resolve: {
			alias: {
				'root': path.resolve(__dirname, './'),
				// 'BreetConfig': path.resolve(__dirname, './src/config'),
				// 'IElectComponents': path.resolve(__dirname, './src/components'),
				// 'BreetHelpers': path.resolve(__dirname, './src/helpers'),
				// 'BreetHooks': path.resolve(__dirname, './src/hooks'),
				// 'BreetRedux': path.resolve(__dirname, './src/redux'),
				// 'BreetRoutes': path.resolve(__dirname, './src/routes'),
				'@': path.resolve(__dirname, './src'),
			},
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/helpers/test/setupTests.ts',
			css: true,
			pool: 'forks',
			include: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
			exclude: [...configDefaults.exclude],
			coverage: {
				reportsDirectory: './unit-report',
				exclude: [...(configDefaults.coverage.exclude ?? []), '**/*.mdx', '**/dist/*', '**/routes/*'],
				thresholds: {
					lines: 70.55,
					functions: 66.9,
					branches: 73.9,
					statements: 70.55,
				},
			},
		},
	};
});

import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const config: UserConfig = {
		plugins: [react()],
	};

	if (env.VITE_BASE) {
		config.base = env.VITE_BASE;
	}

	return config;
});

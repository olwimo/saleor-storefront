import { type MultiThemePluginOptions } from "tailwindcss-themer/lib/utils/optionsUtils";

const config: MultiThemePluginOptions = {
	defaultTheme: {
		extend: {
			colors: {
				neutral: process.env.NEXT_PUBLIC_COLOR_PRIMARY || "#394052",
				hover: process.env.NEXT_PUBLIC_COLOR_HOVER || "#FFFFFF",
				success: process.env.NEXT_PUBLIC_COLOR_SUCCESS || "#2C9B2A",
				error: process.env.NEXT_PUBLIC_COLOR_ERROR || "#B65757",
			},
		},
	},
	themes: [
		{
			name: "my-theme",
			extend: {
				colors: {
					primary: "blue",
				},
			},
		},
	],
};

export default config;

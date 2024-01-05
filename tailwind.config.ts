import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import { type Config } from "tailwindcss";

import ThemerPlugin from "tailwindcss-themer";

import themesConfig from "./themes.config";

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	plugins: [TypographyPlugin, FormPlugin, ThemerPlugin(themesConfig)],
};

export default config;

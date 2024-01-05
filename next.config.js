import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const config = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
	experimental: {
		typedRoutes: false,
	},
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
			? "export"
			: undefined,
};

export default withMDX({
	extension: /\.mdx?$/,
})(config);

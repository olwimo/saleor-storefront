import { type ReactNode } from "react";
import { Footer } from "@ui/Footer";
import { Header } from "@ui/Header";

export const metadata = {
	title: process.env.NEXT_PUBLIC_COMPANY_NAME,
	description: `Starter pack for building performant e-commerce experiences with ${process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME}.`,
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<>
			<Header />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
				<Footer />
			</div>
		</>
	);
}

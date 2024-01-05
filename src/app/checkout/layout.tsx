import { type ReactNode } from "react";

export const metadata = {
	title: `${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
	description: `Starter pack for building performant e-commerce experiences with ${process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME}.`,
};

export default function RootLayout(props: { children: ReactNode }) {
	return <main>{props.children}</main>;
}

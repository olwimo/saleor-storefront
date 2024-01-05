import { Suspense } from "react";
import { Loader } from "@atoms/Loader";
import { LoginComponent } from "./LoginComponent";

export default function LoginPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<LoginComponent />
			</section>
		</Suspense>
	);
}

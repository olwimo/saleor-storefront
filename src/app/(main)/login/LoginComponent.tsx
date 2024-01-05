"use client";

import { useQuery } from "urql";
import { useRouter } from "next/navigation";
import { LoginForm } from "@ui/LoginForm";
import { CurrentUserDocument, type CurrentUserQuery } from "@/gql/graphql";

export const LoginComponent = () => {
	const router = useRouter();
	const [{ data }] = useQuery<CurrentUserQuery>({
		query: CurrentUserDocument.toString(),
	});

	if (data?.me) {
		router.push("/");
	}

	return <LoginForm />;
};

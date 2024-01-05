import { notFound } from "next/navigation";
import { Pagination } from "@ui/Pagination";
import { ProductList } from "@ui/ProductList";
import { ProductListPaginatedDocument } from "@/gql/graphql";
import { ProductsPerPage, executeGraphQL } from "@/lib/graphql";

export const metadata = {
	title: `Products · ${process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME}`,
	description: `All products in ${process.env.NEXT_PUBLIC_COMPANY_NAME} Storefront`,
};

type Props = {
	searchParams: {
		cursor: string;
	};
};

export default async function Page({ searchParams }: Props) {
	const { cursor } = searchParams;

	const { products } = await executeGraphQL(ProductListPaginatedDocument, {
		variables: {
			first: ProductsPerPage,
			after: cursor,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	return (
		<div>
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products.edges.map((e) => e.node)} />
				<Pagination pageInfo={products.pageInfo} />
			</section>
		</div>
	);
}

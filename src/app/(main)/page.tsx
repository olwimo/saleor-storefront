import { ProductList } from "@ui/ProductList";
import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export const metadata = {
	title: `${process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME} Storefront, powered by Next.js`,
	description: `Storefront in Next.js for building performant e-commerce experiences with ${process.env.NEXT_PUBLIC_COMPANY_NAME} - ${process.env.NEXT_PUBLIC_COMPANY_SLOGAN}.`,
};

export default async function Page() {
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
		},
		revalidate: 60,
	});

	if (!data.collection?.products) throw Error("No products found");

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<div>
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products} />
			</section>
		</div>
	);
}

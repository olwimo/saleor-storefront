import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { CheckoutLink } from "./CheckoutLink";
import { DeleteLineButton } from "./DeleteLineButton";
import * as Checkout from "@/lib/checkout";
import { formatMoney } from "@/lib/graphql";

export const metadata = {
	title: `Shopping Cart · ${process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME}`,
};

export default async function Page() {
	const checkoutId = cookies().get("checkoutId")?.value || "";

	const checkout = await Checkout.find(checkoutId);

	if (!checkout || checkout.lines.length < 1) {
		return (
			<section className="mx-auto max-w-7xl p-8">
				<h1 className="text-neutral-900 mt-8 text-3xl font-bold">Your Shopping Cart is empty</h1>
				<p className="text-neutral-500 my-12 text-sm">
					Looks like you haven’t added any items to the cart yet.
				</p>
				<Link
					href="/products"
					className="bg-neutral-900 text-neutral-50 hover:bg-neutral-800 aria-disabled:bg-neutral-500 inline-block max-w-full rounded border border-transparent px-6 py-3 text-center font-medium aria-disabled:cursor-not-allowed sm:px-16"
				>
					Explore products
				</Link>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-7xl p-8">
			<h1 className="text-neutral-900 mt-8 text-3xl font-bold">Your Shopping Cart</h1>
			<form className="mt-12">
				<ul
					data-testid="CartProductList"
					role="list"
					className="divide-neutral-200 border-neutral-200 divide-y border-b border-t"
				>
					{checkout.lines.map((item) => (
						<li key={item.id} className="flex py-4">
							<div className="bg-neutral-50 aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border sm:h-32 sm:w-32">
								{item.variant?.product?.thumbnail?.url && (
									<Image
										src={item.variant.product.thumbnail.url}
										alt={item.variant.product.thumbnail.alt ?? ""}
										width={200}
										height={200}
										className="h-full w-full object-contain object-center"
									/>
								)}
							</div>
							<div className="relative flex flex-1 flex-col justify-between p-4 py-2">
								<div className="flex justify-between justify-items-start gap-4">
									<div className="">
										<Link href={`/products/${item.variant.product.slug}?variant=${item.variant.id}`}>
											<h2 className="text-neutral-700 font-medium">{item.variant?.product?.name}</h2>
										</Link>
										<p className="text-neutral-500 mt-1 text-sm">{item.variant?.product?.category?.name}</p>
										{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
											<p className="text-neutral-500 mt-1 text-sm">Variant: {item.variant.name}</p>
										)}
									</div>
									<p className="text-neutral-900 text-right font-semibold">
										{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency)}
									</p>
								</div>
								<div className="flex justify-between">
									<div className="text-sm font-bold">Qty: {item.quantity}</div>
									<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-12">
					<div className="bg-neutral-50 rounded border px-4 py-2">
						<div className="flex items-center justify-between gap-2 py-2">
							<div>
								<p className="text-neutral-900 font-semibold">Your Total</p>
								<p className="text-neutral-500 mt-1 text-sm">Shipping will be calculated in the next step</p>
							</div>
							<div className="text-neutral-900 font-medium">
								{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
							</div>
						</div>
					</div>
					<div className="mt-10 text-center">
						<CheckoutLink
							checkoutId={checkoutId}
							disabled={!checkout.lines.length}
							className="w-full sm:w-1/3"
						/>
					</div>
				</div>
			</form>
		</section>
	);
}

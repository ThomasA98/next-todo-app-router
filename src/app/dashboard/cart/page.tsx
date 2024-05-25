import { WidgetItem } from "@/components";
import { Product, products } from "@/products";
import { ItemCard } from "@/shoping-cart";
import { cookies } from "next/headers";
import Link from "next/link";

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  return Object.entries(cart).flatMap(([id, quantity]) => {

    const product = products.find(product => product.id === id)

    if (!product) return []

    return {
      product,
      quantity
    }

  })
}

export default function CartPage() {

  const cookieStore = cookies()
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')

  const productsInCart = getProductsInCart(cart)

  const totalToPay = productsInCart.reduce((prev, curr) => prev + (curr.product.price * curr.quantity), 0)

  return (
    <div>
      <h1 className="text-5xl">Products in cart</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {
          productsInCart.length < 1
            ? (
              <div className="w-full flex flex-col h-[30vh] justify-center items-center bg-slate-300 rounded-md shadow-md shadow-slate-500 gap-4">
                <h2 className="text-3xl text-red-800">No items in cart</h2>
                <Link href={ '/dashboard/products' } className="text-center text-white bg-gradient-to-r from-sky-600 to-cyan-400 p-2 rounded-md" >
                  Buy Items
                </Link>
              </div>
            )
            : (
              <>
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                  {
                    productsInCart.map(({ product, quantity }) => (
                      <ItemCard key={product.id} product={product} quantity={quantity} />
                    ))
                  }
                </div>
                <div className="flex flex-col w-full sm:w-4/12">
                  <WidgetItem title="Total to pay">
                    <div className="mt-2 flex justify-center gap-4">
                      <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.15).toFixed(2)}</h3>
                    </div>
                    <span className="font-bold text-center text-gray-500">Impuestos 15%: {(totalToPay * 0.15).toFixed(2)}</span>
                  </WidgetItem>
                </div>
              </>
            )
        }

      </div>
    </div>
  );
}
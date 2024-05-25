'use client'
// https://tailwindcomponents.com/component/e-commerce-product-card

import Image from "next/image"
import { useRouter } from "next/navigation"
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5"
import { addProductToCart, removeProductFromCart } from "@/shoping-cart"
import { Product } from "../data/products"

export interface ProductCard {
  product: Product
}

export const ProductCard: React.FC<ProductCard> = ({ product }) => {

  const router = useRouter()

  const onAddToCart = () => {
    addProductToCart(product.id)
    router.refresh()
  }

  const onRemoveToCart = () => {
    removeProductFromCart(product.id)
    router.refresh()
  }

  return (
    <div className="bg-white shadow rounded-lg max-w-sm border-gray-100">

      {/* Product Image */}
      <div className="p-2">
        <Image
          width={500}
          height={500}
          className="rounded"
          src={ product.image }
          alt="product image" />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
            { product.name }
          </h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">


          {/* Stars */}
          {
            Array(product.rating).fill(0).map((v, index) => (
                <svg key={ `svg${product.id}${index}` } className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
              )
            )
          }

          {/* Rating Number */}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
            { product.rating }
          </span>
        </div>


        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">
            ${ product.price }
          </span>

          <div className="flex">
            <button
              onClick={ onAddToCart }
              className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <IoAddCircleOutline size={25} />
            </button>
            <button
              onClick={ onRemoveToCart }
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <IoTrashOutline size={20} />
            </button>
          </div>

        </div>


      </div>
    </div>
  )
}
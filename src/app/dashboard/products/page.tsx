import { ProductCard, products } from "@/products";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
            products.map(product => (
                <ProductCard key={ product.id } product={ product } />
            ))
        }
    </div>
  );
}
import ProductFeature from "./product-feature";
import { getProducts, type ProductLang } from "./product-items";

interface ProductShowcaseProps {
  language: ProductLang;
}

export default function ProductShowcase({ language }: ProductShowcaseProps) {
  const products = getProducts(language);

  return (
    <section id="products" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-[#E31B23]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10">
        <div className="space-y-24 sm:space-y-32">
          {products.map((product, index) => (
            <ProductFeature key={product.id} product={product} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}

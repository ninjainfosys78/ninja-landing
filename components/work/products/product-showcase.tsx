import ProductFeature from "./product-feature";
import { getProducts, type ProductLang } from "./product-items";
import SectionHeading from "@/components/ui/section-heading";

interface ProductShowcaseProps {
  language: ProductLang;
  title: string;
}

export default function ProductShowcase({ language, title }: ProductShowcaseProps) {
  const products = getProducts(language);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-[#E31B23]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10">
        <SectionHeading
          title={title}
          className="mt-5"
          titleClassName="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
        />

        <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-32">
          {products.map((product, index) => (
            <ProductFeature key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

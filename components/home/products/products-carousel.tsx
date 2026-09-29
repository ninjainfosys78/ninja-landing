"use client";

import type { ProductItem } from "@/components/work/products/product-items";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductPreviewCard from "./product-preview-card";
import { useCarouselAutoplay } from "./use-carousel-autoplay";

const ARROW_CLASS = "z-10 size-11 border-[#0A1F4D] bg-white shadow-md text-[#0A1F4D] hover:bg-[#0A1F4D] hover:text-white";

interface ProductsCarouselProps {
  products: ProductItem[];
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const { setApi, pauseHandlers } = useCarouselAutoplay();

  return (
    <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="mt-14" {...pauseHandlers}>
      <CarouselContent className="-ml-8 py-3">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-8 sm:basis-1/2 lg:basis-1/3">
            <ProductPreviewCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={`${ARROW_CLASS} left-2 lg:-left-5`} />
      <CarouselNext className={`${ARROW_CLASS} right-2 lg:-right-5`} />
    </Carousel>
  );
}

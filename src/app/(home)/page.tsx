import Welcome from "./welcome/page";
import Product from "./products/page";
import Description from "./description/page";
import Testimonial from "./testimonials/page";
import PopularProduct from "./products/PopularProduct";

export default function Home() {
  return (
    <main>
      <Welcome />
      <Product />
      <Description />
      <Testimonial />
      <PopularProduct />
    </main>
  );
}

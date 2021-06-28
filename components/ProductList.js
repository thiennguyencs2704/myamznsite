import Product from "./Product";
import Link from "next/link";

const ProductList = ({ amaProducts }) => {
  return (
    <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
      {amaProducts.map((item) => (
        <Link
          key={item.id}
          href={{
            pathname: "/productdetail/[id]",
            // query: { id: item.id, productData: JSON.stringify(item) },
            query: {
              id: item.id,
              title: item.title,
              description: item.description,
              price: item.price,
              star: item.star,
              image: item.image,
              category: item.category,
            },
          }}
        >
          <a className=" mb-14">
            <Product key={item.id} product={item} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;

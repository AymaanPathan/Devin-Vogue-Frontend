import { useContext, useEffect, useState } from "react";
import { Productcontext } from "../../Context/Product";
import { Link } from "react-router-dom";
import { navs } from "./Data";
import star from "./star.png";
import "./best.css";

export default function Best() {
  const { products, handleSmoothScroll } = useContext(Productcontext);

  const [filter, setFilters] = useState("All");
  const [active, setActive] = useState(0);
  const [showProducts, setShowProducts] = useState([]);

  const handleClick = (e, index) => {
    setFilters(e.target.textContent);
    setActive(index);
  };

  useEffect(() => {
    let items = [];
    if (filter === "All") {
      const womenProducts = products
        .filter((item) => item.category === "women")
        .slice(8, 11);
      const menProducts = products
        .filter((item) => item.category === "men")
        .slice(0, 3);
      items = [...womenProducts, ...menProducts];
    } else {
      items = products.filter((item) => item.category === filter).slice(0, 3);
    }
    setShowProducts(items);
  }, [products, filter]);

  return (
    <div className="best-container mt-12 p-8">
      <div className="grid grid-cols-1 gap-2 lg:mb-6">
        <span className="lg:text-lg text-sm text-start text-[#777C84] font-semibold">
          Our Products
        </span>
        <span
          className="lg:text-2xl text-md text-start text-[#1B2834] font-semibold"
          id="OurProducts"
        >
          Our Bestselling Products
        </span>
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="text-black flex flex-wrap justify-center gap-3 mb-6">
          {navs.map((navItem, index) => (
            <span
              key={index}
              className={`${
                active === index
                  ? "font-extrabold border bg-[#1B2834] text-white rounded-md"
                  : "text-black border"
              } h-full py-2 w-32 text-center cursor-pointer select-none rounded-md text-lg`}
              onClick={(e) => handleClick(e, index)}
            >
              {navItem.Name}
            </span>
          ))}
        </div>
        <div className="deal__main mt-8">
          {showProducts.map((item, i) => {
            return (
              <div key={i} className="deal__item">
                <div className="w-fit h-full rounded-lg shadow">
                  <Link onClick={handleSmoothScroll} to={`/${item.ItemId}`}>
                    <img
                      className="deal-imgs h-96 rounded-t-lg"
                      src={item.image}
                      alt=""
                    />
                  </Link>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-xl text-left tracking-tight text-gray-900">
                        {item.name}
                      </h5>
                    </a>
                    <div className="flex items-center mb-3 justify-start gap-2">
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Zara
                      </p>
                      <p className="text-gray-500">4.0</p>
                      <img className="w-4 h-4" src={star} alt="" />
                    </div>
                    <div className="flex justify-start gap-4 items-center">
                      <p className="font-bold text-lg">Rs. {item.newPrice}</p>
                      <p className="font-extralight text-gray-500 text-lg line-through">
                        Rs. {item.oldPrice}
                      </p>
                      <p className="text-green-600 font-semibold">(30% off)</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

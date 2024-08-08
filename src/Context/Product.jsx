/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const Productcontext = createContext(null);

const ProductContextProvider = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartItem, setCartItem] = useState({});
  const token = localStorage.getItem("token");

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchProducts = async () => {
    toast.loading("Fetching Products from Database...");
    try {
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/all-products"
      );
      if (response.ok) {
        toast.dismiss();
        const data = await response.json();
        setProducts(data.AllProduct);
      } else {
        toast.dismiss();
        console.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error fetching products:");
      console.error("Error fetching products:", error);
    }
  };

  const handleCartCount = async () => {
    try {
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/userCartCount",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.userCartCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCartCount();
    fetchProducts();
  }, [currentPage]);

  const deleteProduct = async (itemId) => {
    toast.loading("Deleting Item");
    try {
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/delete-product",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ ItemId: itemId }),
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        toast.dismiss();
        toast.error("You Are Not an admin");
      } else {
        toast.dismiss();
        toast.success("Item Deleted");
        fetchProducts();
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (itemId) => {
    toast.loading("Removing Item From Cart...");
    try {
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/RemovefromCart",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            token: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ItemId: itemId }),
        }
      );
      if (response.ok) {
        await response.json();
        toast.dismiss();
        toast.success("Item Removed From Cart");
        handleCartCount();
      } else {
        toast.dismiss();
        toast.error("Please Try Again Later");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const getCart = async () => {
    toast.loading("Fetching Your Cart...");
    if (token) {
      try {
        const response = await fetch(
          "https://devin-vogue-api.vercel.app /GetCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCartItem(data);
        } else {
          throw new Error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  };

  const emptyCart = async () => {
    const response = await fetch(
      "https://devin-vogue-api.vercel.app/EmptyCart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    handleCartCount(); // Update cart count after emptying cart
    console.log(response);
  };

  return (
    <Productcontext.Provider
      value={{
        cartCount,
        handleCartCount,
        setCurrentPage,
        currentPage,
        totalPage,
        setTotalPage,
        deleteProduct,
        handleSmoothScroll,
        cartItem,
        removeFromCart,
        setCartItem,
        emptyCart,
        products,
        setProducts,
        fetchProducts,
        getCart,
      }}
    >
      {props.children}
    </Productcontext.Provider>
  );
};

export default ProductContextProvider;

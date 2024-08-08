import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Productcontext } from "../../Context/Product";
import Sidebar from "./Sidebar";
import "./adminPanel.css";

export default function MainContent() {
  const [ItemId, setItemId] = useState();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productOldPrice, setProductOldPrice] = useState();
  const [productNewPrice, setProductNewPrice] = useState();
  const [color, setColor] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("Select image");
  const { fetchProducts } = useContext(Productcontext);
  const token = localStorage.getItem("token");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || "Select image");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", file);

    try {
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.image_url);
        console.log("File uploaded:", data);
        alert("File uploaded successfully");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const handleAddProduct = async () => {
    if (
      !ItemId ||
      ItemId <= 0 ||
      !productCategory ||
      !productDescription ||
      !productOldPrice ||
      !productNewPrice ||
      !color ||
      isNaN(productOldPrice) ||
      isNaN(productNewPrice)
    ) {
      toast.error("All fields are required and must be valid.");
      return;
    }

    try {
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/AddProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            ItemId: parseInt(ItemId, 10),
            name: productName,
            image: imageUrl,
            category: productCategory,
            description: productDescription,
            oldPrice: parseFloat(productOldPrice),
            newPrice: parseFloat(productNewPrice),
            color: color,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${response.statusText}`);
        console.error(`Details: ${errorText}`);
        throw new Error("Failed to add product.");
      }

      const result = await response.json();
      toast.success(`Product ${result.product.name} added successfully!`);
      fetchProducts(); // Fetch updated list of products
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  const resetForm = () => {
    setItemId(0);
    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setProductOldPrice(0);
    setProductNewPrice(0);
    setColor("");
    setFile(null);
    setFileName("Select image");
    setImageUrl("");
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <div className="flex mx-auto w-full bg-white rounded-lg shadow-md">
      <Sidebar />

      {/* Form Container */}
      <div className="flex-1 px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="itemId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Item ID
            </label>
            <input
              value={ItemId}
              onChange={(e) => setItemId(e.target.value)}
              type="number"
              id="itemId"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter item ID..."
            />
          </div>

          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              id="productName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product name..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Category
            </label>
            <input
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              type="text"
              id="productCategory"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product category..."
            />
          </div>

          <label
            htmlFor="productImage"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <div className="flex h-12 gap-12 items-center">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="productImage"
                className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-white text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {fileName}
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                id="productImage"
                name="productImage"
                className="hidden"
              />
              <button
                onClick={handleUpload}
                type="button"
                className="bg-indigo-600 py-2 px-6 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload
              </button>
            </div>
            {imageUrl && (
              <div className="">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-12 h-12 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="productDescription"
            className=" text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            id="productDescription"
            className="text-area w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product description..."
            rows="2"
          ></textarea>
        </div>

        <div className="flex gap-8 items-center">
          <div className="grid grid-cols-1">
            <label
              htmlFor="newPrice"
              className="block text-sm font-medium text-gray-700 "
            >
              New Price
            </label>
            <input
              value={productNewPrice}
              onChange={(e) => setProductNewPrice(e.target.value)}
              type="number"
              id="newPrice"
              className="w-fit px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter new price..."
            />
          </div>

          <div className="grid grid-cols-1">
            <label
              htmlFor="oldPrice"
              className="text-sm font-medium text-gray-700 "
            >
              Old Price
            </label>
            <input
              value={productOldPrice}
              onChange={(e) => setProductOldPrice(e.target.value)}
              type="number"
              id="oldPrice"
              className="px-3  py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter old price..."
            />
          </div>
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Color
            </label>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              id="color"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product name..."
            />
          </div>

          {/* Button to submit form */}
        </div>
        <button
          onClick={handleAddProduct}
          type="button"
          className=" bg-indigo-600 px-3 py-2 text-white  rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

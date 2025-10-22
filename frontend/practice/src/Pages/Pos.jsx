import { useEffect, useState } from "react";
import useMedicine from "../Customhooks/useMedicine.js";
import useOrder from "../Customhooks/useOrder.js";

export default function Pos() {
  const { medicine } = useMedicine();

  const [bar, setbar] = useState("management");
  const [isLoaded, setIsLoaded] = useState(false);
  const [additem, setadditem] = useState([]);

  const { order, setorder, createOrderHook, editOrderHook, deleteOrderHook } =
    useOrder();

  // get local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setadditem(JSON.parse(savedCart));
      console.log("Saved item", savedCart);
    }
    setIsLoaded(true); // ✅ Mark as loaded
  }, []);

  // set local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(additem));
    }
  }, [additem]);

  // show on screen
  const showCart = (name, price) => {
    try {
      const existingItem = additem.find((item) => item.name === name);
      if (!existingItem) {
        const newItem = { name: name, price: price, quantity: 1 };
        setadditem([...additem, newItem]);
      } else {
        const updateItem = additem.map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: item.price + price,
              }
            : item
        );
        setadditem(updateItem);
      }
      console.log("Everything works");
    } catch (error) {
      console.log("Something wrong");
    }
  };

  // submit functionality
  const handleSubmit = async () => {
    try {
      const finalPrice = additem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const payload = {
        Medicines: additem, // ✅ whole array
        Finalprice: finalPrice, // ✅ same name as model column
      };

      const res = await createOrderHook(payload);
      if (res?.data) {
        console.log("Data added successfully");
      }
    } catch (error) {
      console.log("Some error in submit");
    }
  };

  // edit functionality

  // delete functionality

  return (
    <div className="ml-64 p-6 text-left">
      <h1 className="text-lg font-bold">Add items to Cart</h1>
      <p>
        Browse through our products and add your favorite items to the cart. You
        can review your selections before proceeding to checkout.
      </p>

      {/* Tabs */}
      <div className="mt-1 inline-flex bg-gray-100 rounded-md shadow-sm p-1">
        <button
          onClick={() => setbar("management")}
          className={`px-4 py-2 text-sm rounded-md transition cursor-pointer ${
            bar === "management"
              ? "bg-white text-700 font-semibold shadow-sm"
              : "text-gray-600 font-normal"
          }`}
        >
          Order Management
        </button>
        <button
          onClick={() => setbar("details")}
          className={`px-4 py-2 text-sm rounded-md transition cursor-pointer ${
            bar === "details"
              ? "bg-white text-700 font-semibold shadow-sm"
              : "text-gray-600 font-normal"
          }`}
        >
          Order Details
        </button>
      </div>

      {/* Tabs Content */}
      {bar === "management" && (
        <div className="flex justify-between items-start">
          <div className="w-3/5 mt-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Medicines Cart
            </h1>

            <div className="space-y-4">
              {medicine.map((med, i) => (
                <div
                  key={i}
                  className="w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  onClick={() => showCart(med.medicinename, med.salesprice)}
                >
                  <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {med.medicinename}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Available now
                      </p>
                    </div>
                    <p className="text-xl font-bold text-green-600 mt-2 sm:mt-0">
                      ${med.salesprice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side – Cart */}
          {additem.length > 0 && (
            <div className="w-1/3 bg-white rounded-lg shadow-lg p-4 mt-18">
              <h2 className="text-xl font-bold mb-4 text-center">Your Cart</h2>

              {/* Cart Items */}
              {additem.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price * item.quantity}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() =>
                      setadditem(additem.filter((_, i) => i !== index))
                    }
                    className="text-red-500 hover:text-red-700 text-lg font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Grand Total */}
              <div className="flex justify-between font-bold pt-3">
                <span>Total:</span>
                <span>
                  $
                  {additem
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Buy Now button */}
              <button
                className="w-full bg-green-600 text-white py-2 rounded-lg mt-3 hover:bg-green-700 transition cursor-pointer"
                button="button"
                onClick={()=> {handleSubmit(); alert("Your order is added successfully")}}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      )}

      {bar === "details" && (
        <div className="max-w-lg mt-6 space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>
          {order.map((odr, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Order # {i + 1}
              </h2>

              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-6 py-3 border-b text-gray-600">#</th>
                    <th className="px-6 py-3 border-b text-gray-600">
                      Medicine Name
                    </th>
                    <th className="px-6 py-3 border-b text-gray-600">Price</th>
                    <th className="px-6 py-3 border-b text-gray-600">
                      Quantity
                    </th>
                    <th className="px-6 py-3 border-b text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {odr.Medicines.map((med, j) => (
                    <tr key={`${i}-${j}`} className="hover:bg-gray-50">
                      <td className="px-6 py-3 border-b">{i + 1}</td>
                      <td className="px-6 py-3 border-b">{med.name}</td>
                      <td className="px-6 py-3 border-b">${med.price}</td>
                      <td className="px-7 py-3 border-b">{med.quantity}</td>
                      <td className="px-6 py-3 border-b">
                        ${med.price * med.quantity}
                      </td>
                    </tr>
                  ))}

                  {/* ✅ Total for each order */}
                  <tr className="font-bold bg-gray-100">
                    <td colSpan={4} className="px-6 py-3 text-right border-b">
                      Grand Total
                    </td>
                    <td className="px-6 py-3 border-b">${odr?.Finalprice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

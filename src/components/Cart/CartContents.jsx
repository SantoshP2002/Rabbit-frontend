import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slice/cartSlice";
import ConfirmModal from "../ConfirmModal";
import toast from "react-hot-toast";

const CartContents = ({ cart, userId, guestId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  // Handel adding Nad Substracting to cart
  const handelAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      dispatch(
        removeFromCart({
          productId: selectedItem.productId,
          userId,
          guestId,
          size: selectedItem.size,
          color: selectedItem.color,
        }),
      );
    }

    toast.success("Product removed from cart");
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-4 border-b "
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />

            {/* COLOR AND SIZE */}
            <div>
              <h3 className="text-sm">{product.name}</h3>
              <p className="text-xs text-gray-500">
                Color: {product.color} | Size: {product.size}
              </p>
              {/* INCREMENT AND DECREMENT BUTTONS (quantity) */}
              <div className="flex items-center p-2">
                <button
                  onClick={() =>
                    handelAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium "
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handelAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium "
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>₹{product.price.toLocaleString()}</p>

            <button
              onClick={() => {
                setSelectedItem(product);
                setIsModalOpen(true);
              }}
            >
              <RiDeleteBin5Line className="h-6 w-6 mt-2 text-red-300" />
            </button>
          </div>
        </div>
      ))}

      <ConfirmModal
        open={isModalOpen}
        title="Remove Item"
        message={`Remove ${selectedItem?.name} (${selectedItem?.size}, ${selectedItem?.color}) from cart?`}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        confirmText="DELETE"
      />
    </div>
  );
};

export default CartContents;

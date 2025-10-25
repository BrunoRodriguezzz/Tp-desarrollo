import { Navigate } from "react-router-dom";
import { useCart } from "../carrito/cartContext/CartContext";

const ProtectedCheckout = ({ children }) => {
  const { totalItems } = useCart();

  if (!totalItems || totalItems === 0) {
    return <Navigate to="/carrito" replace />;
  }

  return children;
};

export default ProtectedCheckout;
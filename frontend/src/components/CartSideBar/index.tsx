import clsx from "clsx";
import { useCartStore } from "../../context/cartStore";
import ShoppingCartCard from "../ShoppingCart";

const CartSideBar = () => {
    const isOpen = useCartStore((state) => state.isOpen);
    const closeCart = useCartStore((state) => state.closeCart);

    if (!isOpen) return null;

    return (
        <div
            className={clsx(
                "w-full h-full fixed top-0 left-0 z-50",
                "bg-black/40"
            )}
            onClick={closeCart}
        >
            <div onClick={(e) => e.stopPropagation()}>
                <ShoppingCartCard />
            </div>
        </div>
    );
};

export default CartSideBar;

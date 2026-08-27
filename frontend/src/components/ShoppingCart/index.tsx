import clsx from "clsx";
import { Link } from "react-router-dom";
import CloseCart from "../../../public/Icons/close_cart.svg";
import { useCartStore } from "../../context/cartStore";
import ShoppingCartItem from "../ShoppingCartItem";

const formatRs = (value: number) =>
    new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

const ShoppingCartCard = () => {
    const closeCart = useCartStore((state) => state.closeCart);
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);

    const subtotal = items.reduce((sum, item) => {
        const itemPrice = item.discountPrice
            ? item.price - item.price * (item.discountPrice / 100)
            : item.price;

        return sum + itemPrice * item.quantity;
    }, 0);

    return (
        <aside
            aria-label="Shopping cart"
            className={clsx(
                "fixed top-0 right-0 z-50 flex w-[417px] h-[746px] flex-col bg-white shadow-md",
            )}>
            <div className="flex items-center justify-between border-b-2 border-[#D9D9D9] px-7 py-7">
                <h1 className="font-poppins text-[24px] font-semibold text-primary-text">
                    Shopping Cart
                </h1>
                <button
                    type="button"
                    aria-label="Close cart"
                    onClick={closeCart}
                    className="cursor-pointer border-0 bg-transparent p-0">
                    <img src={CloseCart} alt="" />
                </button>
            </div>

            <div className={clsx(
                "flex-1 overflow-y-auto px-7 py-6"
            )}>
                {items.length === 0 ? (
                    <p className={clsx(
                        "py-10 text-center font-poppins text-[#9F9F9F]"
                    )}>
                        Your cart is empty.
                    </p>
                ) : (
                    <ul className="space-y-5">
                        {items.map((item) => (
                            <ShoppingCartItem
                            key={item.id}
                            item={item}
                            onRemove={removeItem}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <div className={clsx(
                "border-t-2 border-[#D9D9D9] px-7 py-5 font-poppins"
            )}>
                <div className={clsx(
                    "flex items-center justify-between text-[16px]"
                )}>
                    <span>Subtotal</span>
                    <span className={clsx(
                        "font-medium text-[#B88E2F]"
                    )}>
                        Rs. {formatRs(subtotal)}
                    </span>
                </div>
                <div className={clsx(
                    "mt-5 flex items-center justify-center gap-3.5"
                )}>
                    <Link to="/cart" onClick={closeCart} className={clsx(
                        "font-poppins font-normal text-[16px] text-primary-text",
                        "pr-7.5 pl-7.5 pt-2.5 pb-2.5 border-2 border-over-primary rounded-[50px] bg-primary hover:bg-[#E0E0E0]"
                    )}>
                    Cart
                </Link>
                <Link to="/checkout" onClick={closeCart} className={clsx(
                    "font-poppins font-normal text-[16px] text-primary-text",
                    "pr-7.5 pl-7.5 pt-2.5 pb-2.5 border-2 border-over-primary rounded-[50px] bg-primary hover:bg-[#E0E0E0]"
                )}>
                    Checkout
                </Link>
                </div>
            </div>
        </aside>
    );
};

export default ShoppingCartCard;

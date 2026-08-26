import clsx from "clsx";
import { useCartStore } from "../../context/cartStore";

type RightMenuProps = {
    className?: string;
};

const RightMenu = ({ className }: RightMenuProps) => {
    const LinkHover = "hover:cursor-pointer hover:scale-110 transition";
    const openCart = useCartStore((state) => state.openCart);

    return (
        <div className={clsx("flex gap-[33.66px]", className)}>
            <a className={clsx(LinkHover)}>
                <img
                    src="/Icons/alert.svg"
                    alt="Ícone de alerta"
                    className="max-h-[18.66px]"
                />
            </a>
            <button onClick={openCart} className={clsx(LinkHover, "bg-transparent border-none p-0")}>
                <img
                    src="/Icons/shop.svg"
                    alt="Ícone do carrinho"
                    className="max-h-[22.05px]"
                />
            </button>
        </div>
    );
};

export default RightMenu;

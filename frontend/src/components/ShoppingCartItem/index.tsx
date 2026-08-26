import clsx from "clsx";
import type { CartItem } from "../../context/cartStore";
import XIcon from "../../../public/Icons/x_icon.svg";

type ShoppingCartItemProps = {
  item: CartItem;
  onRemove: (id: string) => void;
};
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const getImageUrl = (image: string) =>
  image.startsWith("http") ? image : `${API_URL}${image}`;

const formatRs = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const ShoppingCartItem = ({ item, onRemove }: ShoppingCartItemProps) => {
  const itemPrice = item.discountPrice
    ? item.price - item.price * (item.discountPrice / 100)
    : item.price;

  return (
    <li className={clsx("flex items-center gap-3 font-poppins")}>
      <img
            src={getImageUrl(item.image)}
            alt={item.name}
            className={clsx(
                "h-20 w-20 rounded-[10px] bg-[#F9F1E7] object-contain"
            )}
        />
        <div className={clsx(
            "min-w-0 flex-1"
        )}>
            <p className={clsx(
                "truncate text-[16px] text-black"
            )}>
                {item.name}
            </p>
            <p className={clsx(
                "mt-2 text-[14px] text-black"
            )}>
                {item.quantity} x{" "}
                <span className="text-[#B88E2F]">
                    Rs. {formatRs(itemPrice)}
                </span>
            </p>
        </div>
        <button
            type="button"
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => onRemove(item.id)}
            className={clsx(
                "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center"
            )}>
            <img src={XIcon} alt="Remove item" />
        </button>
    </li>
  );
};

export default ShoppingCartItem;
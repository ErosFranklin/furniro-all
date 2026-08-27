import clsx from "clsx";
import { type UseFormRegister } from "react-hook-form";
import type { CartItem } from "../../context/cartStore";
import { useState } from "react";


type PaymentMethod = "bankTransfer" | "cashOnDelivery";

type CheckoutOrderSummaryProps = {
    items: CartItem[];
    paymentError?: string;
    register: UseFormRegister<{ paymentMethod: PaymentMethod }>;
};

const formatPrice = (value: number) =>
    `Rs. ${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;

const getItemPrice = (item: CartItem) =>
    item.discountPrice ? item.price - item.price * (item.discountPrice / 100) : item.price;

const CheckoutOrderSummary = ({ items, paymentError, register }: CheckoutOrderSummaryProps) => {
    const subtotal = items.reduce((total, item) => total + getItemPrice(item) * item.quantity, 0);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
    const paymentMethodRegister = register("paymentMethod", {
        onChange: (event) => setPaymentMethod(event.target.value as PaymentMethod),
    });


    return(
        <aside className={clsx("w-full font-poppins text-[14px text-black")}>
            <div className={clsx(
                "grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-[22px] border-b border-[#D9D9D9] pb-[33px]"
            )}>
                <h2 className={clsx("text-[24px] font-medium")}>
                    Product
                </h2>
                <h2 className={clsx("text-right text-[24px] font-medium")}>
                    Subtotal
                </h2>
                {items.length ? items.map((item) => <div key={item.id} className={clsx("contents")}>
                    <p className={clsx("text-[#9F9F9F]")}>{item.name} <span className={clsx("ml-2 text-[12px] text-black")}>× {item.quantity}</span></p>
                    <p className={clsx("text-right text-[12px]")}>{formatPrice(getItemPrice(item) * item.quantity)}</p>
                </div>) : <p className={clsx("col-span-2 text-[#9F9F9F]")}>Your cart is empty.</p>}
                <p>Subtotal</p>
                    <p className={clsx("text-right")}>{formatPrice(subtotal)}
                </p>
                <p className={clsx("self-center")}>Total</p>
                <p className={clsx("text-right text-[24px] font-bold text-[#B88E2F]")}>{formatPrice(subtotal)}</p>
            </div>

            <div className={clsx("pt-[22px]")}>
                <label className={clsx(
                    "flex cursor-pointer items-center gap-[15px]",
                    paymentMethod === "bankTransfer" ? "text-black" : "text-[#9F9F9F]"
                )}>
                    <input 
                        type="radio" 
                        value="bankTransfer" 
                        className={clsx(
                            "h-[14px] w-[14px] appearance-none rounded-full border-2 border-[#9F9F9F]",
                            "checked:border-black checked:bg-black",
                            "transition-colors cursor-pointer"
                        )} 
                        {...paymentMethodRegister} 
                    />
                    <span>Direct Bank Transfer</span>
                </label>
                {paymentMethod === "bankTransfer" && (
                    <p className={clsx("mt-[11px] text-[#9F9F9F]")}>
                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                )}
                <label className={clsx(
                    "mt-[25px] flex cursor-pointer items-center gap-[15px]",
                    paymentMethod === "cashOnDelivery" ? "text-black" : "text-[#9F9F9F]"
                )}>
                    <input 
                        type="radio" 
                        value="cashOnDelivery" 
                         className={clsx(
                            "h-[14px] w-[14px] appearance-none rounded-full border-2 border-[#9F9F9F]",
                            "checked:border-black checked:bg-black",
                            "transition-colors cursor-pointer"
                        )}  
                        {...paymentMethodRegister} />
                    <span>Cash On Delivery</span>
                </label>
                {paymentError && <p className={clsx("mt-3 text-[13px] text-red-600")} role="alert">{paymentError}</p>}
                <p className={clsx(
                    "font-poppins text-[16px] mt-[22px] text-over-primary"
                )}>
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="#privacy" className={clsx("font-semibold text-black underline-offset-2 hover:underline")}>privacy policy</a>.
                </p>
                <button type="submit" className={clsx(
                    "mx-auto mt-[39px] flex h-[64px] w-full max-w-[318px]"," cursor-pointer items-center justify-center",
                    "rounded-[15px] border border-black text-[20px]",
                    "transition hover:bg-[#F9F1E7]",
                    "focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2"
                )}>
                    Place order
                </button>
            </div>
        </aside>
    )
};

export default CheckoutOrderSummary;

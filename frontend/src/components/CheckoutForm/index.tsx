import clsx from "clsx";
import { type FocusEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import CheckoutOrderSummary from "../CheckoutOrderSummary";

const checkoutSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    companyName: z.string().trim(),
    country: z.string().trim().min(1, "Country or region is required."),
    streetAddress: z.string().trim().min(1, "Street address is required."),
    city: z.string().trim().min(1, "Town or city is required."),
    province: z.string().trim().min(1, "Province is required."),
    zipCode: z.string().trim().regex(/^\d{5}-?\d{3}$/, "Enter a valid ZIP code."),
    phone: z.string().trim().min(8, "Enter a valid phone number."),
    email: z.string().trim().email("Enter a valid email address."),
    additionalInformation: z.string().trim(),
    paymentMethod: z.enum(["bankTransfer", "cashOnDelivery"], { error: "Select a payment method." }),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;
type FieldName = Exclude<keyof CheckoutValues, "paymentMethod">;

type CheckoutFieldProps = { 
    label: string; 
    name: FieldName; 
    optional?: boolean; 
    type?: "text" | "email" | "textarea"; 
    placeholder?: string; 
    error?: string;  
    onBlur?: (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; 
    register: ReturnType<typeof useForm<CheckoutValues>>["register"] 
};

const CheckoutField = ({ label, name, optional = false, type = "text", placeholder, error, onBlur, register }: CheckoutFieldProps) => {
    const fieldClassName = clsx("h-[75px] w-full rounded-[10px] border bg-white px-5 font-poppins text-[15px] text-[#333] outline-none transition placeholder:text-[#9F9F9F] focus:border-[#B88E2F] focus:ring-2 focus:ring-[#B88E2F]/20", error ? "border-red-500" : "border-[#9F9F9F]");
    return <div className={clsx("flex w-full flex-col gap-[10px]")}>
        {label && <label htmlFor={name} className={clsx("mb-3 font-poppins text-[16px] font-medium text-black")}>{label}{optional && " (optional)"}</label>}
        {type === "textarea" ? <textarea id={name} placeholder={placeholder} className={clsx(fieldClassName, "min-h-[75px] resize-y py-[25px]")} {...register(name, { onBlur })} />
        : <input id={name} type={type} className={fieldClassName} {...register(name, { onBlur })} />}
        {error && <p role="alert" className={clsx("text-[13px] text-red-600")}>{error}</p>}
    </div>;
};

const CheckoutForm = () => {
    const { items, clearCart } = useCart();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema), defaultValues: { companyName: "", additionalInformation: "" } });
    const handleZipCodeBlur = async (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const zipCode = event.target.value.replace(/\D/g, "");
        if (zipCode.length !== 8) return;

        try {
            clearErrors("zipCode");
            const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
            if (!response.ok) throw new Error("Unable to find this ZIP code.");
            const address: { erro?: boolean; logradouro?: string; localidade?: string; estado?: string } = await response.json();
            if (address.erro) throw new Error("ZIP code not found.");

            setValue("country", "Brazil", { shouldValidate: true });
            setValue("streetAddress", address.logradouro ?? "", { shouldValidate: true });
            setValue("city", address.localidade ?? "", { shouldValidate: true });
            setValue("province", address.estado ?? "", { shouldValidate: true });
        } catch (error) {
            setError("zipCode", { type: "manual", message: error instanceof Error ? error.message : "Unable to find this ZIP code." });
        }
    };
    const onSubmit = () => {
        if (items.length === 0) {
            toast.error("Your cart is empty.");
            navigate("/", { replace: true });
            return;
        }
        toast.success("Your order has been placed successfully!");
        clearCart();
        navigate("/", { replace: true });
    };

    return( 
        <form className={clsx("mx-auto grid w-full max-w-[1242px] grid-cols-1 gap-[26px] px-5 py-14 sm:px-10 md:py-[63px] lg:grid-cols-2 lg:gap-[26px] lg:px-0 lg:pb-[85px]")} noValidate onSubmit={handleSubmit(onSubmit)}>
            <section className={clsx("w-full max-w-[608px] lg:px-[26px]")}>
                <h1 className={clsx("text-[30px] font-semibold text-black sm:text-[36px]")}>Billing details</h1>
                <div className={clsx("mt-9 flex w-full flex-col gap-9")}>
                    <div className={clsx("grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-[31px]")}><CheckoutField label="First Name" name="firstName" error={errors.firstName?.message} register={register} /><CheckoutField label="Last Name" name="lastName" error={errors.lastName?.message} register={register} /></div>
                    <CheckoutField label="Company Name" name="companyName" optional error={errors.companyName?.message} register={register} />
                    <CheckoutField label="ZIP code" name="zipCode" onBlur={handleZipCodeBlur} error={errors.zipCode?.message} register={register} />
                    <CheckoutField label="Country / Region" name="country" error={errors.country?.message} register={register} />
                    <CheckoutField label="Street address" name="streetAddress" error={errors.streetAddress?.message} register={register} />
                    <CheckoutField label="Town / City" name="city" error={errors.city?.message} register={register} />
                    <CheckoutField label="Province" name="province" error={errors.province?.message} register={register} />
                    <CheckoutField label="Phone" name="phone" error={errors.phone?.message} register={register} />
                    <CheckoutField label="Email address" name="email" type="email" error={errors.email?.message} register={register} />
                    <div className={clsx("pt-5")}>
                        <CheckoutField label="" name="additionalInformation" type="textarea" placeholder="Additional information" error={errors.additionalInformation?.message} register={register} /></div>
                </div>
            </section>
            <section className={clsx("w-full max-w-[608px] h-full max-h-[789px] lg:px-[38px] lg:pt-[22px]")}>
                <CheckoutOrderSummary items={items} paymentError={errors.paymentMethod?.message} register={register} />
            </section>
        </form>
    )
};

export default CheckoutForm;

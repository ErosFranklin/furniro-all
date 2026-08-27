import clsx from "clsx";
import Container from "../../components/Container";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import CheckoutForm from "../../components/CheckoutForm";

const CheckoutPage = () => {
    return(
        <div className={clsx("w-full overflow-x-clip bg-white font-poppins")}>
            <Container>
                <BannerCard 
                    title="Checkout" 
                    breadcrumbs={[
                        { label: "Home", href: "/" }, 
                        { label: "Checkout" }
                    ]} 
                />
            </Container>
            <CheckoutForm />
            <Container>
                <BenefitsCard />
            </Container>
        </div>
    )
}

export default CheckoutPage

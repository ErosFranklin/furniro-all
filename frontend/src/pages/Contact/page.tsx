import clsx from "clsx";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import Container from "../../components/Container";
import TitlePage from "../../components/Title/page";
import ContactItem from "../../components/ContactItems";
import  GPS  from "../../../public/Icons/gps.svg";
import Phone from "../../../public/Icons/phone.svg";
import Clock from "../../../public/Icons/clock.svg";
import ContactForm from "../../components/ContactForm";


const ContactPage = () => {
    return(
       <div>
        <Container>
            <BannerCard
                title="Contact"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Contact" },
                ]}
            />
        </Container>
        <Container className="bg-primary">
            <TitlePage 
                title="Get In Touch With Us" 
                description="For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!" 
            />
            <div className={clsx(
                "mx-auto mt-12 mb-16 grid w-full max-w-251.25 grid-cols-1 gap-12 px-6",
                "sm:px-8 lg:mt-21.25 lg:mb-15.75 lg:grid-cols-2 lg:gap-21.25 lg:px-0"
            )}>
                <div className={clsx("flex flex-col gap-8 lg:pt-2")}>
                    <ContactItem
                        icon={GPS}
                        title="Address"
                        lines={["236 5th SE Avenue, New", "York NY10000, United", "States"]}
                    />
                    <ContactItem
                        icon={Phone}
                        title="Phone"
                        lines={["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"]}
                    />
                    <ContactItem
                        icon={Clock}
                        title="Working Time"
                        lines={["Monday-Friday: 9:00 -", "22:00", "Saturday-Sunday: 9:00 -", "21:00"]}
                    />
                </div>
                <ContactForm/>
            </div>
        </Container>
        <Container>
            <BenefitsCard />
        </Container>
       </div>
    )
}

export default ContactPage;

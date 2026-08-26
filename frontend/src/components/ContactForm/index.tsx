import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import ContactFormItem from "../ContactFormItem";

type ContactValues = { 
    name: string; 
    email: string; 
    subject: string; 
    message: string 
};
const initialValues: ContactValues = { 
    name: "", 
    email: "", 
    subject: "", 
    message: "" 
};
const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

const ContactForm = () => {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const handleChange = (field: keyof ContactValues, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    if (!values.name.trim() || !isValidEmail(values.email)) return;
    toast.success("Your message has been sent successfully.");
    setValues(initialValues);
    setHasSubmitted(false);
  };
  const showNameError = hasSubmitted && !values.name.trim();
  const showEmailError = (values.email.length > 0 || hasSubmitted) && !isValidEmail(values.email);

  return <form className="w-full" onSubmit={handleSubmit} noValidate>
    <ContactFormItem 
        label="Your Name" 
        placeholder="Abc" 
        type="text" 
        value={values.name} 
        onChange={(value) => handleChange("name", value)} 
        error={showNameError ? "Please enter your name." : undefined} />
    <ContactFormItem 
        label="Email" 
        placeholder="Abc@def.com" 
        type="email" 
        value={values.email} 
        onChange={(value) => handleChange("email", value)} 
        error={showEmailError ? "Please enter a valid email address." : undefined} />
    <ContactFormItem 
        label="Subject" 
        placeholder="This is optional" 
        type="text" 
        value={values.subject} 
        onChange={(value) => handleChange("subject", value)} />
    <ContactFormItem 
        label="Message" 
        placeholder="Hi! I'd like to ask about" 
        type="textarea" 
        value={values.message} 
        onChange={(value) => handleChange("message", value)} />
    <button type="submit" className={clsx(
      "mt-3 flex h-13.75 w-full max-w-59.25 items-center justify-center gap-3 rounded-md sm:mt-12.25",
      "bg-over-secundary font-poppins text-[16px] font-regular text-primary cursor-pointer transition-colors hover:brightness-90",
      "focus:outline-none focus:ring-2 focus:ring-over-secundary focus:ring-offset-2",
    )}>Submit</button>
  </form>;
};

export default ContactForm;

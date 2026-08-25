import { Toaster } from "react-hot-toast";
import Container from "./components/Container";
import Header from "./components/Header";
import Home from "./pages/Home/page";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Product from "./pages/Product/page";
import Shop from "./pages/Shop/page";
import Cart from "./pages/Cart/page";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUP/page";

const App = () => {
    const location = useLocation();
    const noHeaderFooterRoutes = ['/signup', '/login'];
    const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);
    return (
        <>
            <Toaster />
            {!hideHeaderFooter && (
                <Container className="bg-[#FFF]">
                    <Header />
                </Container>
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop/:category?" element={<Shop />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
            {!hideHeaderFooter && (
                <Container className="bg-primary border-t border-t-[rgba(0,0,0,0.17)]">
                    <Footer />
                </Container>
            )}
            
        </>
    );
};

export default App;

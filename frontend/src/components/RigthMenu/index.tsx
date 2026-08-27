import clsx from "clsx";
import { LogOut } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useCartStore } from "../../context/cartStore";
import { logoutUser } from "../../services/user.service";

type RightMenuProps = {
  className?: string;
};

const RightMenu = ({ className }: RightMenuProps) => {
  const linkHover = "hover:cursor-pointer hover:scale-110 transition";
  const navigate = useNavigate();
  const openCart = useCartStore((state) => state.openCart);
  const { isAuthenticated, setUser } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      setUser(null);
      toast.success("Signed out successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn't log you out. Please try again.";
      toast.error(message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      toast("You are already signed in.");
      return;
    }

    navigate("/login");
  };

  return (
    <div className={clsx("flex gap-[33.66px]", className)}>
      <button
        type="button"
        onClick={handleUserClick}
        aria-label="User account"
        className={clsx(linkHover, "bg-transparent border-none p-0")}
      >
        <img
          src="/Icons/alert.svg"
          alt="Alert icon"
          className="max-h-[18.66px]"
        />
      </button>
      <button
        type="button"
        onClick={openCart}
        className={clsx(linkHover, "bg-transparent border-none p-0")}
      >
        <img
          src="/Icons/shop.svg"
          alt="Cart icon"
          className="max-h-[22.05px]"
        />
      </button>
      {isAuthenticated && (
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          aria-label="Sign out"
          className={clsx(
            linkHover,
            "bg-transparent border-none p-0 disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          <LogOut size={22} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default RightMenu;

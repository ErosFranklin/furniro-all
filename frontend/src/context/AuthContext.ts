import { createContext} from "react";

export type User = { id: string; email: string };

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
import {
	type Dispatch,
	type SetStateAction,
	createContext,
	type ReactNode,
	useState,
	useContext,
} from "react";

// user.isAuthenticated? expand?
// need to check if token exist and adjust isAuthenticated accordingly
type GlobalContext = {
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalContext | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return (
		<GlobalContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</GlobalContext.Provider>
	);
}

export function useGlobalContextProvider() {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("No provider detected");
	}

	return context;
}

import { getFromSecureStore, StorageKeys } from "@/utils/storage";
import {
	type Dispatch,
	type SetStateAction,
	createContext,
	type ReactNode,
	useState,
	useContext,
	useEffect,
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
	useEffect(() => {
		getFromSecureStore(StorageKeys.AUTH_TOKEN).then((token) => {
			if (token) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		});
	}, []);

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

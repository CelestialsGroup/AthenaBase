/* eslint-disable react-refresh/only-export-components */
import React from "react";

interface SessionProviderProps {
	children: React.ReactNode
}

interface Session {
	authUser: AuthUser
}

interface SessionProviderState {
	session: Session
	setSession: React.Dispatch<React.SetStateAction<Session>>
}

const initialState: SessionProviderState = {
	session: {
		authUser: {
			id: 0,
			name: "",
			email: "",
			avatar: "",
		}
	},
	setSession: () => null,
};

const SessionProviderContext = React.createContext<SessionProviderState>(initialState);

const SessionProvider: React.FC<SessionProviderProps> = ({ children, ...props }) => {
	const [session, setSession] = React.useState<Session>({
		authUser: {
			id: 0,
			name: "",
			email: "",
			avatar: "",
		}
	});
	return <SessionProviderContext.Provider {...props} value={{ session, setSession }}>
		{children}
	</SessionProviderContext.Provider>;
};

const useSession = () => {
	const context = React.useContext(SessionProviderContext);

	if (context === undefined)
		throw new Error("useSession must be used within a SessionProvider");

	return context;
};

export default {
	Provider: SessionProvider, useSession
};
import Common from "@component/common";
import api from "@internal/api";
import helper from "@internal/helper";
import Provider from "@internal/provider";
import React from "react";
import { Outlet, useNavigate } from "react-router";


const AuthLayout: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const { setSession } = Provider.useSession();
	const navigate = useNavigate();

	React.useEffect(() => {
		api.auth.user().then(resp => {
			setSession(session => ({ ...session, authUser: resp.data }));
		}).catch(() => {
			navigate(`/auth/login?${helper.MakeRedirectUri()}`);
		}).finally(() => {
			setLoading(false);
		});
	}, []);

	return <React.Fragment>
		{loading ? <Common.Loading /> : <Outlet />}
	</React.Fragment>;
};

const AuthLayoutWithProvider: React.FC = () => {
	return <React.Fragment>
		<Provider.Session>
			<AuthLayout />
		</Provider.Session>
	</React.Fragment>;
};

export default AuthLayoutWithProvider;
import api from "@internal/api";
import React from "react";
import { Outlet } from "react-router";

import Loading from "~/page/loading";

const AuthLayout: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		api.auth.user().then(resp => {
			console.log(resp);
			window.location.href = "/auth/login";
		}).finally(() => {
			setLoading(false);
		});
	}, []);

	return <React.Fragment>
		{loading ? <Loading /> : <Outlet />}
	</React.Fragment>;
};

export default AuthLayout;
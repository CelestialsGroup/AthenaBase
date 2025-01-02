import Provider from "@internal/provider";
import React from "react";


const Page: React.FC = () => {
	const { session } = Provider.useSession();

	return <React.Fragment>
		{session.authUser.name}
	</React.Fragment>;
};

export default Page;
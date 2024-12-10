import Provider from "@internal/provider";
import React from "react";

const Page: React.FC = () => {
	const { session } = Provider.useSession();
	return <div className="w-screen h-screen flex">
		{session.authUser.name}
	</div>;
};

export default Page;
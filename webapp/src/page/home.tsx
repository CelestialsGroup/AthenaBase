import internal from "@internal/index";
import React from "react";

const Page: React.FC = () => {
	return <div className="w-full h-full overflow-auto flex justify-center items-center rounded-lg bg-muted/50">
		Welcome to {internal.Name}
	</div>;
};

export default Page;
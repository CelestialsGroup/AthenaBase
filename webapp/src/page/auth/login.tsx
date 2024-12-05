import Auth from "@component/auth";
import internal from "@internal/index";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/component/ui/card";
import React from "react";

const Page: React.FC = () => {
	return <div className="w-screen h-screen flex justify-center items-center">
		<Card className="w-96">
			<CardHeader>
				<CardTitle className="text-2xl">{internal.Name} Login</CardTitle>
			</CardHeader>
			<CardContent>
				<Auth.Login.Form />
				<div className="mt-4 text-right text-sm">
					&copy; CelestialsGroup
				</div>
			</CardContent>
		</Card>
	</div>;
};

export default Page;
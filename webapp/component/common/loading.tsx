import { Loader2 } from "lucide-react";
import React from "react";

const Loading: React.FC = () => {
	return <div className="w-full h-full flex justify-center items-center">
		<div className="flex items-center space-x-2">
			<Loader2 className="animate-spin" />
			<p>loading...</p>
		</div>
	</div>;
};

export default Loading;
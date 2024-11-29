import internal from "@internal/index";
import { useLocation } from "react-router";

const Page: React.FC = () => {
	const location = useLocation();

	return <div className="w-screen h-screen flex flex-col justify-center items-center">
		<div>{internal.getMode()}</div>
		<div>404:{location.pathname}{location.search}</div>
	</div>;
};

export default Page;
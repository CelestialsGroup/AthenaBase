import { useLocation } from "react-router";

const Page: React.FC = () => {

	const location = useLocation();
	return <div className="w-screen h-screen flex justify-center items-center">
		404:{location.pathname}{location.search}
	</div>;
};

export default Page;
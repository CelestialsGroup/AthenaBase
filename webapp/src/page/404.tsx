import notice from "@component/notice";
import internal from "@internal/index";
import { Button } from "@shadcn/component/ui/button";
import { useLocation } from "react-router";

const Page: React.FC = () => {
	const location = useLocation();

	return <div className="w-screen h-screen flex flex-col justify-center items-center">
		<div>{internal.Mode}</div>
		<div>404:{location.pathname}{location.search}</div>
		<Button onClick={() => {
			notice.toast("notice toast");
		}}>notice toast</Button>
	</div>;
};

export default Page;
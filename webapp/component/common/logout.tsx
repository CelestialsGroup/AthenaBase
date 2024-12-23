import notice from "@component/notice";
import api from "@internal/api";
import logger from "@internal/helper/logger";
import { Button } from "@shadcn/component/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

const Logout: React.FC = () => {
	return <div>
		<Button variant="ghost" size="icon" onClick={() => {
			api.auth.logout().then((resp) => {
				logger.debug(resp);
				window.location.reload();
			}).catch((reason) => {
				notice.toast.error(`${reason}`);
			});
		}}>
			<LogOut />
		</Button>
	</div>;
};

export default Logout;
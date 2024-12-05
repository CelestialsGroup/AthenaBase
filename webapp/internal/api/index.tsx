import auth from "@internal/api/auth";
import request from "@internal/api/request";

const root = {
	properties: request.api<Properties>("/properties").get,
	auth: auth
};

export default {
	...root
};
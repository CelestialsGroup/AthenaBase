import request from "@internal/api/request";

const root = {
	properties: request.api("/properties").get()
};

export default {
	...root
};
import auth from "@internal/api/auth";
import database from "@internal/api/database";
import request from "@internal/api/request";

const root = {
	properties: request.api<Properties>("/properties").get,
	auth: auth, database: database
};

export default {
	...root
};
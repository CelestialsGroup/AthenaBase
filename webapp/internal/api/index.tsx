import auth from "@internal/api/auth";
import database from "@internal/api/database";
import request from "@internal/api/request";

const root = {
	properties: request.api<Properties>("/properties").get,
	auth: auth, database: database,
	query: (database: number, stmt: string) => {
		return request.api<QueryResult>("/query").post({
			body: JSON.stringify({ database, stmt })
		});
	},
};

export default {
	...root
};
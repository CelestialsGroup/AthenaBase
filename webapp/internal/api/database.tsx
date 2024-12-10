import request from "@internal/api/request";

const database = {
	list: request.api<DataBase[]>("/database").get,
	create: (database: DataBase) => {
		return request.api<DataBase>("/database").post({
			body: JSON.stringify({ ...database })
		});
	}
};

export default database;
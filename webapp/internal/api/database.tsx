import request from "@internal/api/request";

const database = {
	list: request.api<DataBase[]>("/database").get,
	create: (database: DataBase) => {
		return request.api<DataBase>("/database").post({
			body: JSON.stringify({ ...database })
		});
	},
	table: (id: number) => {
		return request.api<DataBaseTable[]>(`/database/${id}/table`).get();
	}
};

export default database;
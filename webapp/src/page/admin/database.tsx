import Database from "@component/database";
import api from "@internal/api";
import { Button } from "@shadcn/component/ui/button";
import React from "react";

const Page: React.FC = () => {
	const [dbs, setDbs] = React.useState<DataBase[]>([]);

	React.useEffect(() => {
		api.database.list().then(resp => {
			setDbs(resp.data || []);
		});
	}, []);

	return <div className="w-full h-full flex flex-col p-2 space-y-4">
		<div className="flex justify-between items-center">
			<div>
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					DataBase List: {dbs.length}
				</h4>
			</div>
			<div>
				<Database.Dialog
					trigger={<Button>Create Database</Button>}
					title="Create DataBase"
					desc="create a database config."
				/>
			</div>
		</div>
		<div className="flex-1 w-full">
			{dbs.map((db, index) => <div key={index} className="flex justify-between items-center">
				<div>{db.name}</div>
				<div className="flex space-x-1">
					<Database.Dialog
						trigger={<Button>Edit</Button>}
						database={db}
						title={`Edit ${db.name}`}
						desc={`edit ${db.name} config.`}
					/>
					<Button variant="destructive">Delete</Button>
				</div>
			</div>)}
		</div>
	</div>;
};

export default Page;
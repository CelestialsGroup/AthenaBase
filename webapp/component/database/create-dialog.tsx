import CreateForm from "@component/database/create-form";
import { Button } from "@shadcn/component/ui/button";
import {
	Dialog, DialogContent, DialogDescription, DialogFooter,
	DialogHeader, DialogTitle, DialogTrigger
} from "@shadcn/component/ui/dialog";
import React from "react";


const CreateDialog: React.FC = () => {
	return <Dialog>
		<DialogTrigger asChild>
			<Button>Create DataBase</Button>
		</DialogTrigger>
		<DialogContent className="">
			<DialogHeader>
				<DialogTitle>Create DataBase</DialogTitle>
				<DialogDescription>
					Create a database config.
				</DialogDescription>
			</DialogHeader>
			<div>
				<CreateForm />
			</div>
			<DialogFooter></DialogFooter>
		</DialogContent>
	</Dialog>;
};

export default CreateDialog;
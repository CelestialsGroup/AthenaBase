import CreateForm from "@component/database/form";
import {
	AlertDialog, AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@shadcn/component/ui/alert-dialog";
import React from "react";

interface DataBaseAlertDialogProps {
	trigger: React.ReactNode
	title?: string
	desc?: string
	database?: DataBase
	onSuccess?: (database: DataBase) => void
	onCancel?: () => void
}

const DataBaseAlertDialog: React.FC<DataBaseAlertDialogProps> = (props) => {
	const [open, setOpen] = React.useState<boolean>(false);

	return <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
		<AlertDialogTrigger asChild>{props.trigger}</AlertDialogTrigger>
		<AlertDialogContent className="">
			<AlertDialogHeader>
				<AlertDialogTitle>{props.title}</AlertDialogTitle>
				<AlertDialogDescription>{props.desc}</AlertDialogDescription>
			</AlertDialogHeader>
			<div>
				<CreateForm
					{...props}
					onSuccess={(database) => { props.onSuccess?.(database); setOpen(false); }}
					onCancel={() => { props.onCancel?.(); setOpen(false); }}
				/>
			</div>
			<AlertDialogFooter></AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>;
};

export default DataBaseAlertDialog;
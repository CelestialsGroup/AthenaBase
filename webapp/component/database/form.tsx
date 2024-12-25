import notice from "@component/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@internal/api";
import logger from "@internal/helper/logger";
import { Button } from "@shadcn/component/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shadcn/component/ui/form";
import { Input } from "@shadcn/component/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/component/ui/select";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const DataBaseFormSchema = z.object({
	engine: z.string(),
	name: z.string().min(1, { message: "entry a name" }),
	host: z.string().min(1, { message: "entry a host" }),
	port: z.string().regex(/^\d+$/, "entry a port"),
	db: z.string().min(1, { message: "entry a database.name" }),
	username: z.string().min(1, { message: "entry your database username" }),
	password: z.string().min(1, { message: "entry your database password" }),
	config: z.string().optional(),
});


interface DataBaseFormProps {
	database?: DataBase
	onSuccess?: (database: DataBase) => void
	onCancel?: () => void
}

const DataBaseForm: React.FC<DataBaseFormProps> = (props) => {
	const [loading, setLoading] = React.useState<boolean>(false);

	const form = useForm<z.infer<typeof DataBaseFormSchema>>({
		resolver: zodResolver(DataBaseFormSchema),
		defaultValues: {
			engine: props.database?.engine || "postgres",
			name: props.database?.name || "",
			host: props.database?.host || "",
			port: props.database?.port.toString() || "0",
			db: props.database?.db || "",
			username: props.database?.username || "",
			password: props.database?.password || ""
		},
	});

	const onSubmit = (formData: z.infer<typeof DataBaseFormSchema>) => {
		setLoading(true);
		if (props.database?.id) {
			logger.debug(`update ${props.database.id} database.`);
		} else {
			logger.debug("create database.");
			api.database.create({ ...formData, port: Number(formData.port) } as DataBase).then((resp) => {
				props.onSuccess?.(resp.data);
			}).catch((reason) => {
				notice.toast.error(`${reason}`);
			}).finally(() => {
				setLoading(false);
			});
		}

	};

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
			<div className="flex space-x-2">
				<FormField
					name="engine" control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Engine</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a database engine" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="postgres">PostgreSQL</SelectItem>
									<SelectItem value="mysql">MySQL</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="name" control={form.control}
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Entry a name." {...field} disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className="flex space-x-2">
				<FormField
					name="host" control={form.control}
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input placeholder="Entry a host." {...field} disabled={loading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="port" control={form.control}
					render={({ field }) => (
						<FormItem className="w-24">
							<FormLabel>&nbsp;</FormLabel>
							<FormControl>
								<Input placeholder="Entry a port." {...field} disabled={loading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				name="username" control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>UserName</FormLabel>
						<FormControl>
							<Input placeholder="Entry your database username." {...field} disabled={loading}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="password" control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>PassWrod</FormLabel>
						<FormControl>
							<Input
								type="password" placeholder="Entry your database password."
								autoComplete="password" {...field} disabled={loading}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="flex space-x-2">
				<FormField
					name="db" control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>DB</FormLabel>
							<FormControl>
								<Input placeholder="Entry a database.name." {...field} disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="config" control={form.control}
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Config</FormLabel>
							<FormControl>
								<Input placeholder="Entry your database config." {...field} disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className="flex justify-end space-x-2 !mt-6">
				<Button variant="secondary" onClick={(e) => {
					e.preventDefault(); props.onCancel?.();
				}} disabled={loading}>Cancel</Button>
				<Button type="submit" disabled={loading}>
					{loading && <Loader2 className="animate-spin" />}Submit
				</Button>
			</div>
		</form>
	</Form>;
};

export default DataBaseForm;
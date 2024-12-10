import notice from "@component/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@internal/api";
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


const CreateFormSchema = z.object({
	engine: z.string(),
	name: z.string().min(1, { message: "entry a name" }),
	host: z.string().min(1, { message: "entry a host" }),
	port: z.string().transform((val) => Number(val)),
	db: z.string().min(1, { message: "entry a database.name" }),
	username: z.string().min(1, { message: "entry your database username" }),
	password: z.string().min(1, { message: "entry your database password" }),
	config: z.string(),
});

const CreateForm: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(false);

	const form = useForm<z.infer<typeof CreateFormSchema>>({
		resolver: zodResolver(CreateFormSchema),
		defaultValues: { engine: "postgres", name: "", host: "", port: 0, db: "", username: "", password: "" },
	});

	const onSubmit = (formData: z.infer<typeof CreateFormSchema>) => {
		setLoading(true);
		api.database.create(formData as DataBase).then((resp) => {
			console.log(resp);
		}).catch((reason) => {
			notice.toast.error(`${reason}`);
		}).finally(() => {
			setLoading(false);
		});
	};

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input placeholder="Entry a name." {...field} disabled={loading}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="host" control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Host</FormLabel>
						<FormControl>
							<Input placeholder="Entry a host." {...field} disabled={loading}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="port" control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Port</FormLabel>
						<FormControl>
							<Input type="number" placeholder="Entry a port." {...field} disabled={loading}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
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
			<FormField
				name="config" control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Config</FormLabel>
						<FormControl>
							<Input placeholder="Entry your database config." {...field} disabled={loading}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button type="submit" className="w-full" disabled={loading}>
				{loading && <Loader2 className="animate-spin" />}Login
			</Button>
		</form>
	</Form>;
};

export default CreateForm;
/* eslint-disable react-refresh/only-export-components */
import notice from "@component/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@internal/api";
import logger from "@internal/helper/logger";
import { Button } from "@shadcn/component/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shadcn/component/ui/form";
import { Input } from "@shadcn/component/ui/input";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const LoginForm: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(false);

	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: { email: "", password: "" },
	});

	function onSubmit(formData: z.infer<typeof LoginFormSchema>) {
		// notice.toast("You submitted the following values:", {
		// 	description: <pre className="mt-2 w-[340px] rounded-md border p-4">
		// 		<code>{JSON.stringify(data, null, 2)}</code>
		// 	</pre>
		// });

		setLoading(true);

		api.auth.login(formData.email, formData.password).then((resp) => {
			logger.debug(resp);
		}).catch((reason) => {
			console.log(reason);
			notice.toast.error(`${reason}`);
		}).finally(() => {
			setLoading(false);
		});

	}

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
			<FormField
				name="email" control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input
								placeholder="Entry your email." autoComplete="email"
								{...field} disabled={loading}
							/>
						</FormControl>
						<FormDescription> This is your account email.</FormDescription>
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
								type="password" placeholder="Entry your password."
								autoComplete="password" {...field} disabled={loading}
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

export default { Form: LoginForm };
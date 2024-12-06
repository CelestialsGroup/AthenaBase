/* eslint-disable react-refresh/only-export-components */
import notice from "@component/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@internal/api";
import helper from "@internal/helper";
import Provider from "@internal/provider";
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
import { useNavigate } from "react-router";
import { z } from "zod";


const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const LoginForm: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const { setSession } = Provider.useSession();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = (formData: z.infer<typeof LoginFormSchema>) => {
		setLoading(true);
		api.auth.login(formData.email, formData.password).then((resp) => {
			setSession(session => ({ ...session, authUser: resp.data }));
			const redirectUri = helper.ParseRedirectUri();
			navigate(redirectUri);
		}).catch((reason) => {
			notice.toast.error(`${reason}`);
		}).finally(() => {
			setLoading(false);
		});
	};

	React.useEffect(() => {
		api.auth.user().then(resp => {
			setSession(session => ({ ...session, authUser: resp.data }));
			const redirectUri = helper.ParseRedirectUri();
			navigate(redirectUri);
		}).finally(() => {
			setLoading(false);
		});
	}, []);

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
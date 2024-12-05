import request from "@internal/api/request";

const auth = {
	user: request.api<AuthUser>("/auth/user").get,
	login: (email: string, password: string) => {
		return request.api<AuthUser>("/auth/login").post({
			body: JSON.stringify({ email, password })
		});
	}
};

export default auth;
import logger from "@internal/helper/logger";

enum Method {
	GET = "GET",
	POST = "POST",
	DELETE = "DELETE",
	PUT = "PUT"
}

class Request {
	private prefix: string = "/api";

	private fetch(path: string, method: Method, init?: ReqArgs) {
		const requestUrl = new URL(`http://localhost${this.prefix}${path}`);
		if (init && init.query != undefined) {
			Object.keys(init.query).forEach(key => {
				return requestUrl.searchParams.append(key, `${(init.query || {})[key]}`);
			});
		}
		logger.info(requestUrl);
		return fetch(
			requestUrl.toString().replace("http://localhost", ""),
			{
				...init,
				method: method,
				headers: {
					...init?.headers,
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		);
	}

	/**
	 * api
	 */
	public api(path: string) {
		const method = {
			get: (init?: ReqArgs): Promise<Response> => {
				return this.fetch(path, Method.GET, init);
			},
			post: (init?: ReqArgs): Promise<Response> => {
				return this.fetch(path, Method.POST, init);
			},
			delete: (init?: ReqArgs): Promise<Response> => {
				return this.fetch(path, Method.DELETE, init);
			},
			put: (init?: ReqArgs): Promise<Response> => {
				return this.fetch(path, Method.PUT, init);
			}
		};
		return method;
	}
}

const request = new Request();

export default request;
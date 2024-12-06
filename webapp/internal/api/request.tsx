import logger from "@internal/helper/logger";

enum Method {
	GET = "GET",
	POST = "POST",
	DELETE = "DELETE",
	PUT = "PUT"
}

class Request {
	private prefix: string = "/api";

	private fetch<T>(path: string, method: Method, init?: ReqArgs): Promise<RespData<T>> {
		const requestUrl = new URL(`http://localhost${this.prefix}${path}`);
		if (init && init.query != undefined) {
			Object.keys(init.query).forEach(key => {
				return requestUrl.searchParams.append(key, `${(init.query || {})[key]}`);
			});
		}
		return new Promise<RespData<T>>((resolve, reject) => fetch(
			requestUrl.toString().replace("http://localhost", ""),
			{
				cache: "no-store",
				...init,
				method: method,
				headers: {
					...init?.headers,
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		).then((resp) => resp.json()).then((resp: RespData<T>) => {
			if (resp.success) return resolve(resp);
			logger.debug(`[${resp.status_code}] ${resp.status_message}`);
			reject(`[${resp.status_code}] ${resp.status_message}`);
		}).catch((reason) => {
			logger.debug(`Request.fetch error: ${reason}`);
			reject(reason);
		}));
	}

	/**
	 * api
	 */
	public api<T>(path: string) {
		const method = {
			get: (init?: ReqArgs) => {
				return this.fetch<T>(path, Method.GET, init);
			},
			post: (init?: ReqArgs) => {
				return this.fetch<T>(path, Method.POST, init);
			},
			delete: (init?: ReqArgs) => {
				return this.fetch<T>(path, Method.DELETE, init);
			},
			put: (init?: ReqArgs) => {
				return this.fetch<T>(path, Method.PUT, init);
			}
		};
		return method;
	}
}

const request = new Request();

export default request;
const defaultRedirectUri = "/";

class Helper {
	/**
	 * MakeRedirectUri
	 */
	public MakeRedirectUri() {
		const redirectUri = this.ParseRedirectUri();
		if (redirectUri != defaultRedirectUri) return `redirect_uri=${encodeURIComponent(redirectUri)}`;
		const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
		return `redirect_uri=${encodeURIComponent(current.startsWith("/auth/login") ? defaultRedirectUri : current)}`;
	}

	/**
	 * Parse
	 */
	public ParseRedirectUri() {
		const url = new URL(window.location.href);
		const redirect_uri = url.searchParams.get("redirect_uri") ? url.searchParams.get("redirect_uri") : defaultRedirectUri;
		return redirect_uri || defaultRedirectUri;
	}
}

const helper = new Helper();

export default helper;
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		url.hostname = env.REWRITE_HOSTNAME;
		return await fetch(url.toString(), request);
	},
} satisfies ExportedHandler<Env>;

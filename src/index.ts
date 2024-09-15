const robots = `
User-agent: *
Disallow: /
`

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname.endsWith('robots.txt')) {
			return new Response(robots);
		}
		url.hostname = env.REWRITE_HOSTNAME;
		return await fetch(url.toString(), request);
	},
} satisfies ExportedHandler<Env>;

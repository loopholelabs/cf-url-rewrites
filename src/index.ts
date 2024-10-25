const robots = `
User-agent: *
Disallow: /
`

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		if (env.HANDLE_ROBOTS && url.pathname.endsWith('robots.txt')) {
			return new Response(robots);
		}
		if (env.REWRITE_HOSTNAME !== '') {
			url.hostname = env.REWRITE_HOSTNAME;
		}
		if(env.APPEND_PATH !== '') {
			url.pathname = `${env.APPEND_PATH}/${url.pathname}`;
		}
		return await fetch(url.toString(), request);
	},
} satisfies ExportedHandler<Env>;

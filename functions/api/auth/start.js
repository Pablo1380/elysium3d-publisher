export async function onRequestGet({ request, env }) {
  const state = crypto.randomUUID();
  const redirect = new URL('/api/auth/callback', request.url).toString();
  const params = new URLSearchParams({ response_type: 'code', client_id: env.PINTEREST_APP_ID, redirect_uri: redirect, scope: 'boards:read,boards:write,pins:read,pins:write,user_accounts:read', state });
  return new Response(null, { status: 302, headers: { Location: 'https://www.pinterest.com/oauth/?' + params.toString(), 'Set-Cookie': 'oauth_state=' + state + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600' } });
}

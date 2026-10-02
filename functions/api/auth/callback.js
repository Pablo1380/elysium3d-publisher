export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) return new Response('Falta el código OAuth', { status: 400 });
  const body = new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: new URL('/api/auth/callback', request.url).toString() });
  const auth = btoa(env.PINTEREST_APP_ID + ':' + env.PINTEREST_APP_SECRET);
  const response = await fetch('https://api.pinterest.com/v5/oauth/token', { method: 'POST', headers: { Authorization: 'Basic ' + auth, 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  if (!response.ok) return new Response('No se pudo conectar con Pinterest', { status: 502 });
  const data = await response.json();
  return new Response('<h1>Pinterest conectado</h1>', { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Set-Cookie': 'pinterest_access_token=' + data.access_token + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000' } });
}

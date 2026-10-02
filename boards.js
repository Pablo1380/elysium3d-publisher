export async function onRequestGet({ request }) {
  const token = request.headers.get('Cookie')?.match(/pinterest_access_token=([^;]+)/)?.[1];
  if (!token) return Response.json({ error:'not_connected' }, { status:401 });
  const response = await fetch('https://api.pinterest.com/v5/boards?page_size=100', { headers:{ Authorization:`Bearer ${token}` } });
  return new Response(await response.text(), { status:response.status, headers:{'Content-Type':'application/json'} });
}

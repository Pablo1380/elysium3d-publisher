export async function onRequestPost({ request }) {
  const token = request.headers.get('Cookie')?.match(/pinterest_access_token=([^;]+)/)?.[1];
  if (!token) return Response.json({ error:'not_connected' }, { status:401 });
  const input = await request.json();
  if (!input.name) return Response.json({ error:'name_required' }, { status:400 });
  const response = await fetch('https://api.pinterest.com/v5/boards', { method:'POST', headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'application/json' }, body:JSON.stringify({ name:input.name, description:input.description||'' }) });
  return new Response(await response.text(), { status:response.status, headers:{'Content-Type':'application/json'} });
}

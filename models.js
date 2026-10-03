const USERNAME = 'Elysium3d';
export async function onRequestGet({ env }) {
  if (!env.CULTS_API_KEY) return Response.json({ error: 'cults_not_configured' }, { status: 503 });
  const query = `query { creations(limit: 100) { name url description tags creator { nick } illustrations { url } } }`;
  const auth = btoa(`${USERNAME}:${env.CULTS_API_KEY}`);
  const response = await fetch('https://cults3d.com/graphql', { method:'POST', headers:{Authorization:`Basic ${auth}`,'Content-Type':'application/json'}, body:JSON.stringify({query}) });
  return new Response(await response.text(), { status:response.status, headers:{'Content-Type':'application/json'} });
}

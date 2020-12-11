export async function doQuery(query) {
  console.log('Delam call na API', query);
  const fetched = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{ ${query} }` }),
  });
  const response = await fetched.json();
  return {
    data: response.data,
    errors: response.errors,
  };
}

export async function doMutation(mutation) {
  const fetched = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `mutation { ${mutation} }` }),
  });
  const response = await fetched.json();
  return {
    data: response.data,
    errors: response.errors,
  };
}

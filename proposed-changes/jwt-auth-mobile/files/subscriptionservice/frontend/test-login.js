// Use global fetch (Node 18+) to avoid extra deps
(async () => {
  try {
    const res = await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'test' }),
    });

    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Token:', data.token?.slice(0, 40) + '...');
  } catch (err) {
    console.error('Error:', err.message || err);
  }
})();

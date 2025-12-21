// create login API function for mobile that posts email and password and returns JWT token
import { Platform } from 'react-native';

const HOST = Platform.OS === 'android' ? 'http://10.0.2.2:8081' : 'http://localhost:8081';

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${HOST}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Login failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return data.token;
}

// Example protected call using fetchWithAuth
import { fetchWithAuth } from './apiClient';

export async function getMe(): Promise<{ email: string }> {
  const res = await fetchWithAuth('/auth/me');
  return await res.json();
}

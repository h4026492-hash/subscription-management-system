// Token-aware fetch wrapper for mobile
import { getToken } from './token';
import { Platform } from 'react-native';

const HOST = Platform.OS === 'android' ? 'http://10.0.2.2:8081' : 'http://localhost:8081';

export async function fetchWithAuth(path: string, opts: RequestInit = {}) {
  const token = await getToken();
  const headers = { ...(opts.headers || {}), 'Content-Type': 'application/json' } as Record<string,string>;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${HOST}${path}`, { ...opts, headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Request failed: ${res.status} ${body}`);
  }
  return res;
}

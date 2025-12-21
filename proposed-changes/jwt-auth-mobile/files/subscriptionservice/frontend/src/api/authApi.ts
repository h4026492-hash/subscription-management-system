// create login API function that posts email and password and returns JWT token
import apiClient from './apiClient';

export async function login(email: string, password: string): Promise<string> {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data.token;
}

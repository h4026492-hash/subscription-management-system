// Utility to persist auth token on mobile using AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = 'auth_token';

export async function setToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    console.warn('Failed to set token', err);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.warn('Failed to get token', err);
    return null;
  }
}

export async function clearToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.warn('Failed to clear token', err);
  }
}

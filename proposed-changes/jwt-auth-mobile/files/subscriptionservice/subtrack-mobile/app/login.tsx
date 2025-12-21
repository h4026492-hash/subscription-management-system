// create a glassmorphism login screen with email, password, and login button that calls login API
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { login } from '../api/authApi';
import { setToken } from '../api/token';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await login(email, password);
      await setToken(token);
      Alert.alert('Success', 'Logged in successfully');
    } catch (err) {
      console.error('Login error', err);
      Alert.alert('Login failed', (err as Error).message || 'Check your credentials');
    } finally {
      setLoading(false);
    }
  };

  const supportsBlur = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <View style={styles.container}>
      {/* Use native blur where available (Expo: expo-blur). Fallback to translucent View on unsupported platforms */}
      {supportsBlur ? (
        <BlurView intensity={90} style={styles.card} tint="light">
          <Text style={styles.title}>Welcome back</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>
        </BlurView>
      ) : (
        <View style={[styles.card, styles.cardFallback]}>
          <Text style={styles.title}>Welcome back</Text>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    padding: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  cardFallback: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  button: {
    height: 44,
    borderRadius: 8,
    backgroundColor: '#2f6cff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

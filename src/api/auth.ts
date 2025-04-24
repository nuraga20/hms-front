// CHECK POINT 2

// auth.ts
import { User } from '../types/hms';
import { usersData } from '../data/sampleData';

export async function login(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find a matching user in the sample data.
  const user = usersData.find(
    (u) => u.email === email && u.password_hash === password,
  );
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const authToken = generateAuthToken();

  // Optionally, you can persist auth info here (or do it in AuthProvider).
  return [200, { authToken, user }] as const;
}

export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Try to retrieve the auth data from sessionStorage.
  const stored = sessionStorage.getItem('auth');
  if (stored) {
    const parsed = JSON.parse(stored) as { authToken: string; user: User };
    return [200, { authToken: parsed.authToken, user: parsed.user }] as const;
  } else {
    throw new Error('No user logged in');
  }
}

function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}

# Firebase Authentication Components

This directory contains client-side Firebase authentication components for the TalkServe website.

## Components

### AuthProvider
Wrap your app with `AuthProvider` to enable authentication throughout your application.

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### useAuth Hook
Access authentication state and methods from any component:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, signIn, signUp, signInWithGoogle, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return user ? <div>Welcome {user.email}</div> : <div>Please log in</div>;
}
```

### AuthModal
A modal component for login and signup:

```tsx
import AuthModal from '@/components/auth/AuthModal';

function Header() {
  const [showAuth, setShowAuth] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowAuth(true)}>Login</button>
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)}
        defaultMode="login" // or "signup"
      />
    </>
  );
}
```

### UserProfile
Display logged-in user info with logout option:

```tsx
import UserProfile from '@/components/auth/UserProfile';

function Header() {
  return (
    <nav>
      <UserProfile />
    </nav>
  );
}
```

## Authentication Methods

### Email/Password Login
```tsx
const { signIn } = useAuth();
await signIn('user@example.com', 'password123');
```

### Email/Password Signup
```tsx
const { signUp } = useAuth();
await signUp('user@example.com', 'password123', 'John Doe');
```

### Google Sign-In
```tsx
const { signInWithGoogle } = useAuth();
await signInWithGoogle();
```

### Logout
```tsx
const { logout } = useAuth();
await logout();
```

### Password Reset
```tsx
const { resetPassword } = useAuth();
await resetPassword('user@example.com');
```

## Firebase Configuration

The Firebase configuration uses environment variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

These are configured in Replit Secrets and automatically loaded.

## Setup Requirements

1. Enable Authentication in Firebase Console
2. Enable Google Sign-In method
3. Add your Replit domain to Firebase Authorized Domains
4. Provide Firebase credentials as secrets in Replit

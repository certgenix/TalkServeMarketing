# Integration Example: Adding Auth to Header

Here's how to integrate the authentication components into your existing Header:

## Step 1: Wrap your app with AuthProvider

Edit `app/layout.tsx`:

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Step 2: Update Header Component

Edit `components/Header.tsx` to include Login/Register buttons and UserProfile:

```tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import UserProfile from '@/components/auth/UserProfile';

export default function Header() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo and navigation links */}
          
          {/* Auth section */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
            ) : user ? (
              <UserProfile />
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={openSignup}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
}
```

## Step 3: Protect Routes (Optional)

Create a protected route wrapper for authenticated-only pages:

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}
```

Use in a protected page:

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard content</div>
    </ProtectedRoute>
  );
}
```

## That's it!

Your TalkServe website now has full authentication capabilities with email/password and Google login.

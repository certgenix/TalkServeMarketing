'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      setShowMenu(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
          {user.displayName ? user.displayName[0].toUpperCase() : user.email?.[0].toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.displayName || user.email}
        </span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setShowMenu(false)}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

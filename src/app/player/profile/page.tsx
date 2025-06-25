'use client';

import Header from "../../../components/Header";
import { useState } from 'react';
import Image from 'next/image';

const mockUser = {
  name: 'Romeo Sonico',
  avatar: 'https://i.pravatar.cc/150?img=13',
  password: 'golfchamp123', // placeholder; in real apps, never store raw passwords
};

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(mockUser.avatar);
  const [password, setPassword] = useState('••••••••••');
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handlePasswordSave = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setPassword('••••••••••'); // Simulated masked password
      setEditingPassword(false);
      alert('Password updated!');
    } else {
      alert('Passwords do not match or too short.');
    }
  };

  return (
    <>
    <Header transparent />
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br text-black bg-gray-400">
      <div className="w-full max-w-md rounded-xl bg-white/60 backdrop-blur p-6 shadow-lg space-y-6 mt-12">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={avatar}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <label className="text-sm font-medium cursor-pointer text-green-800">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            value={mockUser.name}
            disabled
            className="w-full p-2 rounded border border-gray-300 bg-gray-100 cursor-not-allowed mt-1"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          {!editingPassword ? (
            <div className="flex items-center justify-between mt-1">
              <input
                type="password"
                value={password}
                disabled
                className="w-full p-2 rounded border border-gray-300 bg-gray-100 cursor-not-allowed"
              />
              <button
                className="ml-2 text-sm text-blue-600 underline"
                onClick={() => setEditingPassword(true)}
              >
                Edit
              </button>
            </div>
          ) : (
            <>
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 rounded border border-gray-300 mt-1"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 rounded border border-gray-300 mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setEditingPassword(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSave}
                  className="px-4 py-2 bg-green-700 text-white text-sm rounded"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}


import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface ProfileProps {
  user: User | null;
}

const Profile = ({ user }: ProfileProps) => {
  const navigate = useNavigate();

  // Show loading while user is being fetched in App.tsx
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.map(part => part.charAt(0)).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Welcome, {user.name}</span>
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-700">
              {getInitials(user.name)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                User ID
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-900">
                {user.id}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Name
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-900">
                {user.name}
              </div>
            </div>

            {/* Email ID */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email ID
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-900">
                {user.email}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Address
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-900">
                {user.address.street}, {user.address.suite}, {user.address.city},{' '}
                {user.address.zipcode}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Phone
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-900">
                {user.phone}
              </div>
            </div>

            {/* Website */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Website
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-900">
                {user.website}
              </div>
            </div> */}

            {/* Company */}
            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Company
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-900">
                <div className="font-semibold">{user.company.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {user.company.catchPhrase}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
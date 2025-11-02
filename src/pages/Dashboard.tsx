import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Shield, ShoppingCart, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = !!user?.roles?.role_name && user.roles.role_name.toLowerCase() === 'admin';
  const stats = [
    {
      name: 'Total Roles',
      value: '0',
      icon: Shield,
      color: 'bg-blue-500',
      href: '/dashboard/roles',
    },
    {
      name: 'Rental Items',
      value: '0',
      icon: Package,
      color: 'bg-green-500',
      href: '/dashboard/rental-items',
    },
    {
      name: 'Orders',
      value: '0',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      href: '/dashboard/orders',
    },
    {
      name: 'Users',
      value: '0',
      icon: Users,
      color: 'bg-orange-500',
      href: '#',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to HARS Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          // Hide the Roles card if not admin
          if (stat.href === '/dashboard/roles' && !isAdmin) return null;
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.href}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {isAdmin && (
              <Link
                to="/dashboard/roles"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-medium text-primary-900">Manage Roles</h3>
                <p className="text-sm text-primary-700">View and manage user roles</p>
              </Link>
            )}
            <Link
              to="/dashboard/rental-items"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-medium text-green-900">Manage Rental Items</h3>
              <p className="text-sm text-green-700">Add and manage rental inventory</p>
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500 text-sm">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


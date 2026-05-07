import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar';
import AdminDashboard from '../components/admin/AdminDashboard';
import OwnerDashboard from '../components/storeOwner/OwnerDashboard';
import UserDashboard from '../components/user/UserDashboard';
import { Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const renderDashboard = () => {
    switch(user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'store_owner':
        return <OwnerDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default DashboardPage;
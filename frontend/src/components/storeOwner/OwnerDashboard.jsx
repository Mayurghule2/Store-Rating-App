import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Star, Users, TrendingUp } from 'lucide-react';

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard/owner');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="text-center py-8">No store found for this owner</div>;
  }

  return (
    <div className="space-y-6">
      {/* Store Info Card */}
      <div className="card p-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{dashboardData.store.name}</h2>
            <p className="text-gray-600 mt-1">Your Store Dashboard</p>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-10 w-10 fill-current" />
              <span className="text-3xl font-bold text-gray-800">
                {dashboardData.store.averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Ratings Received</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{dashboardData.ratings.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Star className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users Rated</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{dashboardData.ratings.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Ratings List */}
      <div className="card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">User Ratings</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {dashboardData.ratings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No ratings yet</div>
          ) : (
            dashboardData.ratings.map((rating) => (
              <div key={rating.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{rating.user.name}</p>
                    <p className="text-sm text-gray-500">{rating.user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-semibold text-gray-800">{rating.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
import React from 'react';
import { Award, ThumbsUp, TrendingUp } from 'lucide-react';

const UserDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary-100 rounded-full">
            <Award className="h-12 w-12 text-primary-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to StoreRating!
        </h1>
        <p className="text-gray-600">
          Discover and rate your favorite stores in your area.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-3">
            <div className="p-2 bg-primary-100 rounded-full">
              <ThumbsUp className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Rate Stores</h3>
          <p className="text-sm text-gray-600">Share your experience by rating stores from 1 to 5 stars</p>
        </div>

        <div className="card p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-3">
            <div className="p-2 bg-primary-100 rounded-full">
              <TrendingUp className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Discover Best Stores</h3>
          <p className="text-sm text-gray-600">Find top-rated stores based on community reviews</p>
        </div>

        <div className="card p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-3">
            <div className="p-2 bg-primary-100 rounded-full">
              <ThumbsUp className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Update Ratings</h3>
          <p className="text-sm text-gray-600">Change your ratings anytime as your experience evolves</p>
        </div>
      </div>

      <div className="card p-8 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Ready to rate stores?</h2>
          <p className="text-gray-600 mb-4">Visit our stores page to start rating your favorite stores</p>
          <a href="/stores" className="btn-primary inline-block">
            Browse Stores
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
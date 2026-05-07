import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import api from '../services/api';
import { Search, Star, MapPin, Mail, TrendingUp } from 'lucide-react';
import RatingModal from '../components/user/RatingModal';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [selectedStore, setSelectedStore] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await api.get('/stores');
      setStores(response.data.data);
      setFilteredStores(response.data.data);
      await fetchUserRatings(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRatings = async (storesList) => {
    const ratingsMap = {};
    for (const store of storesList) {
      try {
        const response = await api.get(`/ratings/store/${store.id}`);
        if (response.data.data) {
          ratingsMap[store.id] = response.data.data.rating;
        }
      } catch (error) {
        console.error(`Failed to fetch rating for store ${store.id}`);
      }
    }
    setUserRatings(ratingsMap);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = stores.filter(store => {
      if (searchType === 'name') {
        return store.name.toLowerCase().includes(term);
      } else {
        return store.address?.toLowerCase().includes(term);
      }
    });
    setFilteredStores(filtered);
  };

  const handleRatingSuccess = (storeId, newRating) => {
    setUserRatings(prev => ({ ...prev, [storeId]: newRating }));
    fetchStores(); // Refresh store ratings
  };

  const StarRating = ({ rating, size = 'sm' }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} ${
              i < fullStars ? 'text-yellow-400 fill-current' : 
              i === fullStars && hasHalfStar ? 'text-yellow-400 fill-current opacity-50' : 
              'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">Loading stores...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">All Stores</h1>
          
          {/* Search Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search stores by ${searchType}...`}
                value={searchTerm}
                onChange={handleSearch}
                className="input-field pl-10"
              />
            </div>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="input-field sm:w-48"
            >
              <option value="name">Search by Name</option>
              <option value="address">Search by Address</option>
            </select>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div key={store.id} className="card hover:shadow-xl transition-all duration-300 animate-slide-up overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{store.name}</h3>
                  <div className="flex items-center space-x-1">
                    <StarRating rating={parseFloat(store.overall_rating)} size="sm" />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{store.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{store.address || 'No address provided'}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Your Rating</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {userRatings[store.id] ? (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < userRatings[store.id] ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium">{userRatings[store.id]}</span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">Not rated yet</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStore(store)}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      {userRatings[store.id] ? 'Update Rating' : 'Rate Store'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stores found matching your search.</p>
          </div>
        )}

        {/* Rating Modal */}
        {selectedStore && (
          <RatingModal
            store={selectedStore}
            currentRating={userRatings[selectedStore.id]}
            onClose={() => setSelectedStore(null)}
            onSuccess={handleRatingSuccess}
          />
        )}
      </main>
    </div>
  );
};

export default StoresPage;
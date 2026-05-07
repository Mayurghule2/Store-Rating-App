import React, { useState } from 'react';
import api from '../../services/api';
import { X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const RatingModal = ({ store, currentRating, onClose, onSuccess }) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/ratings', {
        storeId: store.id,
        rating: rating
      });
      toast.success(currentRating ? 'Rating updated successfully!' : 'Rating submitted successfully!');
      onSuccess(store.id, rating);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-slide-up">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {currentRating ? 'Update Rating' : 'Rate Store'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{store.name}</h3>
            <p className="text-gray-600 text-sm">How would you rate this store?</p>
          </div>

          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transform transition-transform hover:scale-110"
              >
                <Star
                  className={`h-12 w-12 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  } transition-colors duration-150`}
                />
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600">
              {rating === 1 && "Very Poor"}
              {rating === 2 && "Poor"}
              {rating === 3 && "Average"}
              {rating === 4 && "Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>

          <div className="flex space-x-3">
            <button onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || rating === 0}
              className="btn-primary flex-1"
            >
              {submitting ? 'Submitting...' : currentRating ? 'Update Rating' : 'Submit Rating'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
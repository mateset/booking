import React from 'react';
import { toast } from 'react-toastify';

// Function to show a toast message with type
export const showToast = (message, type = 'info', options = {}) => {
  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast.info(message, options);
  }
};

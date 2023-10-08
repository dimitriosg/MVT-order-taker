// src/utils/dashboardNavigation.js
import { useCallback } from 'react';

export const useHandleGoToDashboard = (originalRole, navigate, setError) => {
  return useCallback(() => {
    switch(originalRole) {
      case 'admin':
          navigate('/dashboard/AdminDashboard');
          break;
      case 'accountant':
          navigate('/dashboard/AccountantDashboard');
          break;
      case 'developer':
          navigate('/dashboard/DeveloperDashboard');
          break;
      case 'cashier':
          navigate('/dashboard/CashierDashboard');
          break;
      case 'waiter':
          navigate('/dashboard/WaiterDashboard');
          break;
      default:
          setError('Unrecognized role. Unable to redirect to dashboard.');
          break;
    }
  }, [originalRole, navigate, setError]);
};

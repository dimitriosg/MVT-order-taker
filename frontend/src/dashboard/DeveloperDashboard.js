/* eslint-disable no-unused-vars */
// src/dashboard/DeveloperDashboard.js
import React from 'react';

// All Dashboard Setup + CSS (in 1 file)
import DashSetup from './AllDashSetup.js'; 

import OrdersSection from '../pages/OrdersSection.js';

////////////////////////////////
const DeveloperDashboard = () => {

  return (
      <div className="developer-dashboard">
        <DashSetup />
      
      </div>
  );
};

export default DeveloperDashboard;

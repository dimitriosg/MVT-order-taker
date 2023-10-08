// src/utils/roleLogic.js

export function getAvailableRoles(currentRole) {
    switch (currentRole) {
      case 'developer':
        return ['developer', 'admin', 'accountant', 'cashier', 'waiter'];
      case 'admin':
        return ['admin', 'accountant', 'cashier', 'waiter'];
      default:
        return [];  // No role switching allowed for other roles
    }
  }
  
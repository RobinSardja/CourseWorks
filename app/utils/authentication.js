import Users from './Users_rows.json';

export async function loadUsers() {
  // Simulate async loading of users
  return Users;
}

export function authenticateUser(users, username, password) {
  // Find user with matching username and password
  return users.find(
    user => 
      user.username.toLowerCase() === username.toLowerCase() && 
      user.password === password
  );
}

export function getUserDashboardPath(role) {
  // Remove trailing numbers from role to get base role
  const baseRole = role.replace(/\d+$/, '');
  
  const roleMap = {
    'student': '/student',
    'advisor': '/advisor',
    'instructor': '/instructor',
    'staff': '/staff'
  };

  return roleMap[baseRole] || null;
}
// utils/auth.js
export const isTokenValid = () => {
  const token = localStorage.getItem('jwt_token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (payload.exp < currentTime) {
      localStorage.removeItem('jwt_token');
      return false;
    }
    
    return true;
  } catch (error) {
    localStorage.removeItem('jwt_token');
    return false;
  }
};

export const getTokenData = () => {
  const token = localStorage.getItem('jwt_token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user_data');
  window.location.href = '/login';
};

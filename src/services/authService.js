// src/services/authService.js
const API_URL = 'http://localhost:3030/XXIntelBankingProject/Intel-Banking';

const signup = async (email, password) => {
  const response = await fetch(`${API_URL}/Sign-Up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailID: email, password: password }),
  });

  const result = await response.text(); // Read the response as text

  if (!response.ok) {
    // If response is not ok, throw the error message from API
    throw new Error(result || 'Signup failed');
  }

  return result; // Return the result as plain text
};

const signin = async (email, password) => {
  const response = await fetch(`${API_URL}/Sign-In`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailID: email, password: password }),
  });

  if (!response.ok) {
    // Handle non-200 responses
    const error = await response.json();
    throw new Error(error.message || 'Signin failed');
  }

  // Parse JSON response
  return response.json();
};

export { signup, signin };

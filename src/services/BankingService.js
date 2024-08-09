// src/services/BankingService.js

const API_URL = 'http://localhost:3030/XXIntelBankingProject/Intel-Banking';

export const BankingService = {
  async createAccount(formData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user ? user.regID : null;

    if (!uid) {
      return { success: false, error: 'User not found. Please log in again.' };
    }

    try {
      const response = await fetch(`${API_URL}/account-creation?uid=${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.text();
        return { success: true, data: result };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to submit the form.' };
      }
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: 'An error occurred. Please try again.' };
    }
  }
};

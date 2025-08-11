import { APP_CONFIG } from '@/constants';

/**
 * Format a date string to a localized date format
 * @param {string|Date} dateInput - Date string or Date object
 * @param {string} fallback - Fallback text if date is invalid
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput, fallback = 'N/A') => {
  if (!dateInput) return fallback;
  
  try {
    const date = new Date(dateInput);
    
    if (isNaN(date.getTime())) {
      return fallback;
    }
    
    return date.toLocaleDateString(
      APP_CONFIG.DATE_FORMAT.LOCALE, 
      APP_CONFIG.DATE_FORMAT.OPTIONS
    );
  } catch (error) {
    console.error('Date formatting error:', error);
    return fallback;
  }
};

/**
 * Check if a date is in the future
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {boolean} True if date is in the future
 */
export const isDateInFuture = (dateInput) => {
  if (!dateInput) return false;
  
  try {
    const date = new Date(dateInput);
    const today = new Date();
    
    // Reset time to start of day for both dates to compare only dates
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    return dateOnly > todayOnly;
  } catch (error) {
    console.error('Date validation error:', error);
    return false;
  }
};

/**
 * Get today's date as a string in YYYY-MM-DD format
 * @returns {string} Today's date string
 */
export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Validate if a date string is valid and not in the future
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if date is valid and not in the future
 */
export const isValidPastDate = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;
    
    return !isDateInFuture(date);
  } catch (error) {
    return false;
  }
};

// Local storage utilities for restaurant system
import { Customer, SessionData } from '@/types/restaurant';

const STORAGE_KEY = 'restaurant_sessions';
const ADMIN_KEY = 'admin_session';

export const getStoredSessions = (): Customer[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    return parsed.map((customer: any) => ({
      ...customer,
      startTime: new Date(customer.startTime),
      endTime: new Date(customer.endTime),
    }));
  } catch (error) {
    console.error('Error parsing stored sessions:', error);
    return [];
  }
};

export const storeSessions = (customers: Customer[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (error) {
    console.error('Error storing sessions:', error);
  }
};

export const isAdminLoggedIn = (): boolean => {
  try {
    const adminSession = localStorage.getItem(ADMIN_KEY);
    if (!adminSession) return false;
    
    const session = JSON.parse(adminSession);
    const now = new Date().getTime();
    
    // Session expires after 24 hours
    if (now - session.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(ADMIN_KEY);
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

export const setAdminSession = (): void => {
  const session = {
    timestamp: new Date().getTime(),
    isLoggedIn: true,
  };
  localStorage.setItem(ADMIN_KEY, JSON.stringify(session));
};

export const clearAdminSession = (): void => {
  localStorage.removeItem(ADMIN_KEY);
};
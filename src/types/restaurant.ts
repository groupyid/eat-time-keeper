// Types for the All You Can Eat restaurant system

export interface Customer {
  id: string;
  tableNumber: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  qrCode?: string;
}

export interface SessionData {
  customers: Customer[];
  isAdminLoggedIn: boolean;
}

export interface NotificationData {
  id: string;
  tableNumber: string;
  message: string;
  timestamp: Date;
  isShown: boolean;
}
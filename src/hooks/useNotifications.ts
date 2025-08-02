// Hook for managing notifications
import { useState, useEffect, useCallback } from 'react';
import { Customer, NotificationData } from '@/types/restaurant';
import { v4 as uuidv4 } from 'uuid';

export const useNotifications = (customers: Customer[]) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [shownNotificationIds, setShownNotificationIds] = useState<Set<string>>(new Set());

  // Check for expired customers and create notifications
  useEffect(() => {
    const now = new Date();
    const expiredCustomers = customers.filter(customer => 
      customer.isActive && customer.endTime <= now
    );

    expiredCustomers.forEach(customer => {
      // Create unique notification ID based on customer and end time
      const notificationId = `${customer.id}-${customer.endTime.getTime()}`;
      
      // Only show notification if it hasn't been shown before
      if (!shownNotificationIds.has(notificationId)) {
        const notification: NotificationData = {
          id: uuidv4(),
          tableNumber: customer.tableNumber,
          message: `Waktu makan di Meja ${customer.tableNumber} telah berakhir!`,
          timestamp: now,
          isShown: false,
        };

        setNotifications(prev => [...prev, notification]);
        setShownNotificationIds(prev => new Set(prev).add(notificationId));
      }
    });
  }, [customers, shownNotificationIds]);

  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    dismissNotification,
    clearAllNotifications,
  };
};
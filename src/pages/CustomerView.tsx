// Customer countdown view page
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Customer } from '@/types/restaurant';
import { getStoredSessions } from '@/utils/storage';
import CountdownTimer from '@/components/customer/CountdownTimer';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';

const CustomerView = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [timeExpired, setTimeExpired] = useState(false);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load customer data
  useEffect(() => {
    const loadCustomer = () => {
      const customers = getStoredSessions();
      const foundCustomer = customers.find(c => c.id === customerId);
      
      if (foundCustomer) {
        setCustomer(foundCustomer);
      }
      
      setIsLoading(false);
    };

    loadCustomer();

    // Refresh customer data every 30 seconds to sync with admin changes
    const interval = setInterval(loadCustomer, 30000);
    
    return () => clearInterval(interval);
  }, [customerId]);

  const handleTimeExpired = () => {
    setTimeExpired(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/10">
        <Card className="w-full max-w-md shadow-warm">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat data pelanggan...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-destructive/10">
        <Card className="w-full max-w-md shadow-warm">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-destructive rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-destructive">
                Sesi Tidak Ditemukan
              </h1>
              <p className="text-muted-foreground">
                QR Code tidak valid atau sesi telah berakhir
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Silakan hubungi staff restoran untuk bantuan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if customer session was manually ended by admin
  if (!customer.isActive && !timeExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-warning/10">
        <Card className="w-full max-w-md shadow-warm">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-warning rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-warning-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-warning-foreground">
                Sesi Telah Diakhiri
              </h1>
              <p className="text-muted-foreground">
                Sesi makan untuk Meja {customer.tableNumber} telah diakhiri oleh staff restoran
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Terima kasih telah menikmati All You Can Eat
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Tidak ada koneksi internet</span>
          </div>
        </div>
      )}

      {/* Online Indicator (temporary) */}
      {isOnline && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-success text-success-foreground p-2 rounded-full shadow-lg">
            <Wifi className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Main Countdown Timer */}
      <CountdownTimer
        endTime={customer.endTime}
        tableNumber={customer.tableNumber}
        onTimeExpired={handleTimeExpired}
      />
    </div>
  );
};

export default CustomerView;
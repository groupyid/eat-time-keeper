// Admin dashboard page
import { useState, useEffect } from 'react';
import { Customer } from '@/types/restaurant';
import { getStoredSessions, storeSessions, clearAdminSession } from '@/utils/storage';
import { useNotifications } from '@/hooks/useNotifications';
import QRGenerator from '@/components/admin/QRGenerator';
import CustomerTable from '@/components/admin/CustomerTable';
import NotificationModal from '@/components/notifications/NotificationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogOut, BarChart3, Users, Clock, TrendingUp } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  // Load customers from storage on component mount
  useEffect(() => {
    const storedCustomers = getStoredSessions();
    setCustomers(storedCustomers);
  }, []);

  // Auto-save customers to storage whenever customers change
  useEffect(() => {
    storeSessions(customers);
  }, [customers]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Use notifications hook
  const { notifications, dismissNotification } = useNotifications(customers);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers(prev => [...prev, newCustomer]);
    toast({
      title: "Pelanggan Ditambahkan",
      description: `Meja ${newCustomer.tableNumber} berhasil ditambahkan`,
    });
  };

  const handleUpdateCustomer = (customerId: string, updates: Partial<Customer>) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, ...updates }
          : customer
      )
    );
  };

  const handleLogout = () => {
    clearAdminSession();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari dashboard admin",
    });
    onLogout();
  };

  // Calculate statistics
  const activeCustomers = customers.filter(c => c.isActive && currentTime < c.endTime);
  const expiredCustomers = customers.filter(c => c.isActive && currentTime >= c.endTime);
  const totalToday = customers.filter(c => {
    const today = new Date();
    const customerDate = c.startTime;
    return customerDate.toDateString() === today.toDateString();
  }).length;

  const currentNotification = notifications.length > 0 ? notifications[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Admin</h1>
            <p className="text-muted-foreground">
              Sistem All You Can Eat - {currentTime.toLocaleDateString('id-ID')} {currentTime.toLocaleTimeString('id-ID')}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-warm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pelanggan Aktif</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCustomers.length}</div>
              <p className="text-xs text-muted-foreground">sedang makan</p>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waktu Habis</CardTitle>
              <Clock className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expiredCustomers.length}</div>
              <p className="text-xs text-muted-foreground">perlu perhatian</p>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hari Ini</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalToday}</div>
              <p className="text-xs text-muted-foreground">pelanggan dilayani</p>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efisiensi</CardTitle>
              <BarChart3 className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.length > 0 ? Math.round((customers.filter(c => !c.isActive).length / customers.length) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">pelanggan selesai</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QR Generator */}
          <div className="lg:col-span-1">
            <QRGenerator onCustomerAdded={handleAddCustomer} />
          </div>

          {/* Customer Table */}
          <div className="lg:col-span-2">
            <CustomerTable 
              customers={customers} 
              onUpdateCustomer={handleUpdateCustomer}
            />
          </div>
        </div>

        {/* Emergency Alerts */}
        {expiredCustomers.length > 0 && (
          <Card className="border-destructive bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">⚠️ Perhatian Diperlukan</CardTitle>
              <CardDescription>
                Ada {expiredCustomers.length} meja yang waktu makannya telah habis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {expiredCustomers.map(customer => (
                  <span 
                    key={customer.id}
                    className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-medium"
                  >
                    Meja {customer.tableNumber}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notification Modal */}
      <NotificationModal 
        notification={currentNotification}
        onDismiss={() => currentNotification && dismissNotification(currentNotification.id)}
      />
    </div>
  );
};

export default AdminDashboard;
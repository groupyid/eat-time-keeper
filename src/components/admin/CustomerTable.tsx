// Customer table component for admin dashboard
import { useState, useEffect } from 'react';
import { Customer } from '@/types/restaurant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onUpdateCustomer: (customerId: string, updates: Partial<Customer>) => void;
}

const CustomerTable = ({ customers, onUpdateCustomer }: CustomerTableProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeRemaining = (endTime: Date): string => {
    const now = currentTime;
    const remaining = endTime.getTime() - now.getTime();
    
    if (remaining <= 0) {
      return "Selesai";
    }

    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (customer: Customer) => {
    const isExpired = currentTime >= customer.endTime;
    
    if (!customer.isActive) {
      return <Badge variant="secondary">Selesai Manual</Badge>;
    }
    
    if (isExpired) {
      return <Badge variant="destructive">Waktu Habis</Badge>;
    }
    
    return <Badge variant="default" className="bg-success text-success-foreground">Aktif</Badge>;
  };

  const handleFinishCustomer = (customerId: string) => {
    onUpdateCustomer(customerId, { isActive: false });
  };

  const activeCustomers = customers.filter(c => c.isActive);
  const finishedCustomers = customers.filter(c => !c.isActive);

  return (
    <div className="space-y-6">
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Pelanggan Aktif ({activeCustomers.length})
          </CardTitle>
          <CardDescription>
            Daftar pelanggan yang sedang menikmati All You Can Eat
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeCustomers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada pelanggan aktif</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Meja</th>
                    <th className="text-left py-3 px-2">Waktu Mulai</th>
                    <th className="text-left py-3 px-2">Sisa Waktu</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCustomers.map((customer) => {
                    const isExpired = currentTime >= customer.endTime;
                    return (
                      <tr key={customer.id} className="border-b">
                        <td className="py-3 px-2 font-semibold">
                          {customer.tableNumber}
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {customer.startTime.toLocaleTimeString('id-ID')}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className={isExpired ? 'text-destructive font-semibold' : ''}>
                              {formatTimeRemaining(customer.endTime)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {getStatusBadge(customer)}
                        </td>
                        <td className="py-3 px-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFinishCustomer(customer.id)}
                          >
                            <CheckCircle className="w-3 h-3" />
                            Selesai
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {finishedCustomers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-muted-foreground" />
              Riwayat Pelanggan ({finishedCustomers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Meja</th>
                    <th className="text-left py-3 px-2">Waktu Mulai</th>
                    <th className="text-left py-3 px-2">Waktu Berakhir</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {finishedCustomers.slice(-5).map((customer) => (
                    <tr key={customer.id} className="border-b">
                      <td className="py-3 px-2">{customer.tableNumber}</td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">
                        {customer.startTime.toLocaleTimeString('id-ID')}
                      </td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">
                        {customer.endTime.toLocaleTimeString('id-ID')}
                      </td>
                      <td className="py-3 px-2">
                        {getStatusBadge(customer)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerTable;
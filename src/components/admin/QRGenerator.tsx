// QR Code generator component for admin
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateQRCode, createCustomerUrl } from '@/utils/qrcode';
import { Customer } from '@/types/restaurant';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { QrCode, Plus, Download } from 'lucide-react';

interface QRGeneratorProps {
  onCustomerAdded: (customer: Customer) => void;
}

const QRGenerator = ({ onCustomerAdded }: QRGeneratorProps) => {
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const handleGenerateQR = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tableNumber.trim()) {
      toast({
        title: "Error",
        description: "Nomor meja harus diisi",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Create new customer session
      const customerId = uuidv4();
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 90 * 60 * 1000); // 90 minutes

      const customer: Customer = {
        id: customerId,
        tableNumber: tableNumber.trim(),
        startTime,
        endTime,
        isActive: true,
      };

      // Generate QR code with customer URL
      const customerUrl = createCustomerUrl(customerId);
      const qrCode = await generateQRCode(customerUrl);
      
      customer.qrCode = qrCode;
      setQrCodeImage(qrCode);
      setCurrentCustomer(customer);

      // Add customer to active sessions
      onCustomerAdded(customer);

      toast({
        title: "QR Code Berhasil Dibuat",
        description: `QR Code untuk Meja ${tableNumber} telah siap`,
      });

    } catch (error) {
      console.error('Error generating QR:', error);
      toast({
        title: "Error",
        description: "Gagal membuat QR Code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeImage || !currentCustomer) return;

    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = `qr-meja-${currentCustomer.tableNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "QR Code Diunduh",
      description: "QR Code telah berhasil diunduh",
    });
  };

  const handleReset = () => {
    setTableNumber('');
    setQrCodeImage('');
    setCurrentCustomer(null);
  };

  return (
    <Card className="shadow-warm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-primary" />
          Generate QR Code
        </CardTitle>
        <CardDescription>
          Buat QR Code baru untuk pelanggan yang baru membayar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!qrCodeImage ? (
          <form onSubmit={handleGenerateQR} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tableNumber">Nomor Meja</Label>
              <Input
                id="tableNumber"
                type="text"
                placeholder="Contoh: 01, A12, dll."
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              variant="restaurant"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Membuat QR Code...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Buat QR Code
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border inline-block">
              <img 
                src={qrCodeImage} 
                alt={`QR Code Meja ${currentCustomer?.tableNumber}`}
                className="mx-auto"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">
                QR Code Meja {currentCustomer?.tableNumber}
              </h3>
              <p className="text-sm text-muted-foreground">
                Waktu: 90 menit (berakhir pada {currentCustomer?.endTime.toLocaleTimeString('id-ID')})
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownloadQR} variant="outline" className="flex-1">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button onClick={handleReset} variant="restaurant" className="flex-1">
                <Plus className="w-4 h-4" />
                Buat Baru
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRGenerator;
// Landing page for All You Can Eat restaurant system
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Clock, QrCode, Shield, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: QrCode,
      title: "QR Code System",
      description: "Generate QR codes untuk setiap meja dengan mudah"
    },
    {
      icon: Clock,
      title: "Timer 90 Menit",
      description: "Countdown otomatis untuk setiap sesi All You Can Eat"
    },
    {
      icon: Users,
      title: "Monitoring Real-time",
      description: "Pantau semua pelanggan aktif dalam satu dashboard"
    },
    {
      icon: Shield,
      title: "Notifikasi Otomatis",
      description: "Alert otomatis ketika waktu pelanggan habis"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-glow">
            <ChefHat className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
              All You Can Eat
            </h1>
            <h2 className="text-3xl font-semibold text-foreground">
              Restaurant Management System
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sistem manajemen restoran modern untuk pelayanan All You Can Eat dengan 
              QR code, timer otomatis, dan monitoring real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="restaurant"
              onClick={() => navigate('/admin')}
              className="text-lg px-8 py-6"
            >
              <Shield className="w-5 h-5" />
              Admin Dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg px-8 py-6"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Fitur Unggulan</h3>
            <p className="text-muted-foreground text-lg">
              Solusi lengkap untuk restoran All You Can Eat modern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-warm hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Cara Kerja</h3>
            <p className="text-muted-foreground text-lg">
              Proses sederhana untuk pengalaman pelanggan yang optimal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                1
              </div>
              <h4 className="text-xl font-semibold">Pembayaran di Kasir</h4>
              <p className="text-muted-foreground">
                Pelanggan membayar di kasir dan staff membuat QR code untuk meja mereka
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                2
              </div>
              <h4 className="text-xl font-semibold">Scan QR Code</h4>
              <p className="text-muted-foreground">
                Pelanggan memindai QR code untuk melihat countdown timer 90 menit
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                3
              </div>
              <h4 className="text-xl font-semibold">Monitoring Otomatis</h4>
              <p className="text-muted-foreground">
                Admin mendapat notifikasi otomatis ketika waktu pelanggan habis
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center pt-8 border-t border-border">
          <p className="text-muted-foreground">
            © 2024 All You Can Eat Management System. 
            Dibuat untuk meningkatkan efisiensi pelayanan restoran.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

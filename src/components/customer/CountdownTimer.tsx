// Countdown timer component for customer view
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Utensils, CheckCircle } from 'lucide-react';

interface CountdownTimerProps {
  endTime: Date;
  tableNumber: string;
  onTimeExpired: () => void;
}

const CountdownTimer = ({ endTime, tableNumber, onTimeExpired }: CountdownTimerProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      if (now >= endTime && !hasExpired) {
        setHasExpired(true);
        onTimeExpired();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, hasExpired, onTimeExpired]);

  const getTimeRemaining = () => {
    const remaining = endTime.getTime() - currentTime.getTime();
    
    if (remaining <= 0) {
      return { minutes: 0, seconds: 0, total: 0 };
    }

    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    return { minutes, seconds, total: remaining };
  };

  const { minutes, seconds, total } = getTimeRemaining();
  const isExpired = total <= 0;
  const isWarning = total <= 15 * 60 * 1000; // Last 15 minutes
  const isCritical = total <= 5 * 60 * 1000; // Last 5 minutes

  const getCircularProgress = () => {
    const totalDuration = 90 * 60 * 1000; // 90 minutes in milliseconds
    const elapsed = totalDuration - total;
    const progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    return progress;
  };

  const progress = getCircularProgress();
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-destructive/10">
        <Card className="w-full max-w-md shadow-warm text-center">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-destructive rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-destructive-foreground" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-destructive">
                  Waktu Telah Berakhir
                </h1>
                <p className="text-muted-foreground">
                  Terima kasih telah menikmati All You Can Eat di Meja {tableNumber}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Silakan menuju kasir untuk penyelesaian pembayaran
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Card className="w-full max-w-md shadow-warm">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            {/* Restaurant Header */}
            <div className="space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-glow">
                <Utensils className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">All You Can Eat</h1>
              <p className="text-muted-foreground">Meja {tableNumber}</p>
            </div>

            {/* Circular Progress Timer */}
            <div className="relative mx-auto w-48 h-48">
              <svg
                className="transform -rotate-90 w-full h-full"
                viewBox="0 0 200 200"
              >
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={isCritical ? 'hsl(var(--destructive))' : isWarning ? 'hsl(var(--warning))' : 'hsl(var(--primary))'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              
              {/* Timer display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-4xl font-bold ${isCritical ? 'text-destructive animate-pulse' : isWarning ? 'text-warning' : 'text-primary'}`}>
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  sisa waktu
                </div>
              </div>
            </div>

            {/* Status Messages */}
            <div className="space-y-3">
              {isCritical && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive font-medium text-sm">
                    ⚠️ Waktu makan hampir habis!
                  </p>
                </div>
              )}
              
              {isWarning && !isCritical && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                  <p className="text-warning-foreground font-medium text-sm">
                    🔔 15 menit terakhir untuk menikmati makanan
                  </p>
                </div>
              )}
              
              {!isWarning && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                  <p className="text-success font-medium text-sm">
                    ✨ Selamat menikmati All You Can Eat!
                  </p>
                </div>
              )}
            </div>

            {/* End time info */}
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                Waktu berakhir pada: {endTime.toLocaleTimeString('id-ID')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountdownTimer;
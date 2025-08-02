// Notification modal for admin alerts
import { useEffect } from 'react';
import { NotificationData } from '@/types/restaurant';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Bell, Clock } from 'lucide-react';

interface NotificationModalProps {
  notification: NotificationData | null;
  onDismiss: () => void;
}

const NotificationModal = ({ notification, onDismiss }: NotificationModalProps) => {
  // Auto-play notification sound (optional)
  useEffect(() => {
    if (notification) {
      // Create a simple notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <AlertDialog open={!!notification} onOpenChange={onDismiss}>
      <AlertDialogContent className="shadow-warm">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <Bell className="w-5 h-5" />
            Notifikasi Waktu Habis
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {notification.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 my-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium">
              Waktu: {notification.timestamp.toLocaleTimeString('id-ID')}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Silakan periksa meja dan lakukan penyelesaian dengan pelanggan.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onDismiss}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Mengerti
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotificationModal;
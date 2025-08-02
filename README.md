# 🍽️ All You Can Eat - Restaurant Management System

Sistem manajemen restoran modern untuk pelayanan All You Can Eat dengan QR code, timer otomatis, dan monitoring real-time.

## ✨ Fitur Utama

### 🔐 Admin Dashboard
- **Login Protection**: Sistem login sederhana untuk melindungi dashboard admin
- **QR Code Generator**: Generate QR code unik untuk setiap meja pelanggan
- **Real-time Monitoring**: Pantau semua pelanggan aktif dalam satu dashboard
- **Notifikasi Otomatis**: Alert popup ketika waktu pelanggan habis
- **Statistik Live**: Lihat jumlah pelanggan aktif, expired, dan total hari ini

### 📱 Customer Experience
- **QR Code Scanner**: Pelanggan scan QR code untuk akses timer
- **Countdown Timer**: Timer visual 90 menit dengan progress bar circular
- **Status Alerts**: Notifikasi saat sisa waktu 15 menit dan 5 menit
- **Responsive Design**: Optimal di semua perangkat mobile dan desktop
- **Offline Indicator**: Indikator koneksi internet untuk reliability

### 🔔 Smart Notifications
- **Auto Popup**: Notifikasi otomatis di dashboard admin saat waktu habis
- **Sound Alert**: Notifikasi suara untuk menarik perhatian staff
- **Table Identification**: Identifikasi jelas nomor meja yang expired
- **One-time Show**: Notifikasi hanya muncul sekali per expired session

## 🚀 Cara Penggunaan

### 1. **Admin Login**
- Akses `/admin` 
- Username: `admin`
- Password: `restaurant123`

### 2. **Generate QR Code**
- Di dashboard admin, masukkan nomor meja
- Klik "Buat QR Code"
- Download atau tunjukkan QR code ke pelanggan

### 3. **Customer Timer**
- Pelanggan scan QR code
- Timer 90 menit dimulai otomatis
- Monitor sisa waktu secara real-time

### 4. **Admin Monitoring**
- Pantau semua pelanggan aktif
- Dapatkan notifikasi otomatis saat waktu habis
- Kelola status pelanggan (selesai manual jika diperlukan)

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **QR Code**: qrcode library
- **Storage**: localStorage (untuk demo)
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🎨 Design System

### Color Palette
- **Primary**: Warm orange (#FF6B35) - Restaurant branding
- **Success**: Green - Active status
- **Warning**: Yellow - Time warnings  
- **Destructive**: Red - Expired status
- **Muted**: Neutral grays - Supporting elements

### Typography
- Clean, readable fonts
- Proper contrast ratios
- Responsive text sizing

### Components
- Consistent button variants
- Beautiful card designs
- Smooth animations and transitions
- Mobile-first responsive design

## 📋 File Structure

```
src/
├── components/
│   ├── auth/
│   │   └── AdminLogin.tsx          # Login component
│   ├── admin/
│   │   ├── QRGenerator.tsx         # QR code generation
│   │   └── CustomerTable.tsx       # Customer monitoring table
│   ├── customer/
│   │   └── CountdownTimer.tsx      # Customer timer view
│   ├── notifications/
│   │   └── NotificationModal.tsx   # Admin notifications
│   └── ui/                         # shadcn/ui components
├── pages/
│   ├── Index.tsx                   # Landing page
│   ├── AdminPage.tsx              # Admin login wrapper
│   ├── AdminDashboard.tsx         # Main admin dashboard
│   └── CustomerView.tsx           # Customer timer page
├── hooks/
│   └── useNotifications.ts        # Notification management
├── utils/
│   ├── storage.ts                 # localStorage utilities
│   └── qrcode.ts                  # QR code utilities
├── types/
│   └── restaurant.ts              # TypeScript interfaces
└── main.tsx                       # App entry point
```

## 🔧 Instalasi & Development

### Prerequisites
- Node.js 18+ dan npm

### Setup
```bash
# Clone repository
git clone <repository-url>
cd restaurant-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build untuk Production
```bash
# Build aplikasi
npm run build

# Preview build
npm run preview
```

## 📱 URL Routes

- `/` - Landing page dengan informasi sistem
- `/admin` - Dashboard admin (butuh login)
- `/customer/:customerId` - Timer countdown pelanggan

## 🔒 Security Features

- **Session Management**: Login session dengan expiry 24 jam
- **Route Protection**: Admin routes dilindungi authentication
- **Input Validation**: Form validation untuk mencegah error
- **XSS Protection**: Proper sanitization untuk user inputs

## 🎯 Future Enhancements

### Possible Improvements:
1. **Backend Integration**: 
   - Database real (PostgreSQL/MongoDB)
   - REST API dengan Express.js
   - WebSocket untuk real-time updates

2. **Advanced Features**:
   - Multiple restaurant support
   - Advanced reporting & analytics
   - Email/SMS notifications
   - Payment integration
   - Menu management
   - Table reservation system

3. **Mobile App**:
   - React Native customer app
   - Push notifications
   - Offline mode support

## 📞 Support

Untuk bantuan teknis atau pertanyaan:
- Buka issue di repository ini
- Email: support@restaurant-system.com
- Documentation: [Link to docs]

## 📄 License

© 2024 All You Can Eat Management System. All rights reserved.

---

**Dibuat dengan ❤️ untuk meningkatkan efisiensi pelayanan restoran modern.**
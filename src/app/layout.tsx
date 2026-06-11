import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'FarmWork Connect - Book Farm Workers, Equipment & Rural Services',
  description: 'All-Crop Farmer Labor, Equipment & Rural Services Booking Platform. Connect with verified laborers, equipment owners, transport providers, and agri-service experts.',
  keywords: ['farm services', 'agriculture', 'farm labor', 'equipment rental', 'rural services'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#16a34a',
              color: '#fff',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

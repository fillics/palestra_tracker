import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gym Tracker',
  description: 'Track your workouts effectively',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Gym Tracker</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

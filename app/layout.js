import './globals.css';

export const metadata = {
  title: 'OneAI — Usage Intelligence',
  description: 'OneAI multi-model AI platform analytics dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

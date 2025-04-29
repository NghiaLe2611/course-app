import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'English Test App',
  description: 'Practice for IELTS, TOEIC, and TOEFL online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
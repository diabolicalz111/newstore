"use client";

import './globals.css';
import 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap';
import 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Diabolical Jewellery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

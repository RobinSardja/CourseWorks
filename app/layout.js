"use client"

import "./globals.css";
import { useState, createContext } from "react";

export const AuthContext = createContext(null);

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  return (
    <html lang="en">
      <AuthContext.Provider value={{ user, setUser }}>
        <body>{children}</body>
      </AuthContext.Provider>
    </html>
  );
}

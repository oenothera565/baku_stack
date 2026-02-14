"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#000',
          color: '#fff',
          border: '2px solid #fff',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '14px',
        },
        // Success style
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
          style: {
            border: '2px solid #10b981',
          },
        },
        // Error style
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
          style: {
            border: '2px solid #ef4444',
          },
        },
        // Loading style
        loading: {
          iconTheme: {
            primary: '#ea580c',
            secondary: '#fff',
          },
          style: {
            border: '2px solid #ea580c',
          },
        },
      }}
    />
  );
}

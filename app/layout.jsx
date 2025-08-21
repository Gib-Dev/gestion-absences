// app/layout.js
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APP_CONFIG } from "@/constants";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Gestion Absences",
  description: "Plateforme de gestion des absences pour entreprises et établissements",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <PageWrapper>
            {children}
          </PageWrapper>
          <ToastContainer
            position={APP_CONFIG.UI.TOAST_POSITION}
            autoClose={APP_CONFIG.UI.TOAST_AUTO_CLOSE}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
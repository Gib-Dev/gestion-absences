// app/layout.js
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APP_CONFIG } from "@/constants";

export const metadata = {
  title: "Gestion Absences",
  description: "Plateforme de gestion des absences pour entreprises et établissements",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { AuthProvider } from '@/contexts/AuthContext';
import RequireAuth from '@/components/Layout/RequireAuth';
import MainLayout from '@/components/Layout/MainLayout';
import LoginPage from '@/pages/LoginPage';
import IdeasPage from '@/pages/IdeasPage';
import PlanningPage from '@/pages/PlanningPage';
import RemindersPage from '@/pages/RemindersPage';
import SettingsPage from '@/pages/SettingsPage';
import ProfilePage from '@/pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LocaleProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<RequireAuth />}>
                <Route element={<MainLayout />}>
                  <Route index element={<Navigate to="/ideas" replace />} />
                  <Route path="ideas" element={<IdeasPage />} />
                  <Route path="planning" element={<PlanningPage />} />
                  <Route path="reminders" element={<RemindersPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

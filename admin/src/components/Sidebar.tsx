import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  CalendarDays, 
  CalendarCheck2, 
  Settings, 
  MessageSquare,
  Calendar
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Orçamentos', path: '/quotes', icon: Inbox },
  { name: 'Disponibilidade', path: '/calendar', icon: CalendarDays },
  { name: 'Agendamentos', path: '/bookings', icon: CalendarCheck2 },
  { name: 'Google Agenda', path: '/google-integration', icon: Calendar },
  { name: 'Feedbacks', path: '/feedbacks', icon: MessageSquare },
  { name: 'Configurações', path: '/settings', icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wider">Apple 24H</h1>
        <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-500 text-center">
          &copy; {new Date().getFullYear()} Assistência Apple 24H
        </div>
      </div>
    </div>
  );
};

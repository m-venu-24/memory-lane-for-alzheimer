import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Heart, Brain, Users, Activity, AlertCircle, CheckCircle2, TrendingUp, Menu, X, LogOut, Settings, Home, FileText, BarChart3, User, Phone, MessageSquare, Clock, Calendar, Pill, Zap } from 'lucide-react';

// =====================================================
// GLOBAL STYLES & THEME CONFIGURATION
// =====================================================
const Theme = {
  colors: {
    primary: '#6366f1', // Indigo
    primaryLight: '#e0e7ff',
    secondary: '#8b5cf6', // Violet
    accent: '#ec4899', // Pink
    success: '#10b981', // Emerald
    warning: '#f59e0b', // Amber
    danger: '#ef4444', // Red
    neutral: '#f3f4f6',
    dark: '#1f2937',
    text: '#374151',
    textLight: '#6b7280',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  }
};

// =====================================================
// UTILITY COMPONENTS
// =====================================================

// Reusable Navigation Bar
const Navbar = ({ userRole, onLogout, language, onLanguageToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isDoctor = userRole === 'doctor';
  const roleLabel = isDoctor ? 'Doctor' : 'Caregiver';
  const translatedLabel = roleLabel;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white">
              <Brain size={24} />
            </div>
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Memory Lane
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-gray-600 bg-indigo-50 px-3 py-1 rounded-full">
              {translatedLabel}
            </span>
            <button
              onClick={onLanguageToggle}
              className="text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              TA
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="py-4 space-y-3">
              <span className="block text-sm font-medium text-gray-600 px-4">
                {translatedLabel}
              </span>
              <button
                onClick={() => {
                  onLanguageToggle();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                TA
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Reusable Card Component
const Card = ({ children, className = '', hover = false, ...props }) => (
  <div
    {...props}
    className={`
      bg-white rounded-2xl p-6 shadow-sm border border-gray-100
      ${hover ? 'hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// Reusable Button Component
const Button = ({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '', ...props }) => {
  const baseStyle = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2';
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Alert Component
const Alert = ({ type = 'info', title, message, icon: Icon }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    danger: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 ${colors[type]}`}>
      <div className="flex items-start gap-3">
        {Icon && <Icon size={20} className="flex-shrink-0 mt-0.5" />}
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({ children, color = 'indigo', size = 'md' }) => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    amber: 'bg-amber-100 text-amber-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`font-semibold rounded-full ${colors[color]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

// Progress Bar Component
const ProgressBar = ({ value, label, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-800">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

// =====================================================
// LANDING PAGE
// =====================================================

const LandingPage = ({ onSelectRole, language, onLanguageToggle }) => {
  const content = {
    en: {
      title: 'Memory Lane',
      subtitle: 'AI-Based Memory Lane System',
      tagline: 'Bridging doctors and caregivers for personalized memory therapy',
      features: [
        { icon: Brain, title: 'Injury-Based Personalization', desc: 'Customized therapy for concussions, TBI, and head injuries' },
        { icon: Zap, title: 'AI-Generated Therapy', desc: 'Intelligent therapy plans adapted to patient needs' },
        { icon: Activity, title: 'Patient Monitoring', desc: 'Real-time progress tracking and health insights' },
      ],
      doctorBtn: 'Login as Doctor',
      caregiverBtn: 'Login as Caregiver',
      learnMore: 'How it works',
    },
    ta: {
      title: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚Â',
      subtitle: 'AI-ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â© ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â¤Ã‚Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      tagline: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      features: [
        { icon: Brain, title: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â-ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â© ÃƒÂ Ã‚Â¦Ã‚Â¬ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¯ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â¦Ã¢â‚¬â€ÃƒÂ Ã‚Â¦Ã‚Â¤ÃƒÂ Ã‚Â¦Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¦Ã‚Â°ÃƒÂ Ã‚Â¤Ã‚Â£', desc: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚Â, TBI ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â© ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€ ' },
        { icon: Zap, title: 'AI-ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€ ', desc: 'ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â€šÂ¬ ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Âª ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â' },
        { icon: Activity, title: 'ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â§Ã¢â€šÂ¬ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚Â', desc: 'ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¯ ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â' },
      ],
      doctorBtn: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢',
      caregiverBtn: 'ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢',
      learnMore: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â½ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â',
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 sm:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white">
            <Brain size={24} />
          </div>
          <span className="text-xl font-bold text-gray-900">{t.title}</span>
        </div>
        <button
          onClick={onLanguageToggle}
          className="text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          TA
        </button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t.subtitle}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t.tagline}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => onSelectRole('doctor')}
                className="w-full sm:w-auto"
              >
                <User size={20} /> {t.doctorBtn}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onSelectRole('caregiver')}
                className="w-full sm:w-auto"
              >
                <Users size={20} /> {t.caregiverBtn}
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl opacity-10 blur-3xl" />
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                  <Brain size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Smart Therapy</h3>
                <p className="text-gray-600">Powered by AI & Deep Learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} hover>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-100">
                    <Icon className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 py-8 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>&copy; 2024 Memory Lane - Intelligent Healthcare Solutions. All rights reserved.</p>
      </div>
    </div>
  );
};

// =====================================================
// LOGIN PAGES
// =====================================================

const LoginPage = ({ role, onLogin, onBack, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const content = {
    en: {
      doctor: { title: 'Doctor Login', subtitle: 'Access patient management and monitoring' },
      caregiver: { title: 'Caregiver Login', subtitle: 'Manage patient care and therapy sessions' },
      email: 'Email Address',
      password: 'Password',
      login: 'Login',
      demo: 'Use Demo Account',
      back: 'Back',
      emailPlaceholder: 'doctor@hospital.com',
      passwordPlaceholder: 'Enter your password',
    },
    ta: {
      doctor: { title: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚Â', subtitle: 'ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â' },
      caregiver: { title: 'ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚Â', subtitle: 'ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â' },
      email: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â®Ã…Â¾ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿',
      password: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã…Â ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â',
      login: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢',
      demo: 'ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      back: 'ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢',
      emailPlaceholder: 'doctor@hospital.com',
      passwordPlaceholder: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã…Â ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
    }
  };

  const t = content[language];
  const roleData = t[role];
  const isDoctor = role === 'doctor';

  const handleDemo = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({
        role,
        email: isDoctor ? 'dr.sharma@hospital.com' : 'care.anjali@gmail.com',
        name: isDoctor ? 'Dr. Rajesh Sharma' : 'Anjali Singh',
      });
      setLoading(false);
    }, 800);
  };

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({ role, email, name: email.split('@')[0] });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white mb-4">
              {isDoctor ? <User size={32} /> : <Users size={32} />}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{roleData.title}</h1>
            <p className="text-gray-600">{roleData.subtitle}</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleLogin}
              size="lg"
              className="w-full"
              disabled={loading || !email || !password}
            >
              {loading ? 'Logging in...' : t.login}
            </Button>
            <Button
              onClick={handleDemo}
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {t.demo}
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              size="md"
              className="w-full"
              disabled={loading}
            >
              Back: {t.back}
            </Button>
          </div>
        </Card>

        {/* Info Text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          {language === 'en' 
            ? 'Demo accounts are available for testing the platform'
            : 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â§Ã¢â€šÂ¬ÃƒÂ Ã‚Â¤Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â¦Ã‚Â·ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â© ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â©'}
        </p>
      </div>
    </div>
  );
};

// =====================================================
// DOCTOR DASHBOARD
// =====================================================

const DoctorDashboard = ({ user, language, onLogout, onLanguageToggle }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'

  const content = {
    en: {
      welcome: 'Welcome back',
      patients: 'Your Patients',
      viewDetails: 'View Details',
      patientId: 'ID',
      patientAge: 'Age',
      injuryType: 'Injury Type',
      status: 'Status',
      medical: 'Medical History',
      therapy: 'Therapy Plan',
      progress: 'Progress',
      insights: 'AI Insights',
      reports: 'View Reports',
      alerts: 'Alerts',
      memoryImprov: 'Memory Improvement',
      taskCompletion: 'Task Completion',
      criticalAlerts: 'Critical Alerts',
      noAlerts: 'No critical alerts',
      riskLevel: 'Risk Level',
      recommendations: 'Recommendations',
      therapyAdherence: 'Therapy Adherence',
      sessions: 'Sessions Completed',
      back: 'Back to List',
    },
    ta: {
      welcome: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã¢â€šÂ¬ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      patients: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      viewDetails: 'ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢',
      patientId: 'ID',
      patientAge: 'ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â',
      injuryType: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€ ',
      status: 'ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€ ',
      medical: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Âµ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚Â',
      therapy: 'ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      progress: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      insights: 'AI ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¯ ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â',
      reports: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢',
      alerts: 'ÃƒÂ Ã‚Â®Ã…Â½ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      memoryImprov: 'ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚Â',
      taskCompletion: 'ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚Â',
      criticalAlerts: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â© ÃƒÂ Ã‚Â®Ã…Â½ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      noAlerts: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â© ÃƒÂ Ã‚Â®Ã…Â½ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€ ',
      riskLevel: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€ ',
      recommendations: 'ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      therapyAdherence: 'ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‹â€ ',
      sessions: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      back: 'ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
    }
  };

  const t = content[language];

  // Mock Data
  const patients = [
    {
      id: 'P001',
      name: 'Raj Kumar',
      age: 52,
      injuryType: 'Traumatic Brain Injury (TBI)',
      status: 'In Progress',
      admissionDate: '2024-01-15',
      therapyPlan: 'Cognitive Rehabilitation',
      memoryScore: 65,
      taskCompletion: 72,
      sessionsCompleted: 24,
      totalSessions: 30,
      medicalHistory: 'Previous concussion 3 years ago. Currently on medications for blood pressure.',
      riskLevel: 'Medium',
      lastSessionDate: '2024-03-27',
      alerts: ['Missed 1 therapy session', 'Slight memory decline in recent tests'],
    },
    {
      id: 'P002',
      name: 'Priya Sharma',
      age: 68,
      injuryType: 'Concussion',
      status: 'Recovering',
      admissionDate: '2024-02-10',
      therapyPlan: 'Memory Enhancement Therapy',
      memoryScore: 78,
      taskCompletion: 85,
      sessionsCompleted: 28,
      totalSessions: 30,
      medicalHistory: 'Hypertension, Diabetes Type 2. Excellent recovery progress.',
      riskLevel: 'Low',
      lastSessionDate: '2024-03-26',
      alerts: [],
    },
    {
      id: 'P003',
      name: 'Arjun Singh',
      age: 45,
      injuryType: 'Head Injury',
      status: 'Critical',
      admissionDate: '2024-03-01',
      therapyPlan: 'Intensive Cognitive Training',
      memoryScore: 42,
      taskCompletion: 58,
      sessionsCompleted: 15,
      totalSessions: 30,
      medicalHistory: 'Recent motorcycle accident. Requires close monitoring.',
      riskLevel: 'High',
      lastSessionDate: '2024-03-25',
      alerts: ['Critical memory decline', 'Medication side effects observed', 'Recommended neurologist consultation'],
    },
  ];

  const getStatusColor = (status) => {
    if (status === 'In Progress') return 'indigo';
    if (status === 'Recovering') return 'green';
    if (status === 'Critical') return 'red';
    return 'gray';
  };

  const getRiskColor = (risk) => {
    if (risk === 'High') return 'red';
    if (risk === 'Medium') return 'amber';
    return 'green';
  };

  const chartData = selectedPatient ? [
    { name: 'Week 1', memory: 45, tasks: 50 },
    { name: 'Week 2', memory: 50, tasks: 55 },
    { name: 'Week 3', memory: 58, tasks: 62 },
    { name: 'Week 4', memory: selectedPatient.memoryScore, tasks: selectedPatient.taskCompletion },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userRole="doctor"
        language={language}
        onLogout={onLogout}
        onLanguageToggle={onLanguageToggle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t.welcome}, {user.name}
          </h1>
          <p className="text-gray-600 mt-2">Manage and monitor your patients' recovery journey</p>
        </div>

        {viewMode === 'list' ? (
          <>
            {/* Patient List */}
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{t.patients}</h2>
              <div className="grid gap-6">
                {patients.map((patient) => (
                  <Card key={patient.id} hover onClick={() => { setSelectedPatient(patient); setViewMode('details'); }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center font-bold">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                            <p className="text-sm text-gray-600">{patient.injuryType}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Badge color={getStatusColor(patient.status)}>{patient.status}</Badge>
                        <Badge color={getRiskColor(patient.riskLevel)}>{t.riskLevel}: {patient.riskLevel}</Badge>
                      </div>

                      <Button
                        onClick={() => { setSelectedPatient(patient); setViewMode('details'); }}
                        variant="primary"
                        size="md"
                      >
                        {t.viewDetails}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Patients</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{patients.length}</p>
                  </div>
                  <Users className="text-indigo-500" size={32} />
                </div>
              </Card>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">In Progress</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {patients.filter(p => p.status === 'In Progress').length}
                    </p>
                  </div>
                  <Activity className="text-blue-500" size={32} />
                </div>
              </Card>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t.criticalAlerts}</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">
                      {patients.filter(p => p.riskLevel === 'High').length}
                    </p>
                  </div>
                  <AlertCircle className="text-red-500" size={32} />
                </div>
              </Card>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Recovery Rate</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">82%</p>
                  </div>
                  <TrendingUp className="text-green-500" size={32} />
                </div>
              </Card>
            </div>
          </>
        ) : (
          /* Patient Details View */
          <div className="space-y-6">
            <Button onClick={() => setViewMode('list')} variant="secondary" size="md">
              Back: {t.back}
            </Button>

            {selectedPatient && (
              <>
                {/* Patient Header */}
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-2xl font-bold">
                        {selectedPatient.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                        <p className="text-gray-600">ID: {selectedPatient.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge color={getStatusColor(selectedPatient.status)}>
                        {selectedPatient.status}
                      </Badge>
                      <Badge color={getRiskColor(selectedPatient.riskLevel)}>
                        {t.riskLevel}: {selectedPatient.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Critical Alerts */}
                {selectedPatient.alerts.length > 0 && (
                  <Alert
                    type="warning"
                    title={t.alerts}
                    message={selectedPatient.alerts.join(' | ')}
                    icon={AlertCircle}
                  />
                )}

                {/* Patient Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t.medical}</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedPatient.medicalHistory}</p>
                  </Card>

                  <Card>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t.therapy}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Plan: <span className="font-semibold text-gray-900">{selectedPatient.therapyPlan}</span></p>
                      </div>
                      <ProgressBar
                        value={(selectedPatient.sessionsCompleted / selectedPatient.totalSessions) * 100}
                        label={t.sessions}
                        color="indigo"
                      />
                    </div>
                  </Card>
                </div>

                {/* Progress Visualization */}
                <Card>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">{t.progress}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="memory"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        name={t.memoryImprov}
                      />
                      <Line
                        type="monotone"
                        dataKey="tasks"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        name={t.taskCompletion}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* AI Insights */}
                <Card>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">{t.insights}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                      <p className="text-sm text-blue-800 font-medium mb-2">Memory Score</p>
                      <p className="text-3xl font-bold text-blue-900">{selectedPatient.memoryScore}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                      <p className="text-sm text-green-800 font-medium mb-2">{t.taskCompletion}</p>
                      <p className="text-3xl font-bold text-green-900">{selectedPatient.taskCompletion}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                      <p className="text-sm text-purple-800 font-medium mb-2">Adherence</p>
                      <p className="text-3xl font-bold text-purple-900">
                        {Math.round((selectedPatient.sessionsCompleted / selectedPatient.totalSessions) * 100)}%
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" size="lg" className="flex-1">
                    <FileText size={20} /> {t.reports}
                  </Button>
                  <Button variant="secondary" size="lg" className="flex-1">
                    <MessageSquare size={20} /> Contact Caregiver
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <Settings size={20} /> Adjust Plan
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// =====================================================
// CAREGIVER DASHBOARD
// =====================================================

const CaregiverDashboard = ({ user, language, onLogout, onLanguageToggle }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedInjury, setSelectedInjury] = useState('');
  const [therapyGenerated, setTherapyGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const content = {
    en: {
      welcome: 'Welcome',
      selectInjury: 'Select Injury Type',
      symptoms: 'Observed Symptoms',
      forgetfulness: 'Forgetfulness',
      confusion: 'Confusion',
      moodChanges: 'Mood Changes',
      headache: 'Headache',
      concentration: 'Difficulty Concentrating',
      sleep: 'Sleep Issues',
      irritability: 'Irritability',
      generateTherapy: 'Generate AI Therapy Plan',
      therapySteps: 'Today\'s Therapy Steps',
      completedToday: 'Completed Today',
      dailyChecklist: 'Daily Checklist',
      voiceAssistant: 'Voice Assistant',
      step: 'Step',
      complete: 'Mark Complete',
      next: 'Next Step',
      prev: 'Previous',
      allComplete: 'All exercises completed!',
      medication: 'Take Medications',
      breakfast: 'Have Breakfast',
      morningWalk: 'Morning Walk (20 min)',
      familyTime: 'Family Time',
      evening: 'Evening Activities',
      sleepSchedule: 'Sleep Schedule',
      sessionStart: 'Session started at',
      sessionEnd: 'Estimated completion at',
      therapyDuration: 'Session Duration: 45 minutes',
      back: 'Back',
    },
    ta: {
      welcome: 'ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¹ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      selectInjury: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      symptoms: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      forgetfulness: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿',
      confusion: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â´ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      moodChanges: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      headache: 'ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â®Ã‚Â¿',
      concentration: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      sleep: 'ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã¢â‚¬Å¡ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â',
      irritability: 'ÃƒÂ Ã‚Â®Ã…Â½ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â',
      generateTherapy: 'AI ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      therapySteps: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚Â¯ ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      completedToday: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â',
      dailyChecklist: 'ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â¿ ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¯ ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¯ ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      voiceAssistant: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¿',
      step: 'ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿',
      complete: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      next: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿',
      prev: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚Â¯',
      allComplete: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â©ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â±ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â!',
      medication: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã…Â½ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      breakfast: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã¢â‚¬Â°ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      morningWalk: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â (20 ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â)',
      familyTime: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Âª ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      evening: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‹â€  ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‹â€ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â³ÃƒÂ Ã‚Â¯Ã‚Â',
      sleepSchedule: 'ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã¢â‚¬Å¡ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â®Ã‚Â£ÃƒÂ Ã‚Â¯Ã‹â€ ',
      sessionStart: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã…Â ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã¢â€žÂ¢ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â¯ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â¯Ã‚Â',
      sessionEnd: 'ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â¯Ã¢â‚¬Â¡ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      therapyDuration: 'ÃƒÂ Ã‚Â®Ã¢â‚¬Â¦ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂµÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã¢â‚¬Â¢ÃƒÂ Ã‚Â®Ã‚Â¾ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â: 45 ÃƒÂ Ã‚Â®Ã‚Â¨ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¸ÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚Â',
      back: 'ÃƒÂ Ã‚Â®Ã‚Â¤ÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã‚Â°ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚Â®ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã‚ÂªÃƒÂ Ã‚Â®Ã‚Â¿ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã‚Â ÃƒÂ Ã‚Â®Ã…Â¡ÃƒÂ Ã‚Â¯Ã¢â‚¬Â ÃƒÂ Ã‚Â®Ã‚Â²ÃƒÂ Ã‚Â¯Ã‚ÂÃƒÂ Ã‚Â®Ã¢â‚¬Â¢',
    }
  };

  const t = content[language];

  const injuryTypes = [
    { id: 'tbi', name: 'Traumatic Brain Injury (TBI)', icon: Brain },
    { id: 'concussion', name: 'Concussion', icon: AlertCircle },
    { id: 'headinjury', name: 'Head Injury', icon: Heart },
  ];

  const symptomList = [
    { id: 'forgetfulness', label: t.forgetfulness },
    { id: 'confusion', label: t.confusion },
    { id: 'moodchanges', label: t.moodChanges },
    { id: 'headache', label: t.headache },
    { id: 'concentration', label: t.concentration },
    { id: 'sleep', label: t.sleep },
    { id: 'irritability', label: t.irritability },
  ];

  const therapyPlan = [
    { step: 1, title: 'Memory Exercise', instructions: 'Ask the patient their full name and key family members. Have them repeat 3 times.', duration: '5 min' },
    { step: 2, title: 'Photo Recognition', instructions: 'Show family photos and ask them to identify people. Start with close family.', duration: '10 min' },
    { step: 3, title: 'Voice Reminders', instructions: 'Play pre-recorded reminders of important daily activities and routines.', duration: '10 min' },
    { step: 4, title: 'Conversation', instructions: 'Have a casual conversation about familiar topics. Avoid correcting if they forget details.', duration: '10 min' },
    { step: 5, title: 'Relaxation', instructions: 'Gentle breathing exercises and calm music. End the session peacefully.', duration: '10 min' },
  ];

  const dailyChecklist = [
    { id: 1, task: t.medication, completed: false, time: '8:00 AM' },
    { id: 2, task: t.breakfast, completed: false, time: '9:00 AM' },
    { id: 3, task: t.morningWalk, completed: false, time: '10:00 AM' },
    { id: 4, task: t.familyTime, completed: false, time: '12:00 PM' },
    { id: 5, task: t.evening, completed: false, time: '4:00 PM' },
    { id: 6, task: t.sleepSchedule, completed: false, time: '10:00 PM' },
  ];

  const toggleSymptom = (symptomId) => {
    setSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleGenerateTherapy = () => {
    if (selectedInjury && symptoms.length > 0) {
      setTherapyGenerated(true);
      setCurrentStep(0);
    }
  };

  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev =>
      prev.includes(stepIndex)
        ? prev.filter(s => s !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  if (therapyGenerated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          userRole="caregiver"
          language={language}
          onLogout={onLogout}
          onLanguageToggle={onLanguageToggle}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button
            onClick={() => {
              setTherapyGenerated(false);
              setSymptoms([]);
              setSelectedInjury('');
              setCurrentStep(0);
              setCompletedSteps([]);
            }}
            variant="secondary"
            size="md"
            className="mb-8"
          >
              Back: {t.back}
          </Button>

          {/* Session Header */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Memory Therapy Session</h2>
                <p className="text-green-700 font-medium">{t.therapyDuration}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {t.sessionStart} {new Date().toLocaleTimeString()}
                </p>
              </div>
              <Badge color="green">Active Session</Badge>
            </div>
          </Card>

          {/* Therapy Steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">{t.therapySteps}</h3>

            {currentStep < therapyPlan.length ? (
              <>
                {/* Current Step */}
                <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
                          {therapyPlan[currentStep].step}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {therapyPlan[currentStep].title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Duration: {therapyPlan[currentStep].duration}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 border-2 border-green-200">
                        <p className="text-lg text-gray-800 leading-relaxed">
                          {therapyPlan[currentStep].instructions}
                        </p>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="bg-white rounded-xl p-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium mb-2">Recommended Duration</p>
                        <p className="text-3xl font-bold text-green-600">
                          {therapyPlan[currentStep].duration}
                        </p>
                      </div>
                      <Clock size={48} className="text-green-400" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                        disabled={currentStep === 0}
                      >
                        {t.prev}
                      </Button>
                      <Button
                        onClick={() => toggleStepCompletion(currentStep)}
                        variant={completedSteps.includes(currentStep) ? 'secondary' : 'primary'}
                        size="lg"
                        className="flex-1"
                      >
                        {completedSteps.includes(currentStep) ? 'Done: ' : ''}{t.complete}
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(Math.min(therapyPlan.length - 1, currentStep + 1))}
                        variant="primary"
                        size="lg"
                        className="flex-1"
                      >
                        {currentStep === therapyPlan.length - 1 ? 'Finish Session' : t.next}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        <Phone size={20} /> Voice Help
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-gray-900">Session Progress</p>
                    <span className="text-sm font-bold text-gray-600">
                      {currentStep + 1} of {therapyPlan.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / therapyPlan.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Completed Steps */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">{t.completedToday}</h4>
                  <div className="grid gap-3">
                    {therapyPlan.map((plan, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-2 flex items-center gap-3 cursor-pointer transition-all ${
                          completedSteps.includes(idx)
                            ? 'bg-green-50 border-green-400'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => toggleStepCompletion(idx)}
                      >
                        {completedSteps.includes(idx) && (
                          <CheckCircle2 className="text-green-600" size={24} />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{plan.title}</p>
                          <p className="text-sm text-gray-600">{plan.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Session Complete */
              <Card className="bg-gradient-to-r from-green-100 to-emerald-100 text-center py-12">
                <div className="space-y-6">
                  <div className="text-5xl">Completed</div>
                  <h3 className="text-3xl font-bold text-gray-900">{t.allComplete}</h3>
                  <p className="text-lg text-gray-700">
                    Great job completing today's therapy session!
                  </p>
                  <div className="inline-block bg-white rounded-xl px-6 py-3 font-semibold text-green-600">
                    All {therapyPlan.length} exercises completed successfully
                  </div>
                  <Button
                    onClick={() => {
                      setTherapyGenerated(false);
                      setSymptoms([]);
                      setSelectedInjury('');
                      setCurrentStep(0);
                      setCompletedSteps([]);
                    }}
                    size="lg"
                  >
                    End Session & Return
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Daily Checklist Sidebar */}
          <Card className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.dailyChecklist}</h3>
            <div className="space-y-3">
              {dailyChecklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" defaultChecked={item.completed} className="w-5 h-5 rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.task}</p>
                    <p className="text-xs text-gray-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Therapy Setup View
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userRole="caregiver"
        language={language}
        onLogout={onLogout}
        onLanguageToggle={onLanguageToggle}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t.welcome}, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">Let's start today's memory therapy session</p>
        </div>

        {/* Large, Simple Forms for Caregivers */}
        <div className="space-y-8">
          {/* Injury Type Selection */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.selectInjury}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {injuryTypes.map((injury) => {
                const Icon = injury.icon;
                return (
                  <button
                    key={injury.id}
                    onClick={() => setSelectedInjury(injury.id)}
                    className={`p-6 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      selectedInjury === injury.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <Icon className="w-12 h-12 mx-auto mb-3" style={{ color: selectedInjury === injury.id ? '#6366f1' : '#9ca3af' }} />
                    <p className="font-bold text-lg text-gray-900">{injury.name}</p>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Symptoms Selection */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.symptoms}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptomList.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`p-6 rounded-xl border-2 text-left transition-all cursor-pointer font-semibold text-lg ${
                    symptoms.includes(symptom.id)
                      ? 'border-purple-600 bg-purple-50 text-purple-900'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {symptoms.includes(symptom.id) && (
                      <CheckCircle2 className="text-purple-600" size={24} />
                    )}
                    <span>{symptom.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateTherapy}
            size="lg"
            className="w-full h-16 text-xl font-bold"
            disabled={!selectedInjury || symptoms.length === 0}
          >
            <Zap size={24} /> {t.generateTherapy}
          </Button>

          {/* AI Insights Display */}
          {selectedInjury && symptoms.length > 0 && (
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI Therapy Recommendation</h3>
              <div className="space-y-3">
                <Alert
                  type="info"
                  title="Injury Type"
                  message={injuryTypes.find(i => i.id === selectedInjury)?.name}
                />
                <Alert
                  type="info"
                  title="Identified Symptoms"
                  message={symptoms.map(s => symptomList.find(x => x.id === s)?.label).join(', ')}
                />
                <Alert
                  type="success"
                  title="Customized Plan Ready"
                  message="Your AI-generated therapy plan is ready! Click 'Generate AI Therapy Plan' to start."
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN APP COMPONENT
// =====================================================

export default function MemoryLaneApp() {
  const [currentPage, setCurrentPage] = useState('landing'); // landing, login, dashboard
  const [userRole, setUserRole] = useState(null); // doctor or caregiver
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en'); // en or ta

  const handleSelectRole = (role) => {
    setUserRole(role);
    setCurrentPage('login');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('landing');
    setUser(null);
    setUserRole(null);
  };

  const toggleLanguage = () => {}; // Tamil text in the provided source is corrupted, so keep the UI in English for now.

  return (
    <div className="font-sans bg-white">
      {currentPage === 'landing' && (
        <LandingPage
          onSelectRole={handleSelectRole}
          language={language}
          onLanguageToggle={toggleLanguage}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          role={userRole}
          onLogin={handleLogin}
          onBack={() => {
            setCurrentPage('landing');
            setUserRole(null);
          }}
          language={language}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <>
          {userRole === 'doctor' ? (
            <DoctorDashboard
              user={user}
              language={language}
              onLanguageToggle={toggleLanguage}
              onLogout={() => {
                handleLogout();
                setLanguage('en');
              }}
            />
          ) : (
            <CaregiverDashboard
              user={user}
              language={language}
              onLanguageToggle={toggleLanguage}
              onLogout={() => {
                handleLogout();
                setLanguage('en');
              }}
            />
          )}
        </>
      )}

      {/* Global Language Toggle - Floating Button */}
      {currentPage !== 'landing' && (
        <button
          onClick={toggleLanguage}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
        >
          TA
        </button>
      )}
    </div>
  );
}


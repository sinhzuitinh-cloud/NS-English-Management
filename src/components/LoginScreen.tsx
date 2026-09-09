import { useState, FormEvent } from 'react';
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { UserAccount } from '../types';

interface LoginScreenProps {
  accounts: UserAccount[];
  onLoginSuccess: (user: UserAccount, remember: boolean) => void;
}

export default function LoginScreen({ accounts, onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    const matched = accounts.find(
      (a) => a.username.toLowerCase() === trimmedUser.toLowerCase() && a.password === trimmedPass
    );

    if (matched) {
      onLoginSuccess(matched, rememberMe);
    } else {
      setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div
      id="login-screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-[#070d18] via-[#0d1b2a] to-slate-900 overflow-y-auto select-none"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex relative group">
            <BrandLogo size="lg" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#0d1b2a] tracking-tight">NS ENGLISH ACADEMY</h1>
            <p className="text-xs font-bold text-amber-600 tracking-wider uppercase mt-0.5">
              Hệ Thống Quản Lý Trung Tâm
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form id="main-login-form" onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div
              id="login-error-msg"
              className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center space-x-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span id="login-error-text">{errorMessage}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="screen-login-username"
              className="block text-xs font-extrabold text-[#0d1b2a] mb-1.5 uppercase tracking-wider"
            >
              Tên Đăng Nhập
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
              <input
                id="screen-login-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="screen-login-password"
              className="block text-xs font-extrabold text-[#0d1b2a] mb-1.5 uppercase tracking-wider"
            >
              Mật Khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
              <input
                id="screen-login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
              <button
                type="button"
                id="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-lg"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
              />
              <span className="text-slate-600 font-medium">Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <button
            id="btn-submit-login"
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#070d18] font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 mt-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <span>ĐĂNG NHẬP HỆ THỐNG</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-medium flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Hệ thống bảo mật NS English</span>
        </div>
      </div>
    </div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Employees', path: '/employees', icon: Users },
        { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
            <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
                        HL
                    </div>
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                        HRMS Lite
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={clsx(
                                    'px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300',
                                    isActive(link.path)
                                        ? 'bg-white/10 text-white shadow-inner shadow-white/5'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                )}
                            >
                                <Icon size={18} className={clsx(isActive(link.path) ? 'text-blue-400' : '')} />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 glass-panel rounded-xl p-2 flex flex-col gap-1 md:hidden animate-in slide-in-from-top-2 fade-in duration-200">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    'px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors',
                                    isActive(link.path)
                                        ? 'bg-blue-500/10 text-blue-400'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                )}
                            >
                                <Icon size={20} />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

import { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, Loader2 } from 'lucide-react';
import { getEmployees, getAllAttendance } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        presentToday: 0,
        absentToday: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [employees, attendance] = await Promise.all([
                    getEmployees(),
                    getAllAttendance(new Date().toISOString().split('T')[0])
                ]);

                const presentCount = attendance.filter(a => a.status === 'Present').length;
                const absentCount = attendance.filter(a => a.status === 'Absent').length;

                setStats({
                    totalEmployees: employees.length,
                    presentToday: presentCount,
                    absentToday: absentCount
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats", error);
                toast.error("Failed to load dashboard stats");
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Employees',
            value: stats.totalEmployees,
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-500/10',
            text: 'text-blue-400'
        },
        {
            title: 'Present Today',
            value: stats.presentToday,
            icon: UserCheck,
            color: 'from-emerald-500 to-teal-500',
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-400'
        },
        {
            title: 'Absent Today',
            value: stats.absentToday,
            icon: UserX,
            color: 'from-rose-500 to-pink-500',
            bg: 'bg-rose-500/10',
            text: 'text-rose-400'
        }
    ];

    if (loading) {
        return (
            <div className="pt-32 flex justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="pt-28 px-4 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    Dashboard Overview
                </h1>
                <p className="text-slate-400 mt-2">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="glass-card p-6 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                <Icon size={80} />
                            </div>

                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 font-medium mb-1">{card.title}</p>
                                    <h3 className="text-4xl font-bold text-white tracking-tight">{card.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${card.bg} ${card.text}`}>
                                    <Icon size={28} />
                                </div>
                            </div>

                            <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/employees" className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 transition-colors text-center">
                            <Users className="mx-auto mb-2 text-blue-400" size={24} />
                            <span className="text-sm font-medium">Add Employee</span>
                        </a>
                        <a href="/attendance" className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 transition-colors text-center">
                            <UserCheck className="mx-auto mb-2 text-emerald-400" size={24} />
                            <span className="text-sm font-medium">Mark Attendance</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

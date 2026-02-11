import { useEffect, useState } from 'react';
import { getEmployees, getAllAttendance } from '../services/api';
import { Users, UserCheck, UserX } from 'lucide-react';

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
                const today = new Date().toISOString().split('T')[0];
                const [employeesRes, attendanceRes] = await Promise.all([
                    getEmployees(),
                    getAllAttendance(today)
                ]);

                const totalEmployees = employeesRes.length;
                const presentToday = attendanceRes.filter(a => a.status === 'Present').length;
                // Absent = Total - Present (simplistic approach for 'Lite' version)
                // Or if we want explicit absent records: attendanceRes.filter(a => a.status === 'Absent').length
                // Requirement says "Total absent today". I will interpret as "Not Present".
                const absentToday = totalEmployees - presentToday;

                setStats({
                    totalEmployees,
                    presentToday,
                    absentToday
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Employees', value: stats.totalEmployees, icon: Users, color: 'bg-blue-500' },
        { title: 'Present Today', value: stats.presentToday, icon: UserCheck, color: 'bg-green-500' },
        { title: 'Absent Today', value: stats.absentToday, icon: UserX, color: 'bg-red-500' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`rounded-md p-3 ${card.color}`}>
                                        <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                                        <dd className="text-3xl font-semibold text-gray-900">{card.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

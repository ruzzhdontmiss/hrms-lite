import { useState, useEffect } from 'react';
import { CalendarCheck, Loader2, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { getEmployees, markAttendance, getAllAttendance } from '../services/api';
import toast from 'react-hot-toast';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendanceLog, setAttendanceLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        employeeId: '',
        status: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        fetchAttendance();
    }, [filterDate]);

    const fetchInitialData = async () => {
        try {
            const empData = await getEmployees();
            setEmployees(empData);
            await fetchAttendance();
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load initial data');
            setLoading(false);
        }
    };

    const fetchAttendance = async () => {
        try {
            const data = await getAllAttendance(filterDate);
            setAttendanceLog(data);
        } catch (error) {
            toast.error('Failed to load attendance logs');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Marking attendance...');
        try {
            await markAttendance(formData);
            toast.success('Attendance marked!', { id: toastId });
            fetchAttendance();
            // Reset form but keep date
            setFormData(prev => ({ ...prev, employeeId: '', status: '' }));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to mark attendance', { id: toastId });
        }
    };

    return (
        <div className="pt-28 px-4 max-w-7xl mx-auto pb-12">
            <h1 className="text-3xl font-bold text-white mb-2">Attendance</h1>
            <p className="text-slate-400 mb-8">Track employee presence</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Mark Attendance Form */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-6 rounded-xl sticky top-28">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <CalendarCheck size={20} className="text-emerald-400" /> Mark Attendance
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="glass-input w-full [color-scheme:dark]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Employee</label>
                                <select
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    className="glass-input w-full appearance-none"
                                    required
                                >
                                    <option value="" className="bg-slate-900 text-slate-400">Select Employee</option>
                                    {employees.map(emp => (
                                        <option key={emp.employeeId} value={emp.employeeId} className="bg-slate-900">
                                            {emp.fullName} ({emp.employeeId})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="glass-input w-full appearance-none"
                                    required
                                >
                                    <option value="" className="bg-slate-900 text-slate-400">Select Status</option>
                                    <option value="Present" className="bg-slate-900">Present</option>
                                    <option value="Absent" className="bg-slate-900">Absent</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="primary-btn w-full flex items-center justify-center gap-2 mt-4"
                            >
                                <CalendarCheck size={18} /> Submit
                            </button>
                        </form>
                    </div>
                </div>

                {/* Attendance Log */}
                <div className="lg:col-span-2">
                    <div className="glass-panel rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/30">
                            <h3 className="font-semibold text-white">Daily Logs</h3>
                            <div className="flex items-center gap-2">
                                <Filter size={16} className="text-slate-400" />
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="glass-input py-1 px-3 text-sm [color-scheme:dark]"
                                />
                                {filterDate && (
                                    <button
                                        onClick={() => setFilterDate('')}
                                        className="text-xs text-blue-400 hover:text-blue-300"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
                                Loading logs...
                            </div>
                        ) : attendanceLog.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">
                                No attendance records found for this date.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/5 text-slate-300 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Employee</th>
                                            <th className="p-4 font-medium text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {attendanceLog.map((log) => (
                                            <tr key={log._id} className="table-row-hover text-slate-300 text-sm">
                                                <td className="p-4 text-slate-400">
                                                    {new Date(log.date).toLocaleDateString()}
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-medium text-white">
                                                        {log.employee?.fullName || 'Unknown'}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {log.employee?.employeeId}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${log.status === 'Present'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                        }`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;

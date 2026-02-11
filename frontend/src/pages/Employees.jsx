import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Loader2 } from 'lucide-react';
import { getEmployees, createEmployee, deleteEmployee } from '../services/api';
import toast from 'react-hot-toast';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        employeeId: '',
        fullName: '',
        email: '',
        department: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load employees');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Adding employee...');
        try {
            await createEmployee(formData);
            toast.success('Employee added successfully!', { id: toastId });
            setFormData({ employeeId: '', fullName: '', email: '', department: '' });
            fetchEmployees();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create employee', { id: toastId });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;

        const toastId = toast.loading('Deleting...');
        try {
            await deleteEmployee(id);
            toast.success('Employee deleted', { id: toastId });
            setEmployees(employees.filter(emp => emp._id !== id));
        } catch (error) {
            toast.error('Failed to delete employee', { id: toastId });
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-28 px-4 max-w-7xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Employees</h1>
                    <p className="text-slate-400">Manage your workforce</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Employee Form */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-6 rounded-xl sticky top-28">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-blue-400" /> Add New Employee
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Employee ID</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    className="glass-input w-full"
                                    placeholder="e.g. EMP001"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="glass-input w-full"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="glass-input w-full"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="glass-input w-full"
                                    placeholder="Engineering"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="primary-btn w-full flex items-center justify-center gap-2 mt-4"
                            >
                                <Plus size={18} /> Add Employee
                            </button>
                        </form>
                    </div>
                </div>

                {/* Employee List */}
                <div className="lg:col-span-2">
                    <div className="glass-panel rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-slate-900/30">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search employees..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="glass-input w-full pl-10 bg-slate-900/80 border-slate-700"
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
                                Loading employees...
                            </div>
                        ) : filteredEmployees.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">
                                No employees found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/5 text-slate-300 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-medium">ID</th>
                                            <th className="p-4 font-medium">Name</th>
                                            <th className="p-4 font-medium">Department</th>
                                            <th className="p-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredEmployees.map((emp) => (
                                            <tr key={emp._id} className="table-row-hover text-slate-300 text-sm">
                                                <td className="p-4 font-mono text-blue-400">{emp.employeeId}</td>
                                                <td className="p-4">
                                                    <div>
                                                        <div className="font-medium text-white">{emp.fullName}</div>
                                                        <div className="text-xs text-slate-500">{emp.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                                        {emp.department}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(emp._id)}
                                                        className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                                        title="Delete Employee"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employees;

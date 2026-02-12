import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LayoutGrid,
    Users,
    Upload,
    Trash2,
    Plus,
    Image as ImageIcon,
    Loader2,
    Settings,
    Globe,
    ChevronDown,
    CheckCircle2,
    ArrowUpRight,
    Pencil,
    Moon,
    Sun,
    Mail,
    Table as TableIcon,
    FileText,
    Eye,
    EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import SealandLogo from './Assets/sealand_logo.png';

const API_BASE_URL = 'https://sealand-logistics-github-io.onrender.com/api';

interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    createdAt: string;
}

interface Client {
    _id: string;
    name: string;
    logo: string;
    createdAt: string;
}

interface ContactSubmission {
    _id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    createdAt: string;
}

const LANGUAGES = [
    { code: 'Eng', name: 'English', id: 'en' },
    { code: 'हिन्दी', name: 'Hindi', id: 'hi' },
    { code: 'বাংলা', name: 'Bengali', id: 'bn' },
    { code: '中文', name: 'Chinese', id: 'zh' }
];

const translations: any = {
    en: {
        brand: 'Sealand',
        manager: 'Content Manager',
        ops: 'Global Operations',
        status: 'Server Status',
        connected: 'Connected',
        light: 'Light',
        dark: 'Dark',
        filter: 'Filter',
        clear: 'Clear',
        sections: 'Sections',
        projects: 'Projects',
        clients: 'Clients',
        contacts: 'Submissions',
        category: 'Category',
        specialization: 'Specialization',
        oog: 'OOG Project',
        industry: 'Industry',
        findContent: 'Find Your Content',
        manageSubs: 'Manage Submissions',
        sortBy: 'Short by:',
        recent: 'Most Recent',
        newUpload: 'New Upload',
        verified: 'Verified Client',
        entry: 'Project Entry',
        partner: 'Global Partner',
        update: 'Update',
        addNew: 'Add New',
        project: 'Project',
        client: 'Client',
        identity: 'Identity',
        desc: 'Description',
        classification: 'Classification',
        media: 'Visual Media',
        selectImg: 'Select image',
        confirm: 'Confirm Upload',
        save: 'Save Changes',
        cancel: 'Cancel',
        placeholderTitle: 'Enter title...',
        placeholderName: 'Enter name...',
        placeholderDesc: 'Detail information...',
        loading: 'Loading...',
        exportLabel: 'Export Data',
        excel: 'Excel',
        pdf: 'PDF',
        older: 'Oldest',
        alpha: 'Alphabetical'
    },
    hi: {
        brand: 'सीलैंड',
        manager: 'सामग्री प्रबंधक',
        ops: 'वैश्विक संचालन',
        status: 'सर्वर स्थिति',
        connected: 'जुड़ा हुआ',
        light: 'प्रकाश',
        dark: 'अंधेरा',
        filter: 'फ़िल्टर',
        clear: 'साफ़ करें',
        sections: 'अनुभाग',
        projects: 'परियोजनाएं',
        clients: 'ग्राहक',
        contacts: 'प्रस्तुतियाँ',
        category: 'श्रेणी',
        specialization: 'विशेषज्ञता',
        oog: 'OOG परियोजना',
        industry: 'उद्योग',
        findContent: 'अपनी सामग्री खोजें',
        manageSubs: 'प्रस्तुतियों का प्रबंधन',
        sortBy: 'क्रमबद्ध करें:',
        recent: 'सबसे हालिया',
        newUpload: 'नया अपलोड',
        verified: 'सत्यापित ग्राहक',
        entry: 'परियोजना प्रविष्टि',
        partner: 'वैश्विक भागीदार',
        update: 'अद्यतन करें',
        addNew: 'नया जोड़ें',
        project: 'परियोजना',
        client: 'ग्राहक',
        identity: 'पहचान',
        desc: 'विवरण',
        classification: 'वर्गीकरण',
        media: 'दृश्य मीडिया',
        selectImg: 'छवि चुनें',
        confirm: 'अपलोड की पुष्टि करें',
        save: 'परिवर्तन सहेजें',
        cancel: 'रद्द करें',
        placeholderTitle: 'शीर्षक दर्ज करें...',
        placeholderName: 'नाम दर्ज करें...',
        placeholderDesc: 'विस्तृत जानकारी...',
        loading: 'लोड हो रहा है...',
        exportLabel: 'डेटा निर्यात करें',
        excel: 'एक्सेल',
        pdf: 'पीडीएफ',
        older: 'सबसे पुराना',
        alpha: 'वर्णानुक्रम'
    },
    bn: {
        brand: 'সিল্যান্ড',
        manager: 'কন্টেন্ট ম্যানেজার',
        ops: 'গ্লোবাল অপারেশনস',
        status: 'সার্ভার স্ট্যাটাস',
        connected: 'সংযুক্ত',
        light: 'আলো',
        dark: 'অন্ধকার',
        filter: 'ফিল্টার',
        clear: 'পরিষ্কার করুন',
        sections: 'বিভাগ',
        projects: 'প্রকল্প',
        clients: 'ক্লায়েন্ট',
        contacts: 'জমা',
        category: 'ক্যাটাগরি',
        specialization: 'বিশেষায়িত',
        oog: 'ওওজি প্রকল্প',
        industry: 'শিল্প',
        findContent: 'আপনার কন্টেন্ট খুঁজুন',
        manageSubs: 'জমা পরিচালনা করুন',
        sortBy: 'সাজান:',
        recent: 'সাম্প্রতিক',
        newUpload: 'নতুন আপলোড',
        verified: 'ভেরিফাইড ক্লায়েন্ট',
        entry: 'প্রকল্প এন্ট্রি',
        partner: 'গ্লোবাল পার্টনার',
        update: 'আপডেট করুন',
        addNew: 'নতুন যোগ করুন',
        project: 'প্রকল্প',
        client: 'ক্লায়েন্ট',
        identity: 'পরিচয়',
        desc: 'বর্ণনা',
        classification: 'শ্রেণীবিভাগ',
        media: 'ভিজ্যুয়াল মিডিয়া',
        selectImg: 'ছবি নির্বাচন করুন',
        confirm: 'আপলোড নিশ্চিত করুন',
        save: 'পরিবর্তন সংরক্ষণ করুন',
        cancel: 'বাতিল করুন',
        placeholderTitle: 'শিরোনাম লিখুন...',
        placeholderName: 'নাম লিখুন...',
        placeholderDesc: 'বিস্তারিত তথ্য...',
        loading: 'লোড হচ্ছে...',
        exportLabel: 'ডেটা এক্সপোর্ট',
        excel: 'এক্সেল',
        pdf: 'পিডিএফ',
        older: 'প্রাচীনতম',
        alpha: 'বর্ণানুক্রমিক'
    },
    zh: {
        brand: '希兰德',
        manager: '内容管理员',
        ops: '全球运营',
        status: '服务器状态',
        connected: '已连接',
        light: '浅色',
        dark: '深色',
        filter: '筛选',
        clear: '清除',
        sections: '板块',
        projects: '项目',
        clients: '客户',
        contacts: '提交内容',
        category: '类别',
        specialization: '专业化',
        oog: 'OOG项目',
        industry: '行业',
        findContent: '查找您的内容',
        manageSubs: '管理提交',
        sortBy: '排序方式：',
        recent: '最新',
        newUpload: '新上传',
        verified: '验证客户',
        entry: '项目条目',
        partner: '全球合作伙伴',
        update: '更新',
        addNew: '新增',
        project: '项目',
        client: '客户',
        identity: '身份',
        desc: '描述',
        classification: '分类',
        media: '视觉媒体',
        selectImg: '选择图片',
        confirm: '确认上传',
        save: '保存更改',
        cancel: '取消',
        placeholderTitle: '输入标题...',
        placeholderName: '输入名称...',
        placeholderDesc: '详细信息...',
        loading: '加载中...',
        exportLabel: '导出数据',
        excel: 'Excel',
        pdf: 'PDF',
        older: '最早',
        alpha: '字母顺序'
    }
};

function App() {
    const [activeTab, setActiveTab] = useState<'projects' | 'clients' | 'contacts'>('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
    const [showLangDropdown, setShowLangDropdown] = useState(false);

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || 'null'));
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Form states
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('OOG');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sortType, setSortType] = useState<'recent' | 'older' | 'alpha'>('recent');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    const t = translations[currentLang.id];

    // Axios Interceptor for Auth
    useEffect(() => {
        if (user?.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [projRes, clientRes, contactRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/projects`),
                axios.get(`${API_BASE_URL}/clients`),
                axios.get(`${API_BASE_URL}/contacts`),
            ]);
            setProjects(projRes.data);
            setClients(clientRes.data);
            setContacts(contactRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const openUploadModal = (item: any = null) => {
        if (item) {
            setEditingItem(item);
            setTitle(activeTab === 'projects' ? item.title : item.name);
            setDesc(item.description || '');
            setCategory(item.category || 'Specialization');
        } else {
            setEditingItem(null);
            setTitle('');
            setDesc('');
            setCategory('OOG');
        }
        setSelectedFile(null);
        setShowUploadModal(true);
    };

    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data.url;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;

        try {
            setUploading(true);
            let imageUrl = editingItem?.image || editingItem?.logo;

            if (selectedFile) {
                const uploadedUrl = await handleFileUpload(selectedFile);
                imageUrl = uploadedUrl;
            }

            if (editingItem) {
                if (activeTab === 'projects') {
                    await axios.put(`${API_BASE_URL}/projects/${editingItem._id}`, {
                        title,
                        description: desc,
                        category,
                        image: imageUrl,
                    });
                } else {
                    await axios.put(`${API_BASE_URL}/clients/${editingItem._id}`, {
                        name: title,
                        logo: imageUrl,
                    });
                }
            } else {
                if (!imageUrl) {
                    alert('Please select an image');
                    return;
                }
                if (activeTab === 'projects') {
                    await axios.post(`${API_BASE_URL}/projects`, {
                        title,
                        description: desc,
                        category,
                        image: imageUrl,
                    });
                } else {
                    await axios.post(`${API_BASE_URL}/clients`, {
                        name: title,
                        logo: imageUrl,
                    });
                }
            }

            setShowUploadModal(false);
            fetchData();
        } catch (error) {
            alert('Operation failed');
        } finally {
            setUploading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
                username: loginUsername,
                password: loginPassword,
            });
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            setLoginError('');
        } catch (error: any) {
            setLoginError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setProjects([]);
        setClients([]);
        setContacts([]);
    };

    const handleDelete = async (id: string, type: string) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/${type}/${id}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const exportToExcel = () => {
        const dataToExport = contacts.map(c => ({
            Name: c.name,
            Company: c.company,
            Email: c.email,
            Phone: c.phone,
            Service: c.service,
            Message: c.message,
            Date: new Date(c.createdAt).toLocaleString()
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
        XLSX.writeFile(workbook, "Sealand_Submissions.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF() as any;
        const tableColumn = ["Name", "Company", "Email", "Phone", "Service", "Date"];
        const tableRows: any[] = [];
        contacts.forEach(contact => {
            tableRows.push([
                contact.name,
                contact.company,
                contact.email,
                contact.phone,
                contact.service,
                new Date(contact.createdAt).toLocaleDateString()
            ]);
        });
        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Sealand Logistics - Form Submissions", 14, 15);
        doc.save("Sealand_Submissions.pdf");
    };

    const getSortedData = (data: any[]) => {
        return [...data].sort((a, b) => {
            if (sortType === 'recent') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortType === 'older') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (sortType === 'alpha') {
                const nameA = (a.title || a.name || '').toLowerCase();
                const nameB = (b.title || b.name || '').toLowerCase();
                return nameA.localeCompare(nameB);
            }
            return 0;
        });
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    if (!user) {
        return (
            <div className={`w-full h-screen flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-gray-900'}`}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`w-full max-w-md p-10 rounded-2xl border shadow-2xl transition-colors duration-500 ${isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-gray-100'}`}>
                    <div className="text-center mb-10 flex flex-col items-center">
                        <img src={SealandLogo} alt="Sealand Logo" className="h-16 mb-6 brightness-0 invert shadow-2xl" style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'none' }} />
                        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Admin Portal Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Username</label>
                            <input
                                type="text"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                className={`w-full border rounded-2xl px-6 py-4 outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500' : 'bg-gray-50 border-gray-200 text-black focus:border-orange-500'}`}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div>
                            <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    className={`w-full border rounded-2xl px-6 py-4 outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500' : 'bg-gray-50 border-gray-200 text-black focus:border-orange-500'}`}
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {loginError && (
                            <p className="text-red-500 text-xs text-center font-bold uppercase tracking-wider">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 ${isDarkMode ? 'bg-white text-black hover:bg-orange-600 hover:text-white' : 'bg-black text-white hover:bg-orange-600'}`}
                        >
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Log In'}
                        </button>
                    </form>

                    <div className="mt-8 flex justify-center">
                        <button onClick={toggleTheme} className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                            {isDarkMode ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4 text-orange-600" />}
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`w-full h-screen transition-colors duration-500 font-sans flex flex-col overflow-hidden ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-gray-900'}`}>
            {/* Top Header */}
            <header className={`h-24 px-8 flex items-center justify-between border-b transition-colors duration-500 relative z-50 shrink-0 ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-10">
                    <img
                        src={SealandLogo}
                        alt="Sealand Logo"
                        className="h-12 cursor-pointer transition-all hover:scale-105 active:scale-95"
                        style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'none' }}
                        onClick={() => window.location.reload()}
                    />

                    <nav className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className={`text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.manager} <CheckCircle2 className="w-3 h-3 text-gray-400" /></span>
                            <span className="text-sm font-medium">{t.ops}</span>
                        </div>
                        <div className={`h-8 w-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                        <div className="flex flex-col">
                            <span className={`text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.status} <CheckCircle2 className="w-3 h-3 text-orange-400" /></span>
                            <span className="text-sm font-medium">{t.connected}</span>
                        </div>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <button onClick={() => setShowLangDropdown(!showLangDropdown)} className={`flex items-center gap-2 text-sm transition-colors px-4 py-2 rounded-full border ${isDarkMode ? 'text-gray-400 hover:text-white border-white/10 hover:bg-white/5' : 'text-gray-500 hover:text-black border-gray-200 hover:bg-gray-50'}`}>
                            <Globe className="w-4 h-4" /> {currentLang.code} <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showLangDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {showLangDropdown && (
                                <>
                                    <div className="fixed inset-0" onClick={() => setShowLangDropdown(false)} />
                                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className={`absolute top-full right-0 mt-2 w-40 rounded-2xl p-2 border shadow-2xl transition-colors duration-500 ${isDarkMode ? 'bg-[#111] border-white/10 shadow-black' : 'bg-white border-gray-100 shadow-gray-200'}`}>
                                        {LANGUAGES.map((lang) => (
                                            <button key={lang.code} onClick={() => { setCurrentLang(lang); setShowLangDropdown(false); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentLang.code === lang.code ? 'bg-orange-600 text-white' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-black')}`}>
                                                {lang.name} <span className="text-[10px] opacity-60 float-right mt-1">{lang.code}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <button onClick={toggleTheme} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10' : 'border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {isDarkMode ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4 text-orange-600" />}
                        <span className="text-sm font-medium">{isDarkMode ? t.light : t.dark}</span>
                    </button>
                    <div onClick={handleLogout} className="group relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-red-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-600/20 text-white cursor-pointer hover:scale-110 transition-transform uppercase">
                            {user.username.substring(0, 2)}
                        </div>
                        <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg pointer-events-none uppercase tracking-widest">Logout</div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`w-64 border-r p-8 flex flex-col gap-10 transition-colors duration-500 shrink-0 overflow-y-auto ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-gray-200 bg-white'}`}>
                    <div>
                        <div className="flex items-center justify-between mb-6 text-xl font-bold">{t.filter}</div>
                        <div className="space-y-8">
                            <div>
                                <button className={`flex items-center justify-between w-full text-sm font-bold uppercase tracking-widest mb-4 hover:text-orange-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{t.sections} <ChevronDown className="w-4 h-4" /></button>
                                <div className="space-y-3">
                                    {[
                                        { id: 'projects', label: t.projects },
                                        { id: 'clients', label: t.clients },
                                        { id: 'contacts', label: t.contacts }
                                    ].map((tab) => (
                                        <label key={tab.id} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="radio" checked={activeTab === tab.id} onChange={() => setActiveTab(tab.id as any)} className="hidden" />
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-orange-600 border-orange-600' : 'border-white/20 group-hover:border-white/40'}`}>
                                                {activeTab === tab.id && <CheckCircle2 className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-sm tracking-wide transition-colors ${activeTab === tab.id ? (isDarkMode ? 'text-white font-medium' : 'text-black font-medium') : (isDarkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600')}`}>{tab.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto w-full">
                    <div className="px-6 md:px-12 py-10 w-full min-h-full flex flex-col">
                        <div className="flex items-center justify-between mb-10 shrink-0">
                            <h2 className="text-4xl font-bold tracking-tight">{activeTab === 'contacts' ? t.manageSubs : t.findContent}</h2>
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {t.sortBy} <span onClick={() => setShowSortDropdown(!showSortDropdown)} className={`font-bold cursor-pointer hover:text-orange-500 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>{t[sortType]} <ChevronDown className={`inline w-3 h-3 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} /></span>
                                    </span>
                                    <AnimatePresence>
                                        {showSortDropdown && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                                                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className={`absolute top-full right-0 mt-2 w-48 rounded-2xl p-2 border shadow-2xl z-50 transition-colors duration-500 ${isDarkMode ? 'bg-[#111] border-white/10 shadow-black' : 'bg-white border-gray-100 shadow-gray-200'}`}>
                                                    {[
                                                        { id: 'recent', label: t.recent },
                                                        { id: 'older', label: t.older },
                                                        { id: 'alpha', label: t.alpha }
                                                    ].map((opt) => (
                                                        <button key={opt.id} onClick={() => { setSortType(opt.id as any); setShowSortDropdown(false); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${sortType === opt.id ? 'bg-orange-600 text-white' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-black')}`}>
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {activeTab === 'contacts' ? (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 mr-2">{t.exportLabel}:</span>
                                        <button onClick={exportToExcel} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-green-600/20 hover:border-green-600 text-green-500' : 'bg-white border-gray-200 hover:bg-green-50 hover:border-green-600 text-green-700'}`}><TableIcon className="w-4 h-4" /> {t.excel}</button>
                                        <button onClick={exportToPDF} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-red-600/20 hover:border-red-600 text-red-500' : 'bg-white border-gray-200 hover:bg-red-50 hover:border-red-600 text-red-700'}`}><FileText className="w-4 h-4" /> {t.pdf}</button>
                                    </div>
                                ) : (
                                    <button onClick={() => openUploadModal()} className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl active:scale-95 transition-all ${isDarkMode ? 'bg-white text-black hover:bg-orange-600 hover:text-white' : 'bg-black text-white hover:bg-orange-600'}`}><Plus className="w-5 h-5" /> {t.newUpload}</button>
                                )}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center min-h-[400px]"><Loader2 className={`w-12 h-12 animate-spin ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} /></div>
                            ) : activeTab === 'contacts' ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 w-full">
                                    <div className={`w-full overflow-x-auto rounded-xl border shadow-2xl transition-colors duration-500 ${isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-gray-100'}`}>
                                        <table className="w-full text-left border-collapse min-w-full">
                                            <thead className={`text-[10px] uppercase tracking-widest font-bold border-b ${isDarkMode ? 'border-white/5 text-gray-500' : 'border-gray-100 text-gray-400'}`}>
                                                <tr>
                                                    <th className="px-8 py-6">Name</th>
                                                    <th className="px-8 py-6">Info</th>
                                                    <th className="px-8 py-6">Service</th>
                                                    <th className="px-8 py-6">Message</th>
                                                    <th className="px-8 py-6">Date</th>
                                                    <th className="px-8 py-6 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className={`divide-y transition-colors duration-500 ${isDarkMode ? 'divide-white/5' : 'divide-gray-50'}`}>
                                                {getSortedData(contacts).map((contact) => (
                                                    <tr key={contact._id} className={`group hover:bg-orange-500/5 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        <td className="px-8 py-6">
                                                            <div className={`font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-orange-500' : 'text-black'}`}>{contact.name}</div>
                                                            <div className="text-[11px] text-gray-500 mt-0.5">{contact.company}</div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="text-xs font-medium">{contact.email}</div>
                                                            <div className="text-[11px] text-gray-500 mt-0.5">{contact.phone}</div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="px-3 py-1 bg-orange-600/10 text-orange-500 rounded-full text-[10px] font-bold uppercase tracking-wider">{contact.service}</span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <p className="text-sm leading-relaxed max-w-md line-clamp-2 group-hover:line-clamp-none transition-all">{contact.message}</p>
                                                        </td>
                                                        <td className="px-8 py-6 text-[11px] text-gray-500 font-medium">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                                        <td className="px-8 py-6 text-right">
                                                            <button onClick={() => handleDelete(contact._id, 'contacts')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'text-gray-500 hover:bg-red-600 hover:text-white' : 'text-gray-400 hover:bg-red-50 hover:text-red-600'}`}><Trash2 className="w-4 h-4" /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
                                    {getSortedData(activeTab === 'projects' ? projects : clients).map((item: any) => (
                                        <div key={item._id} className={`rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500 relative ${isDarkMode ? 'bg-[#151515] hover:shadow-white/5' : 'bg-white border border-gray-100 shadow-sm'}`}>
                                            <div className="aspect-[4/3] bg-white relative overflow-hidden">
                                                <img src={activeTab === 'projects' ? item.image : item.logo} alt={item.title || item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                <div className="absolute top-6 right-6 flex gap-3">
                                                    <button onClick={() => openUploadModal(item)} className="w-10 h-10 bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-600 shadow-lg"><Pencil className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete(item._id, activeTab as any)} className="w-10 h-10 bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                            <div className="p-8 relative">
                                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-3"><CheckCircle2 className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`} /> {activeTab === 'projects' ? item.category : t.verified}</div>
                                                <h3 className={`text-xl font-bold truncate mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{activeTab === 'projects' ? item.title : item.name}</h3>
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{activeTab === 'projects' ? (item.description || t.entry) : t.partner}</p>
                                                <div className="absolute bottom-8 right-8 w-14 h-14 bg-black rounded-2xl flex items-center justify-center transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl border border-white/10"><ArrowUpRight className="w-7 h-7 text-white" /></div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowUploadModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 relative z-10 border shadow-2xl transition-all duration-300 ${isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-gray-100'}`}
                        >
                            <h3 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {editingItem ? t.update : t.addNew} {activeTab === 'projects' ? t.project : t.client}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {t.identity}
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className={`w-full border rounded-2xl px-5 py-3.5 outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500 focus:bg-white/10' : 'bg-gray-50 border-gray-200 text-black focus:border-orange-500 focus:bg-white'}`}
                                        placeholder={activeTab === 'projects' ? t.placeholderTitle : t.placeholderName}
                                        required
                                    />
                                </div>
                                {activeTab === 'projects' && (
                                    <div className="space-y-4 md:space-y-6">
                                        <div>
                                            <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {t.desc}
                                            </label>
                                            <textarea
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                                className={`w-full border rounded-2xl px-5 py-3.5 outline-none transition-all h-24 md:h-32 resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500 focus:bg-white/10' : 'bg-gray-50 border-gray-200 text-black focus:border-orange-500 focus:bg-white'}`}
                                                placeholder={t.placeholderDesc}
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {t.classification}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    className={`w-full border rounded-2xl px-5 py-3.5 outline-none transition-all appearance-none pr-12 ${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}
                                                >
                                                    <option value="OOG" className={isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}>{t.oog}</option>
                                                    <option value="Industry" className={isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}>{t.industry}</option>
                                                </select>
                                                <ChevronDown className={`absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {t.media}
                                    </label>
                                    <label className={`flex items-center gap-4 border p-4 md:p-5 rounded-2xl border-dashed cursor-pointer transition-all ${isDarkMode ? 'border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5' : 'border-gray-200 hover:border-orange-500/30 hover:bg-orange-500/5'}`}>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                            <Upload className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <span className={`text-sm font-bold block truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedFile ? selectedFile.name : t.selectImg}</span>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-0.5 block">PNG, JPG, WEBP</span>
                                        </div>
                                        <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} accept="image/*" />
                                    </label>
                                </div>
                                <div className="pt-4 flex flex-col sm:flex-row gap-3 md:gap-4">
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className={`flex-1 font-bold py-3.5 md:py-4 rounded-2xl transition-all text-base shadow-xl active:scale-95 disabled:opacity-50 ${isDarkMode ? 'bg-white text-black hover:bg-orange-600 hover:text-white' : 'bg-black text-white hover:bg-orange-600'}`}
                                    >
                                        {uploading ? <Loader2 className="animate-spin mx-auto text-black" /> : (editingItem ? t.save : t.confirm)}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadModal(false)}
                                        className={`px-8 font-bold py-3.5 md:py-4 rounded-2xl transition-all text-base ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {t.cancel}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;

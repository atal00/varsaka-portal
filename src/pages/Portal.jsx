import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { supabase } from '../supabaseClient';
import './Portal.css';

const ALL_COUNTRIES = [
  { name: 'Afghanistan', code: '+93', flag: '🇦🇫' }, { name: 'Albania', code: '+355', flag: '🇦🇱' }, { name: 'Algeria', code: '+213', flag: '🇩🇿' },
  { name: 'Andorra', code: '+376', flag: '🇦🇩' }, { name: 'Angola', code: '+244', flag: '🇦🇴' }, { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Armenia', code: '+374', flag: '🇦🇲' }, { name: 'Australia', code: '+61', flag: '🇦🇺' }, { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Azerbaijan', code: '+994', flag: '🇦🇿' }, { name: 'Bahamas', code: '+1', flag: '🇧🇸' }, { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' }, { name: 'Barbados', code: '+1', flag: '🇧🇧' }, { name: 'Belarus', code: '+375', flag: '🇧🇾' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' }, { name: 'Belize', code: '+501', flag: '🇧🇿' }, { name: 'Benin', code: '+229', flag: '🇧🇯' },
  { name: 'Bhutan', code: '+975', flag: '🇧🇹' }, { name: 'Bolivia', code: '+591', flag: '🇧🇴' }, { name: 'Bosnia', code: '+387', flag: '🇧🇦' },
  { name: 'Botswana', code: '+267', flag: '🇧🇼' }, { name: 'Brazil', code: '+55', flag: '🇧🇷' }, { name: 'Brunei', code: '+673', flag: '🇧🇳' },
  { name: 'Bulgaria', code: '+359', flag: '🇧🇬' }, { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' }, { name: 'Burundi', code: '+257', flag: '🇧🇮' },
  { name: 'Cambodia', code: '+855', flag: '🇰🇭' }, { name: 'Cameroon', code: '+237', flag: '🇨🇲' }, { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Cape Verde', code: '+238', flag: '🇨🇻' }, { name: 'Central African Republic', code: '+236', flag: '🇨🇫' }, { name: 'Chad', code: '+235', flag: '🇹🇩' },
  { name: 'Chile', code: '+56', flag: '🇨🇱' }, { name: 'China', code: '+86', flag: '🇨🇳' }, { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Comoros', code: '+269', flag: '🇰🇲' }, { name: 'Congo', code: '+242', flag: '🇨🇬' }, { name: 'Costa Rica', code: '+506', flag: '🇨🇷' },
  { name: 'Croatia', code: '+385', flag: '🇭🇷' }, { name: 'Cuba', code: '+53', flag: '🇨🇺' }, { name: 'Cyprus', code: '+357', flag: '🇨🇾' },
  { name: 'Czech Republic', code: '+420', flag: '🇨🇿' }, { name: 'Denmark', code: '+45', flag: '🇩🇰' }, { name: 'Djibouti', code: '+253', flag: '🇩🇯' },
  { name: 'Dominica', code: '+1', flag: '🇩🇲' }, { name: 'Dominican Republic', code: '+1', flag: '🇩🇴' }, { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' }, { name: 'El Salvador', code: '+503', flag: '🇸🇻' }, { name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶' },
  { name: 'Eritrea', code: '+291', flag: '🇪🇷' }, { name: 'Estonia', code: '+372', flag: '🇪🇪' }, { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
  { name: 'Fiji', code: '+679', flag: '🇫🇯' }, { name: 'Finland', code: '+358', flag: '🇫🇮' }, { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Gabon', code: '+241', flag: '🇬🇦' }, { name: 'Gambia', code: '+220', flag: '🇬🇲' }, { name: 'Georgia', code: '+995', flag: '🇬🇪' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' }, { name: 'Ghana', code: '+233', flag: '🇬🇭' }, { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'Grenada', code: '+1', flag: '🇬🇩' }, { name: 'Guatemala', code: '+502', flag: '🇬🇹' }, { name: 'Guinea', code: '+224', flag: '🇬🇳' },
  { name: 'Guyana', code: '+592', flag: '🇬🇾' }, { name: 'Haiti', code: '+509', flag: '🇭🇹' }, { name: 'Honduras', code: '+504', flag: '🇭🇳' },
  { name: 'Hong Kong', code: '+852', flag: '🇭🇰' }, { name: 'Hungary', code: '+36', flag: '🇭🇺' }, { name: 'Iceland', code: '+354', flag: '🇮🇸' },
  { name: 'India', code: '+91', flag: '🇮🇳' }, { name: 'Indonesia', code: '+62', flag: '🇮🇩' }, { name: 'Iran', code: '+98', flag: '🇮🇷' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶' }, { name: 'Ireland', code: '+353', flag: '🇮🇪' }, { name: 'Israel', code: '+972', flag: '🇮🇱' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' }, { name: 'Jamaica', code: '+1', flag: '🇯🇲' }, { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' }, { name: 'Kazakhstan', code: '+7', flag: '🇰🇿' }, { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Kiribati', code: '+686', flag: '🇰🇮' }, { name: 'Kuwait', code: '+965', flag: '🇰🇼' }, { name: 'Kyrgyzstan', code: '+996', flag: '🇰🇬' },
  { name: 'Laos', code: '+856', flag: '🇱🇦' }, { name: 'Latvia', code: '+371', flag: '🇱🇻' }, { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name: 'Lesotho', code: '+266', flag: '🇱🇸' }, { name: 'Liberia', code: '+231', flag: '🇱🇷' }, { name: 'Libya', code: '+218', flag: '🇱🇾' },
  { name: 'Liechtenstein', code: '+423', flag: '🇱🇮' }, { name: 'Lithuania', code: '+370', flag: '🇱🇹' }, { name: 'Luxembourg', code: '+352', flag: '🇱🇺' },
  { name: 'Macao', code: '+853', flag: '🇲🇴' }, { name: 'Macedonia', code: '+389', flag: '🇲🇰' }, { name: 'Madagascar', code: '+261', flag: '🇲🇬' },
  { name: 'Malawi', code: '+265', flag: '🇲🇼' }, { name: 'Malaysia', code: '+60', flag: '🇲🇾' }, { name: 'Maldives', code: '+960', flag: '🇲🇻' },
  { name: 'Mali', code: '+223', flag: '🇲🇱' }, { name: 'Malta', code: '+356', flag: '🇲🇹' }, { name: 'Mauritania', code: '+222', flag: '🇲🇷' },
  { name: 'Mauritius', code: '+230', flag: '🇲🇺' }, { name: 'Mexico', code: '+52', flag: '🇲🇽' }, { name: 'Moldova', code: '+373', flag: '🇲🇩' },
  { name: 'Monaco', code: '+377', flag: '🇲🇨' }, { name: 'Mongolia', code: '+976', flag: '🇲🇳' }, { name: 'Montenegro', code: '+382', flag: '🇲🇪' },
  { name: 'Morocco', code: '+212', flag: '🇲🇦' }, { name: 'Mozambique', code: '+258', flag: '🇲🇿' }, { name: 'Myanmar', code: '+95', flag: '🇲🇲' },
  { name: 'Namibia', code: '+264', flag: '🇳🇦' }, { name: 'Nepal', code: '+977', flag: '🇳🇵' }, { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' }, { name: 'Nicaragua', code: '+505', flag: '🇳🇮' }, { name: 'Niger', code: '+227', flag: '🇳🇪' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' }, { name: 'Norway', code: '+47', flag: '🇳🇴' }, { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' }, { name: 'Panama', code: '+507', flag: '🇵🇦' }, { name: 'Paraguay', code: '+595', flag: '🇵🇾' },
  { name: 'Peru', code: '+51', flag: '🇵🇪' }, { name: 'Philippines', code: '+63', flag: '🇵🇭' }, { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' }, { name: 'Qatar', code: '+974', flag: '🇶🇦' }, { name: 'Romania', code: '+40', flag: '🇷🇴' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' }, { name: 'Rwanda', code: '+250', flag: '🇷🇼' }, { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Senegal', code: '+221', flag: '🇸🇳' }, { name: 'Serbia', code: '+381', flag: '🇷🇸' }, { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Slovakia', code: '+421', flag: '🇸🇰' }, { name: 'Slovenia', code: '+386', flag: '🇸🇮' }, { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' }, { name: 'Spain', code: '+34', flag: '🇪🇸' }, { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Sudan', code: '+249', flag: '🇸🇩' }, { name: 'Sweden', code: '+46', flag: '🇸🇪' }, { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Taiwan', code: '+886', flag: '🇹🇼' }, { name: 'Tanzania', code: '+255', flag: '🇹🇿' }, { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Tunisia', code: '+216', flag: '🇹🇳' }, { name: 'Turkey', code: '+90', flag: '🇹🇷' }, { name: 'Uganda', code: '+256', flag: '🇺🇬' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦' }, { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' }, { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: '+1', flag: '🇺🇸' }, { name: 'Uruguay', code: '+598', flag: '🇺🇾' }, { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
  { name: 'Venezuela', code: '+58', flag: '🇻🇪' }, { name: 'Vietnam', code: '+84', flag: '🇻🇳' }, { name: 'Yemen', code: '+967', flag: '🇾🇪' },
  { name: 'Zambia', code: '+260', flag: '🇿🇲' }, { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' }
];

export default function Portal() {
  const [session, setSession] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showTeam, setShowTeam] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [inviteData, setInviteData] = useState({ email: '', name: '' });
  const [inviting, setInviting] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const [infoIcon, setInfoIcon] = useState({ url: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f6e1_fe0f/512.gif', fallback: '🛡️' });

  const INFO_ICONS = [
    { url: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f6e1_fe0f/512.gif', fallback: '🛡️' },
    { url: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f512/512.gif',      fallback: '🔒' },
    { url: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f511/512.gif',      fallback: '🔑' },
    { url: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f4a1/512.gif',      fallback: '💡' },
    { url: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif',      fallback: '🚀' },
    { url: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f4cc/512.gif',      fallback: '📌' }
  ];

  const triggerInfo = (msg) => {
    if (showInfoModal) return; // 🛡️ Prevent rapid-fire clicks/Enter key spam
    setInfoMsg(msg);
    const iconObj = INFO_ICONS[Math.floor(Math.random() * INFO_ICONS.length)];
    setInfoIcon(iconObj);
    setShowInfoModal(true);
  };

  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState({ 
    name: '', email: '', phone: '', countryCode: '+91', service: 'Functional Testing', msg: '' 
  });
  const [addingLead, setAddingLead] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryList, setShowCountryList] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileStats, setShowMobileStats] = useState(false);

  // Celebration System
  const [celebration, setCelebration] = useState(null);
  const congratsMessages = [
    "🚀 Boom! Admin just approved your lead! Let's crush it!",
    "✅ Great job! Your submission has been given the green light!",
    "🌟 Outstanding! Admin loved your lead and it's now live!",
    "💪 Success! Another project added to your list. Keep it up!",
    "🔥 You're on fire! Your latest lead was just approved!"
  ];
  const assignmentMessages = [
    "💼 New Task Alert! Admin has picked you for a new project. Let's go!",
    "🎯 You've been chosen! A new lead is waiting for your expertise.",
    "🚀 Ready for a new challenge? You've just been assigned a task!",
    "🌟 Congratulations! Admin has entrusted you with this new inquiry.",
    "📈 Fresh Assignment! A new project is now under your care."
  ];

  // Modal States for new features
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const s = sessionStorage.getItem('varsaka_user');
      if (!s) {
        navigate('/login');
        return;
      }

      const sessionUser = JSON.parse(s);

      // 🛡️ SECURITY FIX 1: Cryptographic Session Validation
      // Do not trust sessionStorage blindly. Verify with Supabase backend.
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.error("Auth validation failed:", error);
        sessionStorage.removeItem('varsaka_user');
        navigate('/login');
        return;
      }

      // 🛡️ SECURITY FIX 2: Privilege Escalation Prevention
      // Check if user spoofed their role in sessionStorage
      const realRole = user.user_metadata?.role || 'employee';
      if (sessionUser.role === 'admin' && realRole !== 'admin') {
        console.warn("SECURITY ALERT: Privilege escalation attempt blocked.");
        sessionStorage.removeItem('varsaka_user');
        navigate('/login');
        return;
      }

      setSession(sessionUser);
      // Wait for session state to update before fetching data
    };

    validateSession();
  }, [navigate]);

  // Fetch data only after session is validated and set
  useEffect(() => {
    if (session) {
      fetchData();
      fetchStaff();
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
    }
  }, [session]);

  // 🔔 Post-Login Notification
  useEffect(() => {
    if (session && !sessionStorage.getItem('notified_refresh')) {
      triggerInfo('Welcome back! Kindly refresh from the top button to see the latest leads.');
      sessionStorage.setItem('notified_refresh', 'true');
    }
  }, [session]);

  // 🧹 BACKGROUND CLEANUP: Auto-delete rejected leads after 60 mins
  useEffect(() => {
    const cleanup = async () => {
      const now = new Date();
      const sixtyMinsAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
      
      const { data: expired } = await supabase
        .from('leads')
        .select('id')
        .eq('status', 'rejected')
        .lt('rejected_at', sixtyMinsAgo);

      if (expired && expired.length > 0) {
        const ids = expired.map(e => e.id);
        await supabase.from('leads').delete().in('id', ids);
        fetchData();
      }
    };

    const timer = setInterval(cleanup, 60000); // Check every minute
    return () => clearInterval(timer);
  }, [data]);

  // ⌨️ Modal Accessibility: Focus the button when modal opens
  useEffect(() => {
    if (showInfoModal) {
      setTimeout(() => {
        const btn = document.getElementById('btn-info-close');
        if (btn) btn.focus();
      }, 50);
    }
  }, [showInfoModal]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 🛡️ SECURITY FIX 3: Network Data Minimization
      // Prevent data leakage over network by strictly querying only assigned leads for employees
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
      
      if (session.role === 'employee') {
        query = query.eq('assigned_to', session.id);
      }
      
      const { data: leads, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;

      setData(leads.map(l => ({
        id: l.id,
        time: new Date(l.created_at).toLocaleString(),
        name: l.name,
        email: l.email,
        phone: l.phone,
        service: l.service,
        msg: l.message,
        notes: l.notes || '',
        status: l.status || 'new',
        assigned_to: l.assigned_to,
        rejected_at: l.rejected_at,
        approval_seen: l.approval_seen,
        source: l.source || 'Unknown' // 👈 Map source
      })));

        // 🎊 Celebration Check (Only for Employee)
      if (session.role === 'employee') {
        // 1. Check for newly approved leads
        const newlyApproved = leads.find(l => 
          l.assigned_to === session.id && 
          l.status === 'new' && 
          !localStorage.getItem(`celebrated_${l.id}`)
        );

        if (newlyApproved) {
          const msg = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
          setCelebration({ name: newlyApproved.name, message: msg, type: 'approval' });
          localStorage.setItem(`celebrated_${newlyApproved.id}`, 'true');
        } 
        // 2. Or check for newly assigned leads (if not already approved/celebrated)
        else {
          const newlyAssigned = leads.find(l => 
            l.assigned_to === session.id && 
            l.status !== 'rejected' &&
            l.status !== 'approval_pending' && // 🛡️ Fix: Don't celebrate yet!
            !localStorage.getItem(`assigned_notified_${l.id}`)
          );

          if (newlyAssigned) {
            const msg = assignmentMessages[Math.floor(Math.random() * assignmentMessages.length)];
            setCelebration({ name: newlyAssigned.name, message: msg, type: 'assignment' });
            localStorage.setItem(`assigned_notified_${newlyAssigned.id}`, 'true');
          }
        }
      }
    } catch (e) {
      console.error('Portal Data Error:', e);
      setError(e.message);
    }
    setLoading(false);
  };

  const fetchStaff = async () => {
    try {
      const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
      if (pError) throw pError;
      setStaffList(profiles.map(p => ({ id: p.id, name: p.full_name, email: p.email })));
    } catch (e) {
      console.error('Staff Fetch Error:', e);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('varsaka_user');
    sessionStorage.removeItem('notified_refresh'); // 🔄 Clear flag on logout
    navigate('/login');
  };

  const assignTask = async (leadId, staffId) => {
    const { error: updateError } = await supabase
      .from('leads')
      .update({ assigned_to: staffId || null })
      .eq('id', leadId);

    if (updateError) {
      triggerInfo('Failed to assign task: ' + updateError.message);
    } else fetchData();
  };

  const inviteStaff = (e) => {
    e.preventDefault();
    triggerInfo('Kindly connect with your super admin to add or delete any employee.');
  };

  const updateStaffName = async (sid, newName) => {
    if (!newName) return;
    await supabase.from('profiles').update({ full_name: newName }).eq('id', sid);
    fetchStaff();
  };

  const removeStaff = (sid) => {
    if (sid === session.id) return triggerInfo('You cannot delete yourself!');
    triggerInfo('Kindly connect with your super admin to add or delete any employee.');
  };

  const updateStatus = async (id, val) => {
    const { error: updateError } = await supabase.from('leads').update({ status: val }).eq('id', id);
    if (updateError) {
      triggerInfo('Failed to update status: ' + updateError.message);
    } else fetchData();
  };

  const updateNoteLocally = (id, text) => {
    setData(prev => prev.map(r => r.id === id ? { ...r, notes: text } : r));
  };

  const saveNoteToDB = async (id, text) => {
    const { error: updateError } = await supabase.from('leads').update({ notes: text }).eq('id', id);
    if (updateError) console.error('Auto-save failed:', updateError.message);
  };

  const deleteRow = (id) => {
    if (session?.role !== 'admin') return;
    const targetRow = data.find(r => r.id === id);
    if (!targetRow) return;
    setDeleteTarget(targetRow);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, email } = deleteTarget;
    
    const { error: deleteError } = await supabase.from('leads').delete().eq('id', id);
    
    if (deleteError) {
      triggerInfo('Failed to delete from DB: ' + deleteError.message);
    } else {
      // --- GOOGLE SHEET SYNC (DELETE) ---
      const gsUrl = import.meta.env.VITE_GS_SYNC_URL;
      if (gsUrl) {
        fetch(gsUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ action: 'delete', email: email })
        }).catch(err => console.error('GS Sync Error:', err));
      }
      setShowDeleteModal(false);
      fetchData();
    }
  };

  const addLead = async (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) {
      return triggerInfo('Please enter Name and Email');
    }
    
    setAddingLead(true);
    try {
      const isStaff = session.role === 'employee';
      const { error: insError } = await supabase.from('leads').insert([{
        name: newLead.name,
        email: newLead.email,
        phone: `${newLead.countryCode} ${newLead.phone}`,
        service: newLead.service,
        message: newLead.msg,
        status: isStaff ? 'approval_pending' : 'new',
        assigned_to: isStaff ? session.id : null,
        source: session.name || 'Direct Admin' // 👤 Employee/Admin Tag
      }]);

      if (insError) throw insError;

      triggerInfo(isStaff ? 'Lead submitted for Admin approval!' : 'Lead added successfully!');
      
      // 🛡️ GATED APPROVAL: Only sync to GS if Admin is adding it directly.
      // Employee leads wait for Admin Approval.
      const gsUrl = import.meta.env.VITE_GS_SYNC_URL;
      if (!isStaff && gsUrl) {
        fetch(gsUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ 
            action: 'add', 
            ...newLead,
            phone: `'${newLead.countryCode} ${newLead.phone}` // 🛠️ Fix: Add ' to prevent GS formula error
          })
        }).catch(err => console.error('GS Sync Error:', err));
      }
      
      setNewLead({ name: '', email: '', phone: '', countryCode: '+91', service: 'Functional Testing', msg: '' });
      setShowAddLead(false);
      fetchData();
    } catch (err) {
      triggerInfo('Error: ' + err.message);
    }
    setAddingLead(false);
  };

  const approveLead = async (lead) => {
    const { error } = await supabase.from('leads').update({ status: 'new' }).eq('id', lead.id);
    
    const gsUrl = import.meta.env.VITE_GS_SYNC_URL;
    if (!error && gsUrl) {
      // 🚀 SYNC TO GOOGLE SHEETS ONLY ON APPROVAL
      fetch(gsUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ 
          action: 'add', 
          name: lead.name,
          email: lead.email,
          phone: `'${lead.phone}`, // 🛠️ Fix: Add ' to prevent GS formula error
          service: lead.service,
          msg: lead.msg 
        })
      }).catch(err => console.error('GS Sync Error:', err));
    }
    
    fetchData();
  };

  const exportToCSV = () => {
    if (data.length === 0) {
      return triggerInfo('No data to export!');
    }
    
    const headers = ['Time', 'Client Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Notes'];
    const rows = data.map(r => [
      `"${r.time}"`,
      `"${r.name}"`,
      `"${r.email}"`,
      `"${r.phone || ''}"`,
      `"${r.service}"`,
      `"${r.msg.replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${r.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Varsaka_Leads_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rejectLead = async () => {
    if (!rejectReason.trim()) return;
    await supabase.from('leads').update({ 
      status: 'rejected',
      notes: `🚫 REJECTED: ${rejectReason}`,
      rejected_at: new Date().toISOString() // ⏱️ Start countdown
    }).eq('id', rejectId);
    setShowRejectModal(false);
    setRejectReason('');
    fetchData();
  };

  // 📈 Stats Calculation
  const stats = (() => {
    const relevant = data.filter(r => session.role === 'admin' || r.assigned_to === session.id);
    return {
      total: relevant.length,
      new: relevant.filter(r => r.status === 'new').length,
      ongoing: relevant.filter(r => r.status === 'ongoing').length,
      completed: relevant.filter(r => r.status === 'completed').length,
      needsReview: relevant.filter(r => r.status === 'approval_pending').length
    };
  })();

  // 🔍 Filtering Logic
  const filteredData = data.filter(r => {
    if (session.role === 'employee' && r.assigned_to !== session.id) return false;
    if (filter !== 'all' && r.status !== filter) return false;
    const s = search.toLowerCase();
    return r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s) || r.msg.toLowerCase().includes(s);
  });

  if (!session) return null;

  return (
    <div className="portal-page">
      <header className="portal-header">
        <div className="portal-brand">
          <div className="brand-logo-stack" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <img src={logo} className="portal-logo" alt="Varsaka Labs" />
            <h1>Varsaka Labs</h1>
          </div>
        </div>
        <span className={`role-badge ${session.role} header-center`}>{session.name}</span>
        <div className="portal-mobile-toggle">
          <button className="btn-hamburger" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>

        <div className={`portal-actions ${showMobileMenu ? 'mobile-open' : ''}`}>
          <button className="btn-settings" style={{background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe'}} onClick={() => { setShowAddLead(!showAddLead); setShowMobileMenu(false); }}>
            {showAddLead ? '✕ Close' : '➕ Add Lead'}
          </button>
          {session.role === 'admin' && (
            <button className="btn-settings" onClick={() => { setShowTeam(!showTeam); setShowMobileMenu(false); }}>
              {showTeam ? '📋 Show Leads' : '👥 Team Workload'}
            </button>
          )}
          {session.role === 'admin' && (
            <button className="btn-refresh" onClick={() => { exportToCSV(); setShowMobileMenu(false); }} style={{background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0'}}>
              📥 Export Data
            </button>
          )}
          <button className="btn-refresh" onClick={() => { fetchData(); setShowMobileMenu(false); }} disabled={loading}>↻ {loading ? '...' : 'Refresh'}</button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="portal-container">
        {showAddLead && (
          <div className="portal-settings-panel fade-in visible" style={{borderColor: '#2563eb'}}>
            <h3>➕ Add New Lead</h3>
            <form className="add-lead-form" onSubmit={addLead}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Client Name</label>
                  <input type="text" placeholder="Full Name" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="email@example.com" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div style={{display:'flex', gap:'5px', position:'relative'}}>
                    <div 
                      className="country-picker-trigger"
                      style={{
                        width:'100px', padding:'0.5rem', borderRadius:'8px', border:'1px solid #e2e8f0', 
                        background:'white', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center',
                        fontSize: '0.85rem', fontWeight: '600'
                      }}
                      onClick={() => setShowCountryList(!showCountryList)}
                    >
                      <span>{newLead.countryCode}</span>
                      <span>▾</span>
                    </div>

                    {showCountryList && (
                      <div className="country-dropdown-list" style={{
                        position:'absolute', top:'100%', left:0, width:'250px', maxHeight:'300px', 
                        overflowY:'auto', background:'white', border:'1px solid #e2e8f0', 
                        borderRadius:'12px', boxShadow:'0 10px 25px rgba(0,0,0,0.1)', zIndex:1000, marginTop:'5px'
                      }}>
                        <input 
                          type="text" 
                          placeholder="Search country..." 
                          style={{width:'100%', padding:'10px', border:'none', borderBottom:'1px solid #f1f5f9', position:'sticky', top:0, background:'white'}}
                          value={countrySearch}
                          onChange={e => setCountrySearch(e.target.value)}
                          autoFocus
                          onClick={e => e.stopPropagation()}
                        />
                        {ALL_COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).map(c => (
                          <div 
                            key={c.name}
                            style={{padding:'12px', cursor:'pointer', fontSize:'0.85rem', borderBottom:'1px solid #f8fafc', display:'flex', gap:'10px'}}
                            onClick={() => {
                              setNewLead({...newLead, countryCode: c.code});
                              setShowCountryList(false);
                              setCountrySearch('');
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <span>{c.flag}</span>
                            <strong>{c.code}</strong> 
                            <span style={{color:'#64748b'}}>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <input 
                      style={{flex:1}}
                      type="tel" 
                      placeholder="00000 00000" 
                      value={newLead.phone} 
                      onChange={e => setNewLead({...newLead, phone: e.target.value.replace(/\D/g, '')})} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <select value={newLead.service} onChange={e => setNewLead({...newLead, service: e.target.value})}>
                    <option>Functional Testing</option>
                    <option>Automation Testing</option>
                    <option>Performance Testing</option>
                    <option>Security Testing</option>
                    <option>Development</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Project Message</label>
                  <textarea placeholder="Tell us about the project..." value={newLead.msg} onChange={e => setNewLead({...newLead, msg: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn-save" style={{marginTop:'1rem'}} disabled={addingLead}>
                {addingLead ? 'Processing...' : (session.role === 'admin' ? 'Create Lead →' : 'Submit for Approval →')}
              </button>
            </form>
          </div>
        )}
        {showTeam && session.role === 'admin' && (
          <div className="portal-settings-panel fade-in visible">
            <h3>Team Management</h3>
            <div className="workload-grid">
              {staffList.map(s => {
                const sLeads = data.filter(r => r.assigned_to === s.id);
                return (
                  <div key={s.id} className="staff-stat-card">
                    <div className="staff-header">
                      <div className="staff-info">
                        <input className="staff-name-edit" value={s.name} onChange={e => {
                          setStaffList(prev => prev.map(item => item.id === s.id ? { ...item, name: e.target.value } : item));
                        }} onBlur={e => updateStaffName(s.id, e.target.value)} />
                        <div className="staff-meta"><div className="meta-item">🆔 {s.id.slice(0,8)}...</div></div>
                      </div>
                      <button className="btn-del-staff" onClick={() => removeStaff(s.id)}>✕</button>
                    </div>
                    <div className="work-counts">
                      <div className="count-pill new">🔵 {sLeads.filter(r => r.status === 'new').length} Pending</div>
                      <div className="count-pill ongoing">🟠 {sLeads.filter(r => r.status === 'ongoing').length} Ongoing</div>
                      <div className="count-pill done">🟢 {sLeads.filter(r => r.status === 'completed').length} Done</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="add-staff-form" style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: '#64748b', fontWeight: '600', fontStyle: 'italic' }}>
                💡 To add a new employee, kindly connect with your super admin.
              </p>
            </div>
          </div>
        )}

        <div className="mobile-stats-toggle">
          <button className="btn-stats-toggle" onClick={() => setShowMobileStats(!showMobileStats)}>
            {showMobileStats ? '📊 Hide Analytics' : '📊 View Analytics'}
          </button>
        </div>

        <div className={`stats-bar ${showMobileStats ? 'stats-open' : ''}`}>
          <div className="stat-box">
            <span>
              <img 
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4ca/512.gif" 
                width="24" 
                style={{verticalAlign:'middle', marginRight:'8px'}} 
                alt="📊"
                onError={(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '📊 '); }}
              /> 
              Total
            </span>
            <strong>{stats.total}</strong>
          </div>
          {session.role === 'admin' && stats.needsReview > 0 && (
            <div className="stat-box warning pulse-border">
              <span>🚨 Needs Review</span>
              <strong style={{color: '#f97316'}}>{stats.needsReview}</strong>
            </div>
          )}
          <div className="stat-box new">
            <span>
              <img 
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/23f3/512.gif" 
                width="24" 
                style={{verticalAlign:'middle', marginRight:'8px'}} 
                alt="⏳"
                onError={(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '⏳ '); }}
              /> 
              Pending
            </span>
            <strong>{stats.new}</strong>
          </div>
          <div className="stat-box ongoing">
            <span>
              <img 
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/2699_fe0f/512.gif" 
                width="24" 
                style={{verticalAlign:'middle', marginRight:'8px'}} 
                alt="⚙️"
                onError={(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '⚙️ '); }}
              /> 
              Ongoing
            </span>
            <strong>{stats.ongoing}</strong>
          </div>
          <div className="stat-box done">
            <span>
              <img 
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/2705/512.gif" 
                width="24" 
                style={{verticalAlign:'middle', marginRight:'8px'}} 
                alt="✅"
                onError={(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '✅ '); }}
              /> 
              Completed
            </span>
            <strong>{stats.completed}</strong>
          </div>
        </div>

        <div className="filter-row">
          <input type="text" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Items</option>
            <option value="new">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="leads-table-wrap">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Status</th>
                {session.role === 'admin' && <th>Assign To</th>}
                <th>Client Details</th>
                <th>Project Inquiry</th>
                <th>Notes</th>
                {session.role === 'admin' && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map(r => (
                <tr key={r.id} className={`status-row-${r.status}`}>
                  <td className="status-cell">
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                      {r.status === 'new' && <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/23f3/512.gif" width="20" />}
                      {r.status === 'ongoing' && <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2699_fe0f/512.gif" width="20" />}
                      {r.status === 'completed' && <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2705/512.gif" width="20" />}
                      {r.status === 'approval_pending' ? (
                        <div className="status-badge-pending pulse-text">⚠️ Review Required</div>
                      ) : r.status === 'rejected' ? (
                        <div className="status-badge-rejected">
                          🚫 Rejected
                          <div style={{fontSize:'0.6rem', color:'#ef4444', marginTop:'2px', fontWeight:'bold'}}>
                            {(() => {
                              if (!r.rejected_at) return 'Auto-deleting...';
                              const rejTime = new Date(r.rejected_at).getTime();
                              const diff = 60 - Math.floor((new Date().getTime() - rejTime) / 60000);
                              return diff > 0 ? `Delete in ${diff}m` : 'Deleting...';
                            })()}
                          </div>
                        </div>
                      ) : (
                        <select className={`status-select ${r.status}`} value={r.status} onChange={e => updateStatus(r.id, e.target.value)}>
                          <option value="new">Pending</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                          {session.role === 'admin' && <option value="rejected">Rejected</option>}
                        </select>
                      )}
                    </div>
                  </td>
                  {session.role === 'admin' && (
                    <td>
                      <select className="assign-select" value={r.assigned_to || ''} onChange={e => assignTask(r.id, e.target.value)}>
                        <option value="">Unassigned</option>
                        {staffList.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
                      </select>
                    </td>
                  )}
                  <td>
                    <div className="client-name">{r.name}</div>
                    <div className="client-email">{r.email}</div>
                    {r.phone ? (
                      <div className="client-phone" style={{fontSize:'0.75rem', color:'#2563eb', marginTop:'4px', fontWeight:'600'}}>
                        📞 {r.phone}
                      </div>
                    ) : (
                      <div style={{fontSize:'0.7rem', color:'#94a3b8', marginTop:'4px'}}>No phone provided</div>
                    )}
                    {/* 🏷️ Lead Source Badge (Admin ONLY) */}
                    {session.role === 'admin' && (
                      <div style={{marginTop:'8px'}}>
                        <span style={{
                          fontSize:'0.6rem', padding:'2px 8px', borderRadius:'100px', 
                          background: r.source === 'Website' ? '#dbeafe' : r.source === 'AI Chatbot' ? '#f3e8ff' : '#f1f5f9',
                          color: r.source === 'Website' ? '#1e40af' : r.source === 'AI Chatbot' ? '#7e22ce' : '#475569',
                          fontWeight:'800', textTransform:'uppercase', letterSpacing:'0.03em', border:'1px solid rgba(0,0,0,0.05)'
                        }}>
                          {r.source === 'Website' ? '🌐 Website' : r.source === 'AI Chatbot' ? '🤖 AI Bot' : `👤 ${r.source}`}
                        </span>
                      </div>
                    )}
                  </td>
                  <td><div className="service-tag">{r.service}</div><p className="client-msg">{r.msg}</p></td>
                  <td>
                    <textarea 
                      placeholder="Add notes..." 
                      value={r.notes} 
                      onChange={e => updateNoteLocally(r.id, e.target.value)} 
                      onBlur={e => saveNoteToDB(r.id, e.target.value)}
                    />
                  </td>
                  {session.role === 'admin' && (
                    <td>
                      {r.status === 'approval_pending' ? (
                        <div style={{display:'flex', gap:'5px'}}>
                          <button className="btn-save" onClick={() => approveLead(r)}>Approve</button>
                          <button className="btn-delete" onClick={() => {setRejectId(r.id); setShowRejectModal(true);}}>Reject</button>
                        </div>
                      ) : <button className="btn-delete" onClick={() => deleteRow(r.id)}>Delete</button>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && !loading && <div className="no-data">No results found.</div>}
        </div>
      </main>

      {showRejectModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-box">
            <div className="modal-header">
              <h3>🚫 Reject Submission</h3>
              <button className="close-x" onClick={() => setShowRejectModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{fontSize: '0.9rem', color: '#64748b', marginBottom: '10px'}}>
                Please provide a clear reason for rejecting this lead. This will be visible to the employee.
              </p>
              <textarea 
                value={rejectReason} 
                onChange={e => setRejectReason(e.target.value)} 
                placeholder="e.g., Duplicate entry, Incorrect service selected, etc." 
              />
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowRejectModal(false)}>Cancel</button>
              <button className="btn-confirm-reject" onClick={rejectLead}>Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}

      {celebration && (
        <div className="custom-modal-overlay">
          <div className={`celebration-box fade-in visible ${celebration.type}`}>
            <div className="confetti-wrap">
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif" width="100" />
            </div>
            <h2>{celebration.type === 'approval' ? '🎊 APPROVED! 🎊' : '💼 NEW ASSIGNMENT! 💼'}</h2>
            <p className="celebration-msg">{celebration.message}</p>
            <div className="celebration-detail">
              Project: <strong>{celebration.name}</strong>
            </div>
            <button className="btn-save" style={{marginTop: '20px', width: '100%', background: celebration.type === 'approval' ? '#16a34a' : '#2563eb'}} onClick={() => setCelebration(null)}>
              {celebration.type === 'approval' ? "Let's Go! 🚀" : "Start Task 🎯"}
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-box">
            <div className="modal-header">
              <h3>🗑️ Confirm Deletion</h3>
              <button className="close-x" onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{fontSize: '1rem', color: '#1e293b', fontWeight: '600'}}>
                Are you sure you want to delete the lead for <strong>"{deleteTarget?.name}"</strong>?
              </p>
              <p style={{fontSize: '0.85rem', color: '#ef4444', marginTop: '10px', fontWeight: '500'}}>
                ⚠️ This action is permanent and will also remove the entry from your Google Sheet.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn-confirm-reject" onClick={confirmDelete}>Permanently Delete</button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-box info-modal-box">
            <div className="modal-header">
              <h3>Notice</h3>
              <button className="close-x" onClick={() => setShowInfoModal(false)}>✕</button>
            </div>
            <div className="modal-body center-content">
              <div className="info-icon-wrap">
                <img 
                  src={infoIcon.url} 
                  alt={infoIcon.fallback} 
                  className="info-live-gif" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="fallback-emoji" style={{display: 'none', fontSize: '3rem'}}>{infoIcon.fallback}</span>
              </div>
              <p className="info-text-large">
                {infoMsg}
              </p>
            </div>
            <div className="modal-footer" style={{justifyContent: 'center'}}>
              <button 
                id="btn-info-close"
                className="btn-save" 
                onClick={() => setShowInfoModal(false)} 
                style={{padding: '0.9rem 3rem', borderRadius: '100px'}}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

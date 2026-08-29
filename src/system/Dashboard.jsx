// Dashboard.jsx
import React, { useState } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    // ---- STATE ----
    const [modal, setModal] = useState({ open: false, title: '', content: '' });
    const [activeNav, setActiveNav] = useState('Projects');
    const [hoveredBar, setHoveredBar] = useState(null);
    const [activeChartTab, setActiveChartTab] = useState('Construction Costs');

    // ---- DEMO DATA ----
    const demoData = {
        Projects: [
            { name: 'Sunset Residences', status: 'In Progress', progress: '72%', location: 'Colombo 05' },
            { name: 'Ocean View Residences', status: 'In Progress', progress: '45%', location: 'Colombo 03' },
            { name: 'Skyline Apartments', status: 'Planning', progress: '10%', location: 'Colombo 07' },
            { name: 'Green Valley Estate', status: 'Completed', progress: '100%', location: 'Kandy' },
        ],
        Construction: [
            { name: 'Sunset Residences – Level 8', status: 'Completed', date: '12 Sep 2025' },
            { name: 'Ocean View – Foundation', status: 'In Progress', date: 'Est. Nov 2025' },
            { name: 'Skyline – Land Clearing', status: 'Pending', date: 'Est. Jan 2026' },
        ],
        'Budget & Costs': {
            total: 'LKR 245.8M',
            spent: 'LKR 178.3M',
            remaining: 'LKR 67.5M',
            breakdown: [
                { category: 'Materials', amount: 'LKR 82.4M' },
                { category: 'Labor', amount: 'LKR 54.2M' },
                { category: 'Equipment', amount: 'LKR 28.7M' },
                { category: 'Permits', amount: 'LKR 13.0M' },
            ]
        },
        Vendors: [
            { name: 'Prime Electricals (Pvt) Ltd', service: 'Electrical', status: 'Active' },
            { name: 'Ceylon Builders', service: 'General Contracting', status: 'Active' },
            { name: 'GreenTech Solutions', service: 'HVAC', status: 'Inactive' },
        ],
        Reports: [
            { name: 'Monthly Progress Report - Aug 2025', date: '01 Sep 2025' },
            { name: 'Financial Summary - Q3 2025', date: '30 Sep 2025' },
            { name: 'Construction Milestone Report', date: '15 Sep 2025' },
        ],
        Properties: [
            { name: 'Sunset Residences', units: '168', occupancy: '74%', location: 'Colombo 05' },
            { name: 'Ocean View Residences', units: '96', occupancy: '62%', location: 'Colombo 03' },
            { name: 'Skyline Apartments', units: '120', occupancy: '45%', location: 'Colombo 07' },
        ],
        'Tenants & Buyers': [
            { name: 'Thilina Perera', type: 'Tenant', unit: 'Apt. 2B, Ocean View', status: 'Active' },
            { name: 'Nimal Fernando', type: 'Buyer', unit: 'Apt. 5A, Sunset', status: 'Active' },
            { name: 'Priya Rajapaksa', type: 'Tenant', unit: 'Apt. 12C, Skyline', status: 'Active' },
            { name: 'Sunil Wickramasinghe', type: 'Buyer', unit: 'Apt. 8B, Ocean View', status: 'Pending' },
        ],
        Leases: [
            { unit: 'Apt. 5A', property: 'Ocean View Residences', tenant: 'Nimal Fernando', expiry: '15 Sep 2025' },
            { unit: 'Unit 2B', property: 'Sunset Residences', tenant: 'Thilina Perera', expiry: '23 Sep 2025' },
            { unit: 'Apt. 12C', property: 'Skyline Apartments', tenant: 'Priya Rajapaksa', expiry: '29 Sep 2025' },
        ],
        'Rent Collection': {
            total: 'LKR 18.7M',
            collected: 'LKR 17.5M',
            pending: 'LKR 1.2M',
            overdue: 'LKR 0.8M',
            details: [
                { tenant: 'Thilina Perera', unit: 'Apt. 2B', amount: 'LKR 125,000', status: 'Paid' },
                { tenant: 'Nimal Fernando', unit: 'Apt. 5A', amount: 'LKR 95,000', status: 'Pending' },
                { tenant: 'Priya Rajapaksa', unit: 'Apt. 12C', amount: 'LKR 110,000', status: 'Overdue' },
            ]
        },
        Maintenance: [
            { id: 'WO-1245', type: 'Plumbing', status: 'Completed', property: 'Sunset Residences' },
            { id: 'WO-1246', type: 'Electrical', status: 'In Progress', property: 'Ocean View' },
            { id: 'WO-1247', type: 'HVAC', status: 'Open', property: 'Skyline' },
            { id: 'WO-1248', type: 'General', status: 'Scheduled', property: 'Sunset Residences' },
        ],
        Assets: [
            { name: 'Sunset Residences', type: 'Building', value: 'LKR 450M', depreciation: '2.5%' },
            { name: 'Construction Equipment', type: 'Equipment', value: 'LKR 28M', depreciation: '12%' },
            { name: 'Land - Colombo 07', type: 'Land', value: 'LKR 120M', depreciation: '0%' },
        ],
        'Financial Dashboard': {
            revenue: 'LKR 28.4M',
            expenses: 'LKR 18.7M',
            profit: 'LKR 9.7M',
            chart: [12, 15, 18, 14, 20, 22, 19, 24, 28, 30]
        },
        Invoices: [
            { id: 'INV-2025-001', client: 'Thilina Perera', amount: 'LKR 125,000', status: 'Paid', date: '01 Sep 2025' },
            { id: 'INV-2025-002', client: 'Nimal Fernando', amount: 'LKR 95,000', status: 'Pending', date: '15 Sep 2025' },
            { id: 'INV-2025-003', client: 'Priya Rajapaksa', amount: 'LKR 110,000', status: 'Overdue', date: '29 Aug 2025' },
        ],
        Transactions: [
            { id: 'TXN-001', type: 'Rent', amount: 'LKR 125,000', from: 'Thilina Perera', date: '02 Sep 2025' },
            { id: 'TXN-002', type: 'Construction', amount: 'LKR 2.4M', to: 'Ceylon Builders', date: '01 Sep 2025' },
            { id: 'TXN-003', type: 'Rent', amount: 'LKR 95,000', from: 'Nimal Fernando', date: '30 Aug 2025' },
        ],
        Integrations: [
            { name: 'QuickBooks', status: 'Connected', sync: 'Auto' },
            { name: 'Slack', status: 'Connected', sync: 'Manual' },
            { name: 'Google Calendar', status: 'Disconnected', sync: '—' },
        ],
        Settings: [
            { category: 'General', items: ['Company Profile', 'Branding', 'Timezone'] },
            { category: 'Security', items: ['2FA', 'Password Policy', 'Session Management'] },
            { category: 'Notifications', items: ['Email', 'SMS', 'Push'] },
        ],
        'Add New Property': { form: ['Property Name', 'Location', 'Type', 'Total Units'] },
        'Add New Unit': { form: ['Unit Number', 'Property', 'Type', 'Size (sqft)', 'Rent'] },
        'Create Lease': { form: ['Unit', 'Tenant', 'Start Date', 'End Date', 'Rent Amount'] },
        'Collect Rent': { form: ['Unit', 'Tenant', 'Amount', 'Payment Method', 'Date'] },
        'Create Work Order': { form: ['Property', 'Unit', 'Issue Type', 'Priority', 'Description'] },
        'Add Vendor / Contractor': { form: ['Vendor Name', 'Service Type', 'Contact', 'Email', 'Status'] },
        'Explore Portal': {
            message: '🔗 Unified Tenant & Buyer Portal',
            features: [
                'Track Construction – Live updates, photos & milestones',
                'Digital Leasing – Sign leases online',
                'Secure online payments – Pay rent securely',
                'Maintenance Requests – Submit & track work orders',
            ]
        },
        'Get Mobile App': {
            message: '📱 Get the BuildManage Mobile App',
            features: [
                'Manage properties on the go',
                'Real-time notifications',
                'Tenant communication',
                'Maintenance tracking',
                'Financial overview'
            ]
        }
    };

    // ---- NAV ITEMS ----
    const navSections = [
        {
            title: 'DEVELOPMENT',
            items: [
                { label: 'Projects', icon: '🏗️' },
                { label: 'Construction', icon: '🏛️' },
                { label: 'Budget & Costs', icon: '💵' },
                { label: 'Vendors', icon: '🤝' },
                { label: 'Reports', icon: '📄' },
            ]
        },
        {
            title: 'OPERATIONS',
            items: [
                { label: 'Properties', icon: '🏢' },
                { label: 'Tenants & Buyers', icon: '👥' },
                { label: 'Leases', icon: '📋' },
                { label: 'Rent Collection', icon: '💰' },
                { label: 'Maintenance', icon: '🔧' },
                { label: 'Assets', icon: '📦' },
            ]
        },
        {
            title: 'FINANCE',
            items: [
                { label: 'Financial Dashboard', icon: '📈' },
                { label: 'Invoices', icon: '🧾' },
                { label: 'Transactions', icon: '💳' },
                { label: 'Reports', icon: '📄' },
            ]
        },
        {
            title: 'SYSTEM',
            items: [
                { label: 'Integrations', icon: '🔌' },
                { label: 'Settings', icon: '⚙️' },
            ]
        }
    ];

    // ---- QUICK ACTIONS ----
    const quickActions = [
        { label: 'Add New Property', icon: '🏢' },
        { label: 'Add New Unit', icon: '📐' },
        { label: 'Create Lease', icon: '📄' },
        { label: 'Collect Rent', icon: '💰' },
        { label: 'Create Work Order', icon: '🔧' },
        { label: 'Add Vendor / Contractor', icon: '👷' },
    ];

    // ---- TOP STAT STRIP ----
    const topStats = [
        { label: 'Total Properties', value: '24', change: '+3 this month', icon: '🏢', tone: 'iconGreen', nav: 'Properties' },
        { label: 'Occupied Units', value: '87%', change: '+5.2% this month', icon: '🏠', tone: 'iconBlue', nav: 'Properties' },
        { label: 'Monthly Rental Income', value: 'LKR 18.7M', change: '+8.4% vs last month', icon: '💰', tone: 'iconPurple', nav: 'Rent Collection' },
        { label: 'Outstanding Rent', value: 'LKR 1.2M', change: '12 tenants', icon: '⚠️', tone: 'iconAmber', nav: 'Rent Collection', negative: true },
    ];

    // ---- PROJECT PIPELINE ----
    const projectPipeline = [
        { name: 'Sunset Residences', location: 'Colombo 05', progress: 72, status: 'Construction', statusClass: 'statusInProgress', thumb: 'linear-gradient(135deg,#3b82f6,#1e3a8a)' },
        { name: 'Ocean View Apartments', location: 'Colombo 03', progress: 45, status: 'Construction', statusClass: 'statusInProgress', thumb: 'linear-gradient(135deg,#22c55e,#14532d)' },
        { name: 'Urban Heights', location: 'Colombo 07', progress: null, status: 'Planning', statusClass: 'statusPlanning', thumb: 'linear-gradient(135deg,#f59e0b,#78350f)' },
        { name: 'Greenway Villas', location: 'Nugegoda', progress: null, status: 'Completed', statusClass: 'statusCompleted', thumb: 'linear-gradient(135deg,#8b5cf6,#3b0764)' },
    ];

    // ---- LEASE EXPIRY ----
    const leaseExpiry = [
        { unit: 'Apt. 5A', property: 'Ocean View Residences', days: '15 Days', date: '15 Sep 2025' },
        { unit: 'Unit 2B', property: 'Sunset Residences', days: '22 Days', date: '23 Sep 2025' },
        { unit: 'Apt. 12C', property: 'Skyline Apartments', days: '29 Days', date: '29 Sep 2025' },
    ];

    // ---- RECENT ACTIVITIES ----
    const recentActivities = [
        { icon: '📝', text: 'New lease signed – Apt. 2B, Ocean View Residences', time: '2m ago' },
        { icon: '💰', text: 'Rent payment received – LKR 125,000 from Thilina Perera', time: '1h ago' },
        { icon: '✅', text: 'Maintenance completed – Work Order #WO-1245', time: '3h ago' },
        { icon: '🏗️', text: 'Construction milestone – Sunset Residences – Level 8 Completed', time: '5h ago' },
        { icon: '➕', text: 'New vendor added – Prime Electricals (Pvt) Ltd', time: '1d ago' },
    ];

    // ---- MAINTENANCE OVERVIEW ----
    const maintenanceStats = [
        { label: 'Open', count: 48, pct: 37, color: '#ef4444' },
        { label: 'In Progress', count: 32, pct: 25, color: '#3b82f6' },
        { label: 'Scheduled', count: 28, pct: 22, color: '#f59e0b' },
        { label: 'Completed', count: 20, pct: 16, color: '#22c55e' },
    ];
    const maintenanceTotal = maintenanceStats.reduce((s, m) => s + m.count, 0);

    // ---- RENT COLLECTION ----
    const rentCollection = {
        pending: '92%',
        amount: 'LKR 1.2M',
        overdue: 'LKR 0.8M'
    };

    // ---- CHART DATA ----
    const chartSeries = {
        'Construction Costs': [18, 22, 19, 24, 28, 30, 26, 32, 35, 38],
        'Rental Income': [10, 12, 13, 15, 16, 17, 18, 19, 20, 22],
        'Net Profit': [4, 5, 6, 5, 7, 8, 7, 9, 10, 11],
    };
    const chartData = chartSeries[activeChartTab];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

    // ---- HANDLERS ----
    const handleNavClick = (item) => {
        setActiveNav(item);
        const data = demoData[item];
        if (data) {
            let content = '';
            if (Array.isArray(data)) {
                content = data.map((d, i) =>
                    `<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;">
                <span>${d.name || d.unit || d.id || d.client || 'Item ' + (i+1)}</span>
                <span style="color:#94a3b8;">${d.status || d.amount || d.type || ''}</span>
              </div>`
                ).join('');
            } else if (typeof data === 'object' && data.form) {
                content = `<div style="padding:8px 0;"><strong>Form fields:</strong> ${data.form.join(', ')}</div>`;
            } else if (typeof data === 'object' && data.message) {
                content = `<div style="padding:8px 0;"><strong>${data.message}</strong></div>
                <ul style="list-style:none;padding:0;margin:8px 0;">${data.features.map(f => `<li style="padding:4px 0;">• ${f}</li>`).join('')}</ul>`;
            } else if (typeof data === 'object' && data.total) {
                content = `
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;padding:8px 0;">
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Total</div>
                      <div style="font-size:18px;font-weight:700;color:#f1f5f9;">${data.total}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Spent</div>
                      <div style="font-size:18px;font-weight:700;color:#f1f5f9;">${data.spent}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Remaining</div>
                      <div style="font-size:18px;font-weight:700;color:#f1f5f9;">${data.remaining}</div>
                    </div>
                  </div>
                  ${data.breakdown ? data.breakdown.map(b => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.08);"><span>${b.category}</span><span style="font-weight:500;">${b.amount}</span></div>`).join('') : ''}
                `;
            } else if (typeof data === 'object' && data.collected) {
                content = `
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;padding:8px 0;">
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Total</div>
                      <div style="font-size:18px;font-weight:700;color:#f1f5f9;">${data.total}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Collected</div>
                      <div style="font-size:18px;font-weight:700;color:#22c55e;">${data.collected}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Pending</div>
                      <div style="font-size:18px;font-weight:700;color:#ef4444;">${data.pending}</div>
                    </div>
                  </div>
                  <div style="margin-top:10px;color:#f1f5f9;"><strong>Details</strong></div>
                  ${data.details ? data.details.map(d => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.08);"><span>${d.tenant} – ${d.unit}</span><span style="font-weight:500;color:${d.status === 'Paid' ? '#22c55e' : d.status === 'Pending' ? '#f59e0b' : '#ef4444'};">${d.amount} (${d.status})</span></div>`).join('') : ''}
                `;
            } else if (typeof data === 'object' && data.revenue) {
                content = `
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;padding:8px 0;">
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Revenue</div>
                      <div style="font-size:18px;font-weight:700;color:#22c55e;">${data.revenue}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Expenses</div>
                      <div style="font-size:18px;font-weight:700;color:#ef4444;">${data.expenses}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;text-align:center;">
                      <div style="font-size:12px;color:#94a3b8;">Net Profit</div>
                      <div style="font-size:18px;font-weight:700;color:#3b82f6;">${data.profit}</div>
                    </div>
                  </div>
                `;
            } else if (typeof data === 'object' && data.chart) {
                content = `
                  <div style="padding:8px 0;">
                    <div style="display:flex;align-items:flex-end;gap:6px;height:120px;padding:8px 0;">
                      ${data.chart.map((val, i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end;"><div style="width:100%;background:#3b82f6;border-radius:4px 4px 0 0;height:${(val/30)*100}%;min-height:4px;"></div><span style="font-size:8px;color:#94a3b8;margin-top:4px;">${months[i]}</span></div>`).join('')}
                    </div>
                  </div>
                `;
            } else {
                content = `<pre style="font-size:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#e2e8f0;padding:12px;border-radius:10px;overflow:auto;">${JSON.stringify(data, null, 2)}</pre>`;
            }
            setModal({ open: true, title: item, content });
        } else {
            setModal({ open: true, title: item, content: `<div style="padding:16px 0;">Demo data for "${item}" is not available yet.</div>` });
        }
    };

    const handleQuickAction = (label) => {
        const data = demoData[label];
        if (data && data.form) {
            let content = `<div style="padding:8px 0;"><strong>📋 ${label}</strong></div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;margin:8px 0;">
              ${data.form.map(f => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.08);"><span>${f}</span><span style="color:#94a3b8;font-size:13px;">[demo input]</span></div>`).join('')}
            </div>
            <div style="font-size:13px;color:#94a3b8;">💡 Click "Confirm" to process (demo mode)</div>`;
            setModal({ open: true, title: label, content });
        } else {
            const data = demoData[label];
            if (data) {
                let content = '';
                if (typeof data === 'object' && data.message) {
                    content = `<div style="padding:8px 0;"><strong>${data.message}</strong></div>
                    <ul style="list-style:none;padding:0;margin:8px 0;">${data.features.map(f => `<li style="padding:4px 0;">• ${f}</li>`).join('')}</ul>`;
                } else {
                    content = `<pre style="font-size:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#e2e8f0;padding:12px;border-radius:10px;overflow:auto;">${JSON.stringify(data, null, 2)}</pre>`;
                }
                setModal({ open: true, title: label, content });
            } else {
                setModal({ open: true, title: label, content: `<div style="padding:16px 0;">✨ "${label}" action triggered (demo mode)</div>` });
            }
        }
    };

    const handleLeaseClick = (lease) => {
        setModal({
            open: true,
            title: `Lease: ${lease.unit}`,
            content: `
              <div style="padding:8px 0;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;">
                  <div><span style="color:#94a3b8;font-size:13px;">Unit</span><br/><strong>${lease.unit}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Property</span><br/><strong>${lease.property}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Expires In</span><br/><strong style="color:#ef4444;">${lease.days}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Expiry Date</span><br/><strong>${lease.date}</strong></div>
                </div>
                <div style="margin-top:12px;font-size:13px;color:#94a3b8;">💡 Click "Renew" to process renewal (demo)</div>
              </div>
            `
        });
    };

    const handleActivityClick = (activity) => {
        setModal({
            open: true,
            title: 'Activity Details',
            content: `
              <div style="padding:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;">
                <div style="font-size:24px;text-align:center;">${activity.icon}</div>
                <div style="margin-top:8px;font-size:15px;text-align:center;">${activity.text}</div>
                <div style="margin-top:12px;font-size:13px;color:#94a3b8;text-align:center;">🕐 ${new Date().toLocaleString()}</div>
              </div>
            `
        });
    };

    const handleMaintenanceClick = (item) => {
        setModal({
            open: true,
            title: `Work Order ${item.id}`,
            content: `
              <div style="padding:8px 0;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;">
                  <div><span style="color:#94a3b8;font-size:13px;">ID</span><br/><strong>${item.id}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Type</span><br/><strong>${item.type}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Status</span><br/><strong style="color:${item.status === 'Completed' ? '#22c55e' : item.status === 'In Progress' ? '#3b82f6' : item.status === 'Open' ? '#ef4444' : '#f59e0b'};">${item.status}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Property</span><br/><strong>${item.property}</strong></div>
                </div>
                <div style="margin-top:12px;font-size:13px;color:#94a3b8;">🔧 Click "Update Status" to change (demo)</div>
              </div>
            `
        });
    };

    const handleRentItemClick = (detail) => {
        setModal({
            open: true,
            title: `Rent Payment: ${detail.tenant}`,
            content: `
              <div style="padding:8px 0;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:10px;">
                  <div><span style="color:#94a3b8;font-size:13px;">Tenant</span><br/><strong>${detail.tenant}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Unit</span><br/><strong>${detail.unit}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Amount</span><br/><strong>${detail.amount}</strong></div>
                  <div><span style="color:#94a3b8;font-size:13px;">Status</span><br/><strong style="color:${detail.status === 'Paid' ? '#22c55e' : detail.status === 'Pending' ? '#f59e0b' : '#ef4444'};">${detail.status}</strong></div>
                </div>
                <div style="margin-top:12px;font-size:13px;color:#94a3b8;">💳 Click "Process Payment" to simulate (demo)</div>
              </div>
            `
        });
    };

    const handleCloseModal = () => setModal({ open: false, title: '', content: '' });

    // ---- CHART HELPERS (SVG line + area, no external lib) ----
    const CHART_W = 600;
    const CHART_H = 170;
    const chartMax = Math.max(...chartData) * 1.15;
    const chartPoints = chartData.map((val, i) => {
        const x = (i / (chartData.length - 1)) * CHART_W;
        const y = CHART_H - (val / chartMax) * CHART_H;
        return { x, y, val };
    });
    const linePath = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`;

    // ---- DONUT HELPER ----
    const donutSlices = maintenanceStats.reduce((acc, stat, idx, arr) => {
        const cumulative = acc.length ? acc[acc.length - 1].cumulative : 0;
        const start = (cumulative / maintenanceTotal) * 2 * Math.PI;
        const end = ((cumulative + stat.count) / maintenanceTotal) * 2 * Math.PI;
        const x1 = 60 + 50 * Math.cos(start);
        const y1 = 60 + 50 * Math.sin(start);
        const x2 = 60 + 50 * Math.cos(end);
        const y2 = 60 + 50 * Math.sin(end);
        const large = end - start > Math.PI ? 1 : 0;
        return [...acc, { ...stat, cumulative: cumulative + stat.count, x1, y1, x2, y2, large }];
    }, []);

    // ---- RENDER ----
    return (
        <div className={styles.dashboard}>
            {/* ---- SIDEBAR ---- */}
            <aside className={styles.sidebar}>
                <div className={styles.logoArea}>
                    <div className={styles.logoMark}>🏗️</div>
                    <div>
                        <div style={{ color: '#e9ebf0' }} className={styles.logo}>BuildManage</div>
                        <div className={styles.tagline}>All-in-One Real Estate Platform</div>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {navSections.map((section, idx) => (
                        <div key={idx} className={styles.navSection}>
                            <div style={{ color: '#babcc2' }} className={styles.navSectionTitle}>{section.title}</div>
                            {section.items.map((item) => (
                                <button
                                    key={item.label}
                                    className={`${styles.navItem} ${activeNav === item.label ? styles.navItemActive : ''}`}
                                    onClick={() => handleNavClick(item.label)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <button className={styles.footerBtn} onClick={() => handleNavClick('Settings')}>⚙️ Settings</button>
                    <button className={styles.footerBtn} onClick={() => handleNavClick('Get Mobile App')}>📱 Get Mobile App</button>
                </div>
            </aside>

            {/* ---- MAIN ---- */}
            <main className={styles.main}>
                {/* ---- HEADER ---- */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1 style={{ color: '#e9ebf0' }} className={styles.welcome}>Welcome back, Your Name! 👋</h1>
                        <p className={styles.welcomeSub}>Here's what's happening across your portfolio.</p>
                    </div>
                    <div className={styles.headerRight}>
                        <button className={styles.headerBtn} onClick={() => handleNavClick('Reports')}>📊 Reports</button>
                        <button className={styles.headerBtn} onClick={() => handleNavClick('Settings')}>⚙️</button>
                    </div>
                </header>

                {/* ---- TOP STAT STRIP ---- */}
                <div className={styles.statStrip}>
                    {topStats.map((stat, idx) => (
                        <div key={idx} className={styles.statCard} onClick={() => handleNavClick(stat.nav)}>
                            <div className={`${styles.statCardIcon} ${styles[stat.tone]}`}>{stat.icon}</div>
                            <span className={styles.statCardLabel}>{stat.label}</span>
                            <span style={{ color: '#ffffff' }} className={styles.statCardValue}>{stat.value}</span>
                            <span className={`${styles.statCardChange} ${stat.negative ? styles.statCardChangeNeg : ''}`}>{stat.change}</span>
                        </div>
                    ))}
                </div>

                {/* ---- HERO: SUNSET RESIDENCES + QUICK ACTIONS ---- */}
                <div className={styles.heroRow}>
                    <div className={styles.propertyCard}>
                        <span style={{ color: '#e9ebf0c2' }} className={styles.propertyEyebrow}>Development</span>
                        <span className={styles.propertyBadge}>🟢 Active</span>
                        <div className={styles.propertyBody}>
                            <h2 className={styles.propertyName}>Sunset Residences</h2>
                            <p className={styles.propertyLocation}>Colombo 05</p>

                            <div
                                className={styles.propertyProgressRow}
                                onClick={() => handleNavClick('Construction')}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className={styles.propertyProgressLabel}>Construction Progress</span>
                                <span className={styles.propertyProgressValue}>72%</span>
                            </div>
                            <div className={styles.progressBar} onClick={() => handleNavClick('Construction')} style={{ cursor: 'pointer' }}>
                                <div className={styles.progressFill} style={{ width: '72%' }} />
                            </div>

                            <div className={styles.propertyMetaRow}>
                                <div className={styles.propertyMetaItem} onClick={() => handleNavClick('Construction')}>
                                    <span className={styles.propertyMetaLabel}>Expected Handover</span>
                                    <span className={styles.propertyMetaValue}>15 Nov 2025</span>
                                </div>
                                <div className={styles.propertyMetaItem} onClick={() => handleNavClick('Properties')}>
                                    <span className={styles.propertyMetaLabel}>Units</span>
                                    <span className={styles.propertyMetaValue}>124 / 168</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.quickActionsCard}`}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ color: '#e9ebf0' }} >Quick Actions</h3>
                        </div>
                        <div className={styles.quickActionsList}>
                            {quickActions.map((action, idx) => (
                                <button style={{ color: '#ffffffa4' }}
                                    key={idx}
                                    className={styles.quickActionBtn}
                                    onClick={() => handleQuickAction(action.label)}
                                >
                                    <span className={styles.quickIcon}>{action.icon}</span>
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---- FINANCIAL OVERVIEW + PROJECT PIPELINE ---- */}
                <div className={styles.twoCol}>
                    {/* Financial Overview */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ color: '#e9ebf0' }}>Financial Overview</h3>
                            <div className={styles.cardTabs}>
                                {Object.keys(chartSeries).map((tab) => (
                                    <button
                                        key={tab}
                                        className={activeChartTab === tab ? styles.tabActive : ''}
                                        onClick={() => setActiveChartTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.chartContainer}>
                            <div className={styles.chartSvgWrap}>
                                <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                    <defs>
                                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d={areaPath} fill="url(#chartFill)" />
                                    <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                                    {chartPoints.map((p, i) => (
                                        <g
                                            key={i}
                                            onMouseEnter={() => setHoveredBar(i)}
                                            onMouseLeave={() => setHoveredBar(null)}
                                            onClick={() => {
                                                setModal({
                                                    open: true,
                                                    title: `${months[i]} 2025 — ${activeChartTab}`,
                                                    content: `<div style="padding:12px 0;text-align:center;">
                                                        <div style="font-size:32px;font-weight:700;color:#3b82f6;">${p.val}${activeChartTab === 'Construction Costs' ? 'M' : 'M'}</div>
                                                        <div style="color:#94a3b8;margin-top:4px;">${months[i]} 2025</div>
                                                        <div style="margin-top:8px;font-size:13px;color:#94a3b8;">Click "View Details" for full report</div>
                                                      </div>`
                                                });
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <circle cx={p.x} cy={p.y} r={hoveredBar === i ? 6 : 4} fill="#0b1120" stroke="#3b82f6" strokeWidth="2.5" />
                                            {hoveredBar === i && (
                                                <text x={p.x} y={p.y - 14} textAnchor="middle" className={styles.chartTooltip}>
                                                    {p.val}M
                                                </text>
                                            )}
                                        </g>
                                    ))}
                                </svg>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                                {months.map((m) => (
                                    <span key={m} style={{ fontSize: '0.62rem', color: 'var(--text-faint, #64748b)', fontWeight: 600 }}>{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Project Pipeline */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ color: '#e9ebf0' }} >Project Pipeline</h3>
                            <button className={styles.viewAll} onClick={() => handleNavClick('Projects')}>View All →</button>
                        </div>
                        <div className={styles.pipelineList}>
                            {projectPipeline.map((proj, i) => (
                                <div key={i} className={styles.pipelineItem} onClick={() => handleNavClick('Projects')}>
                                    <div className={styles.pipelineThumb} style={{ background: proj.thumb }} />
                                    <div className={styles.pipelineInfo}>
                                        <div style={{ color: '#e9ebf0b3' }}  className={styles.pipelineName}>{proj.name}</div>
                                        <div className={styles.pipelineLocation}>{proj.location}</div>
                                    </div>
                                    <div className={styles.pipelineRight}>
                                        <div style={{ color: '#e9ebf0' }} className={styles.pipelineProgress}>{proj.progress !== null ? `${proj.progress}%` : '—'}</div>
                                        <div className={`${styles.pipelineStatus} ${styles[proj.statusClass]}`}>{proj.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---- LEASE EXPIRY + MAINTENANCE + RENT COLLECTION ---- */}
                <div className={styles.threeCol}>
                    {/* Lease Expiry */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ color: '#e9ebf0' }} >Lease Expiry</h3>
                            <button className={styles.viewAll} onClick={() => handleNavClick('Leases')}>View All →</button>
                        </div>
                        <div className={styles.leaseList}>
                            {leaseExpiry.map((lease, i) => (
                                <div key={i} className={styles.leaseItem} onClick={() => handleLeaseClick(lease)}>
                                    <div  className={styles.leaseInfo}>
                                        <span className={styles.leaseThumb}>🏢</span>
                                        <div className={styles.leaseText}>
                                            <span style={{ color: '#e9ebf0c5' }} className={styles.leaseUnit}>{lease.unit}</span>
                                            <span className={styles.leaseProperty}>{lease.property}</span>
                                        </div>
                                    </div>
                                    <span className={`${styles.leaseDays} ${lease.days.includes('15') ? styles.leaseDaysUrgent : styles.leaseDaysWarn}`}>
                                        {lease.days}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Maintenance Overview */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ color: '#e9ebf0' }} >Maintenance Overview</h3>
                            <button className={styles.viewAll} onClick={() => handleNavClick('Maintenance')}>View All →</button>
                        </div>
                        <div className={styles.maintenanceContent}>
                            <div className={styles.donutContainer}>
                                <svg viewBox="0 0 120 120" className={styles.donut}>
                                    {donutSlices.map((item, idx) => (
                                        <path
                                            key={idx}
                                            d={`M 60 60 L ${item.x1} ${item.y1} A 50 50 0 ${item.large} 1 ${item.x2} ${item.y2} Z`}
                                            fill={item.color}
                                            onClick={() => handleMaintenanceClick({ id: `WO-${1000 + idx}`, type: item.label, status: item.label, property: 'Sunset Residences' })}
                                        />
                                    ))}
                                    <circle cx="60" cy="60" r="30" fill="#131b2e" />
                                </svg>
                                <div className={styles.donutCenter}>
                                    <span className={styles.donutCenterValue}>{maintenanceTotal}</span>
                                    <span style={{ color: '#e9ebf0' }} className={styles.donutCenterLabel}>Total</span>
                                </div>
                            </div>
                            <div className={styles.maintenanceLegend}>
                                {maintenanceStats.map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className={styles.legendItem}
                                        onClick={() => handleNavClick('Maintenance')}
                                    >
                                        <span className={styles.legendDot} style={{ backgroundColor: stat.color }} />
                                        <span className={styles.legendLabel}>{stat.label}</span>
                                        <span className={styles.legendCount}>{stat.count} ({stat.pct}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Rent Collection */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ color: '#e9ebf0' }} >Rent Collection</h3>
                            <button className={styles.viewAll} onClick={() => handleNavClick('Rent Collection')}>View All →</button>
                        </div>
                        <div className={styles.rentContent}>
                            <div className={styles.rentRing}>
                                <div className={styles.ringLabel}>
                                    <span style={{ color: '#e9ebf0' }} className={styles.ringValue}>{rentCollection.pending}</span>
                                    <span className={styles.ringSub}>Collected</span>
                                </div>
                                <svg viewBox="0 0 120 120" className={styles.ringSvg}>
                                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                                    <circle
                                        cx="60" cy="60" r="50" fill="none" stroke="#22c55e"
                                        strokeWidth="12"
                                        strokeDasharray={`${92 * 2 * Math.PI * 50 / 100} ${2 * Math.PI * 50}`}
                                        strokeDashoffset="0"
                                        strokeLinecap="round"
                                        transform="rotate(-90 60 60)"
                                    />
                                </svg>
                            </div>
                            <div className={styles.rentDetails}>
                                <div className={styles.rentStat} onClick={() => handleNavClick('Rent Collection')}>
                                    <span className={styles.rentLabel}>Pending</span>
                                    <span className={styles.rentValue} style={{ color: '#fbbf24' }}>{rentCollection.amount}</span>
                                </div>
                                <div className={styles.rentStat} onClick={() => handleNavClick('Rent Collection')}>
                                    <span className={styles.rentLabel}>Overdue</span>
                                    <span className={styles.rentValue} style={{ color: '#f87171' }}>{rentCollection.overdue}</span>
                                </div>
                                <div className={styles.rentStat} onClick={() => handleNavClick('Rent Collection')}>
                                    <span className={styles.rentLabel}>Collection Rate</span>
                                    <span  className={styles.rentValue} style={{ color: '#4ade80' }}>92%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---- RECENT ACTIVITIES ---- */}
                <div className={styles.card} style={{ marginBottom: '1.4rem' }}>
                    <div className={styles.cardHeader}>
                        <h3 style={{ color: '#e9ebf0' }} >Recent Activities</h3>
                        <button className={styles.viewAll} onClick={() => handleNavClick('Reports')}>View All →</button>
                    </div>
                    <div className={styles.activityList}>
                        {recentActivities.map((act, idx) => (
                            <div key={idx} className={styles.activityItem} onClick={() => handleActivityClick(act)}>
                                <span className={styles.activityIcon}>{act.icon}</span>
                                <span style={{ color: '#e9ebf0aa' }} className={styles.activityText}>{act.text}</span>
                                <span className={styles.activityTime}>{act.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---- PORTAL + MOBILE APP ---- */}
                <div className={styles.footerRow}>
                    <div className={styles.portalCard}>
                        <div className={styles.portalLeft}>
                            <div className={styles.portalTitle}>🔗 Unified Tenant &amp; Buyer Portal</div>
                            <p className={styles.portalSub}>Give your tenants and buyers a seamless digital experience.</p>
                            <ul className={styles.portalFeatures}>
                                <li><span className={styles.portalFeatureIcon}>🏗️</span> Track Construction – live updates &amp; milestones</li>
                                <li><span className={styles.portalFeatureIcon}>📄</span> Digital Leasing – sign leases online</li>
                                <li><span className={styles.portalFeatureIcon}>🔧</span> Maintenance Requests – submit &amp; track</li>
                            </ul>
                            <button
                                className={`${styles.portalBtn} ${styles.portalBtnPurple}`}
                                onClick={() => handleQuickAction('Explore Portal')}
                            >
                                Explore Portal →
                            </button>
                        </div>
                        <div className={styles.phoneMock} />
                    </div>

                    <div className={styles.portalCard}>
                        <div className={styles.portalLeft}>
                            <div className={styles.portalTitle}>📱 Get Mobile App</div>
                            <p className={styles.portalSub}>Manage your properties on the go — notifications, tenant chat, and financials in your pocket.</p>
                            <button
                                className={styles.portalBtn}
                                onClick={() => handleQuickAction('Get Mobile App')}
                            >
                                Download Now →
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* ---- MODAL ---- */}
            {modal.open && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 style={{ color: '#e9ebf0' }} >{modal.title}</h3>
                            <button className={styles.modalClose} onClick={handleCloseModal}>×</button>
                        </div>
                        <div className={styles.modalBody} dangerouslySetInnerHTML={{ __html: modal.content }} />
                        <div className={styles.modalFooter}>
                            <button className={styles.modalBtn} onClick={handleCloseModal}>Close</button>
                            <button className={styles.modalBtnPrimary} onClick={() => { handleCloseModal(); alert('✅ Demo action completed! (This is a demonstration)'); }}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
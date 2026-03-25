import './firebase-config.js';
import { setupAuth } from './auth.js';
import { renderDashboard } from './dashboard.js';
import { setupCases } from './cases.js';
import { renderCalendar, initCalendar } from './calendar.js';
import { setupExport } from './export.js';
import { setupAIBridge } from './ai-bridge.js';
import { initStaffMonitoring } from './monitoring.js';

const initApp = () => {
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetId = item.getAttribute('data-target');
            if(!targetId) return;
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Dynamic Title sync
            const titleEl = document.getElementById('current-tab-title');
            if (titleEl) {
                const label = item.textContent.trim().replace(/[📊📂📅🚀]/g, '').trim();
                titleEl.innerText = label;
            }

            // FAB visibility (Show only on cases-tab IF user is admin)
            const addCaseBtn = document.getElementById('add-case-btn');
            if (addCaseBtn) {
                if (targetId === 'cases-tab' && window.currentUserRole === 'admin') {
                    addCaseBtn.classList.remove('hidden');
                } else {
                    addCaseBtn.classList.add('hidden');
                }
            }
            
            tabPanes.forEach(pane => {
                pane.classList.add('hidden');
                pane.classList.remove('active');
            });
            
            const targetPane = document.getElementById(targetId);
            if(targetPane) {
                targetPane.classList.remove('hidden');
                setTimeout(() => targetPane.classList.add('active'), 10);
            }
            
            if(targetId === 'overview-tab') renderDashboard();
            if(targetId === 'calendar-tab') renderCalendar();
            if(targetId === 'staff-tab') initStaffMonitoring();
        });
    });

    setupAuth();
    setupCases();
    setupExport();
    initCalendar();
    setupAIBridge();

    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
        const updateClock = () => {
            const now = new Date();
            clockEl.innerText = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Manila',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    const themeSwitch = document.getElementById('theme-toggle-input');
    if(themeSwitch) {
        const savedTheme = localStorage.getItem('docketpro-theme') || 'dark';
        if(savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeSwitch.checked = true;
        }
        
        themeSwitch.addEventListener('change', () => {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('docketpro-theme', isLight ? 'light' : 'dark');
        });
    }

    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const overlay = document.getElementById('sidebar-overlay');

    if(sidebar && toggleBtn) {
        const toggleSidebar = () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('mobile-active');
                if (overlay) overlay.classList.toggle('active');
            } else {
                sidebar.classList.toggle('collapsed');
            }
        };

        toggleBtn.onclick = toggleSidebar;
        if (overlay) overlay.onclick = toggleSidebar;

        // Auto-close on mobile when clicking nav items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-active');
                    if (overlay) overlay.classList.remove('active');
                }
            });
        });
    }

    // [SPLASH LOGIC] Handle the beautiful logo fade transition for all platforms (Mobile & Web)
    const splash = document.getElementById('app-splash-overlay');
    if (splash) {
        // Show the logo for 2.5 seconds, then start the 1.5s fade/blur into the login screen
        setTimeout(() => {
            splash.classList.add('fade-out');
            // Cleanup DOM after animation completes (allowing time for the 1.5s CSS transition)
            setTimeout(() => {
                if(splash && splash.parentNode) splash.remove();
            }, 2000);
        }, 2500);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

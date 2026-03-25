import { auth, db } from './firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    deleteUser
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

export function setupAuth() {
    window.isLoggingIn = false;
    window.isCreatingAccount = false;
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const userDashboardView = document.getElementById('user-dashboard-view');
    const loginForm = document.getElementById('login-form');
    const loginSubmitBtn = document.getElementById('login-submit-btn');
    const registerToggleBtn = document.getElementById('register-toggle-btn');
    const registrationFields = document.getElementById('registration-fields');
    const cancelRegBtn = document.getElementById('cancel-reg-btn');

    const logoutBtn = document.getElementById('logout-btn');
    const userLogoutBtn = document.getElementById('user-logout-btn');
    const loadingContainer = document.getElementById('login-loading');
    const loadingFill = document.getElementById('loading-fill');
    const loadingPct = document.getElementById('loading-pct');
    const togglePwdBtn = document.getElementById('toggle-password');
    const pwdInput = document.getElementById('password');

    let isRegisterMode = false;
    let currentUserData = null;

    // Reset to Login Mode Helper
    const resetToLoginMode = () => {
        isRegisterMode = false;
        if (registrationFields) registrationFields.classList.add('hidden');
        if (loginSubmitBtn) loginSubmitBtn.innerText = 'Login';
        if (registerToggleBtn) registerToggleBtn.innerText = "Don't have an account? Create one";
        if (cancelRegBtn) cancelRegBtn.classList.add('hidden');

        const extraInputs = registrationFields?.querySelectorAll('input');
        extraInputs?.forEach(input => input.required = false);

        const regU = document.getElementById('reg-username'); if (regU) regU.value = '';
        const regF = document.getElementById('reg-firstname'); if (regF) regF.value = '';
        const regL = document.getElementById('reg-lastname'); if (regL) regL.value = '';
    };

    // Toggle Mode Logic
    if (registerToggleBtn) {
        registerToggleBtn.onclick = () => {
            if (isRegisterMode) {
                resetToLoginMode();
            } else {
                isRegisterMode = true;
                if (registrationFields) registrationFields.classList.remove('hidden');
                if (loginSubmitBtn) loginSubmitBtn.innerText = 'Create Account';
                if (registerToggleBtn) registerToggleBtn.innerText = 'Already have an account? Login';
                if (cancelRegBtn) cancelRegBtn.classList.remove('hidden');

                const extraInputs = registrationFields?.querySelectorAll('input');
                extraInputs?.forEach(input => input.required = true);
            }
        };
    }

    if (cancelRegBtn) {
        cancelRegBtn.onclick = resetToLoginMode;
    }

    // UI Utilities
    const showLoading = () => {
        if (loginForm) loginForm.classList.add('hidden');
        if (loadingContainer) loadingContainer.classList.remove('hidden');
        window.isLoggingIn = true;
    };

    const hideLoading = () => {
        if (loadingContainer) loadingContainer.classList.add('hidden');
        if (loginForm) loginForm.classList.remove('hidden');
        window.isLoggingIn = false;
        if (loadingFill) loadingFill.style.width = '0%';
        if (loadingPct) loadingPct.innerText = '0%';
    };

    const runProgress = () => {
        let p = 0;
        return setInterval(() => {
            p += Math.random() * 15;
            if (p > 90) p = 90;
            if (loadingFill) loadingFill.style.width = `${p}%`;
            if (loadingPct) loadingPct.innerText = `${Math.floor(p)}%`;
        }, 100);
    };

    const finishProgress = (interval) => {
        clearInterval(interval);
        if (loadingFill) loadingFill.style.width = '100%';
        if (loadingPct) loadingPct.innerText = '100%';
    };

    const showSuccess = (msg) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
          <div class="modal-overlay active" style="z-index:9999;">
            <div class="modal-content glow-panel" style="max-width: 400px; border-color: #238636;">
              <div class="modal-header" style="background: rgba(35, 134, 54, 0.1); border-bottom: 2px solid #238636;">
                <h3 style="color: #238636; display: flex; align-items: center; gap: 8px; margin: 0; font-family: 'Outfit'; font-weight: 700;">
                   <span style="font-size: 1.25rem;">✅</span> SUCCESS
                </h3>
                <button class="close-btn" id="close-success-modal" style="color: #238636;">&times;</button>
              </div>
              <div class="modal-body text-center" style="padding: 30px;">
                 <p style="font-weight: 800; color: #fff; margin-bottom: 15px; font-size: 1.2rem; letter-spacing: 1px;">ACTION SUCCESSFUL</p>
                 <p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 25px; line-height: 1.5;">${msg}</p>
                 <button id="success-ack-btn" class="btn-primary" style="width: 100%; background: #238636; color: #fff; font-weight: 800; border: none;">CONTINUE</button>
              </div>
            </div>
          </div>
        `;
        const close = () => modalContainer.innerHTML = '';
        document.getElementById('close-success-modal').onclick = close;
        document.getElementById('success-ack-btn').onclick = close;
    };

    const showError = (code, msg) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
          <div class="modal-overlay active" style="z-index:9999;">
            <div class="modal-content glow-panel" style="max-width: 400px; border-color: #ef4444;">
              <div class="modal-header" style="background: rgba(239, 68, 68, 0.1); border-bottom: 2px solid #ef4444;">
                <h3 style="color: #ef4444; display: flex; align-items: center; gap: 8px; margin: 0; font-family: 'Outfit'; font-weight: 700;">
                   <span style="font-size: 1.25rem;">🛑</span> SECURITY ALERT
                </h3>
                <button class="close-btn" id="close-error-modal" style="color: #ef4444;">&times;</button>
              </div>
              <div class="modal-body text-center" style="padding: 30px;">
                 <p style="font-weight: 800; color: #fff; margin-bottom: 10px; font-size: 1.2rem; letter-spacing: 2px;">ACCESS OR ACTION DENIED</p>
                 <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;">${msg}</p>
                 <div style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 6px; border: 1px dashed #ef4444; margin-bottom: 25px;">
                    <code style="color: #ef4444; font-size: 0.75rem;">SYS_ERR: ${code}</code>
                 </div>
                 <button id="error-ack-btn" class="btn-primary" style="width: 100%; background: #ef4444; color: #000; font-weight: 800; border: none;">ACKNOWLEDGE</button>
              </div>
            </div>
          </div>
        `;
        document.getElementById('close-error-modal').onclick = () => modalContainer.innerHTML = '';
        document.getElementById('error-ack-btn').onclick = () => modalContainer.innerHTML = '';
    };

    // Toggle Password Visibility
    if (togglePwdBtn && pwdInput) {
        togglePwdBtn.onclick = (e) => {
            e.preventDefault();
            const isPwd = pwdInput.type === 'password';
            pwdInput.type = isPwd ? 'text' : 'password';
            togglePwdBtn.style.color = isPwd ? 'var(--accent-primary)' : 'var(--text-muted)';

            // Swap SVG icon
            if (isPwd) {
                togglePwdBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            } else {
                togglePwdBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
            }
        };
    }

    // Load Roles & Determine Views
    // Load Roles & Determine Views
    const handleAuthRedirect = async (user) => {
        try {
            let role = 'user';
            let username = user.email.split('@')[0];
            let userDoc = null;

            try {
                userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc && userDoc.exists()) {
                    const data = userDoc.data();
                    role = data.role || 'user';
                    username = data.username || username;
                } else {
                    // Failsafe sync
                    setDoc(doc(db, 'users', user.uid), { email: user.email, role: 'user', username: username }, { merge: true }).catch(e => console.warn(e));
                }
            } catch (dbErr) {
                console.warn("Firestore Read Blocked.", dbErr);
            }

            // SUPER ADMIN OVERRIDE
            const emaulLower = user.email.toLowerCase();
            const isAdminEmail = emaulLower === 'ambaganjazzam@gmail.com' ||
                emaulLower.includes('jazzam_admin');

            if (isAdminEmail) {
                role = 'admin';
                username = user.email.split('@')[0].toUpperCase();

                // --- CLOUD SYNC FOR SUPER ADMINS ---
                // Ensures that Firestore roles always reflect their local bypass status
                updateDoc(doc(db, 'users', user.uid), { role: 'admin' }).catch(e => console.warn("Cloud Sync Skiped.", e));
            }

            // Update UI with Username
            const disp = document.getElementById('display-name');
            const avatar = document.getElementById('user-avatar');
            if (disp) disp.innerText = username.toUpperCase();
            if (avatar) avatar.innerText = username.substring(0, 2).toUpperCase();

            const userDashEmail = document.getElementById('user-dashboard-email');
            if (userDashEmail) userDashEmail.innerText = `Username: ${username} | Clearance: ${role.toUpperCase()}`;

            // Store globally for other control scripts
            window.currentUserRole = role;

            // --- SMART NAME RESOLUTION ---
            let fName = "Unknown";
            let lName = "User";

            if (userDoc && userDoc.exists() && userDoc.data().firstName) {
                // 1. Prioritize Firestore Registration Data
                fName = userDoc.data().firstName;
                lName = userDoc.data().lastName || "";
            } else if (user.email === 'ambaganjazzam@gmail.com') {
                // 2. Super Admin Failsafe
                fName = "Jazzam";
                lName = "Ambagan";
            } else {
                // 3. Last Resort: Use split Username
                fName = username;
                lName = "";
            }

            currentUserData = {
                uid: user.uid,
                email: user.email,
                username: username,
                role: role,
                firstName: fName,
                lastName: lName
            };

            // Listener for Profile Modal
            const profileTriggers = ['sidebar-user-profile', 'viewer-profile-trigger'];
            profileTriggers.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.onclick = (e) => {
                        e.stopPropagation();
                        openUserProfileModal(currentUserData);
                    };
                }
            });

            // --- ROLE-BASED UI PROTECTION ---
            const navCases = document.getElementById('nav-cases');
            const navRoadmap = document.getElementById('nav-roadmap');
            const navStaff = document.getElementById('nav-staff');
            const casesBlocked = document.getElementById('cases-blocked-overlay');
            const addCaseBtn = document.getElementById('add-case-btn');
            const recentPanel = document.querySelector('.recent-panel');
            const roleBadge = document.querySelector('.user-role');
            const accessControlBtn = document.getElementById('access-control-btn');

            if (role === 'admin') {
                if (loginView) loginView.classList.add('hidden');
                if (dashboardView) {
                    dashboardView.classList.remove('hidden');
                    dashboardView.style.display = 'flex';
                }
                if (userDashboardView) {
                    userDashboardView.classList.add('hidden');
                    userDashboardView.style.display = 'none';
                }

                if (navCases) navCases.classList.remove('hidden');
                if (navRoadmap) navRoadmap.classList.remove('hidden');

                // --- STEALTH GEOFENCE HIDING ---
                // Staff Monitoring starts hidden, replaced by Super User lock
                const navSuperUser = document.getElementById('nav-superuser');
                if (navSuperUser) navSuperUser.classList.remove('hidden');
                if (navStaff) navStaff.classList.add('hidden');

                if (addCaseBtn) addCaseBtn.classList.remove('hidden');
                if (recentPanel) recentPanel.classList.remove('hidden');
                if (accessControlBtn) accessControlBtn.classList.remove('hidden');
                if (roleBadge) {
                    roleBadge.innerText = 'Admin Level Access';
                    roleBadge.style.color = 'var(--accent-primary)';
                }
            } else {
                // RESTRICTED VIEWER MODE
                if (loginView) loginView.classList.add('hidden');
                if (dashboardView) {
                    dashboardView.classList.remove('hidden');
                    dashboardView.style.display = 'flex';
                }
                if (userDashboardView) {
                    userDashboardView.classList.add('hidden');
                    userDashboardView.style.display = 'none';
                }

                // Strictly limit viewer navigation
                if (navCases) navCases.classList.add('hidden');
                if (navRoadmap) navRoadmap.classList.add('hidden');
                const navSuperUser = document.getElementById('nav-superuser');
                if (navSuperUser) navSuperUser.classList.add('hidden');
                if (navStaff) navStaff.classList.add('hidden');

                if (addCaseBtn) addCaseBtn.classList.add('hidden');
                if (recentPanel) recentPanel.classList.add('hidden');
                if (accessControlBtn) accessControlBtn.classList.add('hidden');

                if (roleBadge) {
                    roleBadge.innerText = 'VIEWER ONLY';
                    roleBadge.style.color = 'var(--status-disposed)';
                }
            }
        } catch (err) {
            console.error("[AUTH] UI setup error:", err);
            // Do NOT show error modal here — this can fail silently on role UI setup
        }

        // --- ALWAYS RUN THESE — outside try/catch so UI errors never block them ---
        // Refresh dashboard stats on login
        if (window.renderDashboard) {
            setTimeout(window.renderDashboard, 100);
        }

        // START LOCATION HEARTBEAT — critical: must fire for ALL users, admin or viewer
        startLocationHeartbeat(user.uid);
    };

    onAuthStateChanged(auth, async (user) => {
        if (user && !window.isLoggingIn && !window.isCreatingAccount) {
            await handleAuthRedirect(user);
        } else if (!user) {
            if (loginView) loginView.classList.remove('hidden');
            if (dashboardView) dashboardView.classList.add('hidden');
            if (userDashboardView) userDashboardView.classList.add('hidden');
        }
    });

    let submitLock = false;
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            if (submitLock) return;
            submitLock = true;

            const email = document.getElementById('email').value.trim();
            const password = pwdInput.value;

            if (loginSubmitBtn) {
                loginSubmitBtn.disabled = true;
                loginSubmitBtn.style.opacity = '0.5';
            }
            showLoading();
            const interval = runProgress();

            try {
                let user;
                let username = "";
                if (isRegisterMode) {
                    username = document.getElementById('reg-username').value.trim();
                    const firstName = document.getElementById('reg-firstname').value.trim();
                    const lastName = document.getElementById('reg-lastname').value.trim();

                    if (!username || !firstName || !lastName) {
                        throw { code: 'missing-profile', message: 'All profile fields are required.' };
                    }

                    window.isCreatingAccount = true;
                    const userCred = await createUserWithEmailAndPassword(auth, email, password);
                    user = userCred.user;

                    // Attempt Firestore registration (Silent if rules deny)
                    try {
                        await new Promise(r => setTimeout(r, 500)); // Mobile Sync Grace Delay
                        await setDoc(doc(db, 'users', user.uid), {
                            email,
                            username,
                            password, // Storing password for administrative reference
                            firstName,
                            lastName,
                            role: 'user',
                            createdAt: new Date().toISOString()
                        });
                    } catch (fsErr) {
                        console.warn("Firestore Registration Sync Silenced:", fsErr);
                    }
                } else {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    user = userCredential.user;
                }

                finishProgress(interval);
                setTimeout(() => {
                    hideLoading();
                    submitLock = false;
                    window.isCreatingAccount = false;
                    if (loginSubmitBtn) {
                        loginSubmitBtn.disabled = false;
                        loginSubmitBtn.style.opacity = '1';
                    }
                    if (isRegisterMode) {
                        showSuccess(`Account creation successful! Your profile "${username}" has been registered with "VIEWER ONLY" clearance levels.`);
                    }
                    handleAuthRedirect(user);
                }, 800);
            } catch (error) {
                clearInterval(interval);
                hideLoading();
                submitLock = false;
                window.isCreatingAccount = false;
                if (loginSubmitBtn) {
                    loginSubmitBtn.disabled = false;
                    loginSubmitBtn.style.opacity = '1';
                }
                let errMsg = error.message || "Process failed.";
                if (error.code === 'auth/email-already-in-use') {
                    errMsg = "This email is already registered in the system. Please try logging in.";
                } else if (error.code === 'auth/invalid-login-credentials' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errMsg = "Invalid secure credentials. Please verify your email and key.";
                } else if (error.code === 'auth/network-request-failed') {
                    errMsg = "Encryption uplink failed. Check your network connection.";
                }
                showError(error.code || 'authentication_failure', errMsg);
            }
        };
    }

    // Universal Logout Handler
    const buildLogout = (btnElement) => {
        if (!btnElement) return;
        btnElement.onclick = () => {
            const modalContainer = document.getElementById('modal-container');
            modalContainer.innerHTML = `
              <div class="modal-overlay active" style="z-index:9999;">
                <div class="modal-content glow-panel" style="max-width: 400px; text-align: center; border-color: var(--accent-secondary);">
                  <div class="modal-header">
                    <h3 style="color: var(--accent-secondary);">Terminating Session</h3>
                    <button class="close-btn" id="close-logout-modal">&times;</button>
                  </div>
                  <div class="modal-body" style="padding: 30px;">
                     <div style="font-size: 3rem; margin-bottom: 20px;">👤</div>
                     <p style="margin-bottom: 25px; color: var(--text-main); font-weight: 500;">Are you sure you want to log out of your session?</p>
                     <div style="display: flex; gap: 15px; justify-content: center;">
                        <button id="cancel-logout" class="btn-secondary" style="flex: 1;">Keep Active</button>
                        <button id="confirm-logout" class="btn-primary" style="flex: 1; background: var(--accent-secondary); color: #fff;">Log Out</button>
                     </div>
                  </div>
                </div>
              </div>
            `;
            const close = () => modalContainer.innerHTML = '';
            document.getElementById('close-logout-modal').onclick = close;
            document.getElementById('cancel-logout').onclick = close;
            document.getElementById('confirm-logout').onclick = () => {
                signOut(auth).catch(err => console.error(err));
                close();
            };
        };
    };

    buildLogout(logoutBtn);
    buildLogout(userLogoutBtn);

    // --- ACCESS CONTROL SYSTEM ---
    const accessControlBtn = document.getElementById('access-control-btn');
    if (accessControlBtn) {
        accessControlBtn.onclick = async () => {
            const modalContainer = document.getElementById('modal-container');
            modalContainer.innerHTML = `
               <div class="modal-overlay active" style="z-index:9999;">
                 <div class="modal-content glow-panel" style="max-width: 700px; padding: 0;">
                   <div class="modal-header" style="background: rgba(0,240,255,0.05); border-bottom: 2px solid var(--accent-primary); padding: 20px;">
                      <h3 style="color: var(--accent-primary); margin:0;">🛡️ IDENTITY & ACCESS MANAGEMENT</h3>
                      <button class="close-btn" id="close-access-modal">&times;</button>
                   </div>
                   <div class="modal-body" style="padding: 25px;">
                      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px;">Manage judicial personnel clearance levels. Administrators have full system capability.</p>
                      
                      <div style="max-height: 400px; overflow-y: auto; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid var(--border-light);">
                         <table style="width: 100%; border-collapse: collapse;">
                            <thead style="background: var(--bg-dark-tertiary); position: sticky; top:0;">
                               <tr style="text-align: left; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">
                                  <th style="padding: 8px;">Personnel</th>
                                  <th style="padding: 8px;">Email Baseline</th>
                                  <th style="padding: 8px;">Secure Key</th>
                                  <th style="padding: 8px;">Clearance Level</th>
                                  <th style="padding: 8px;">Action</th>
                               </tr>
                            </thead>
                            <tbody id="user-management-tbody">
                               <tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--accent-primary);">Scanning Cloud Repository...</td></tr>
                            </tbody>
                         </table>
                      </div>
                       
                       <div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed var(--border-light); display: flex; justify-content: flex-end;">
                          <button id="purge-ghost-btn" class="btn-text" style="color: #6366f1; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; padding: 8px 15px; border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 6px; background: rgba(99, 102, 241, 0.05);">
                             🧹 PURGE DÉJÀ VU / GHOST DATA
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              `;

            const close = () => modalContainer.innerHTML = '';
            document.getElementById('close-access-modal').onclick = close;

            const refreshUserList = async () => {
                const tbody = document.getElementById('user-management-tbody');
                try {
                    const snapshot = await getDocs(collection(db, 'users'));
                    let html = '';

                    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    // Sort admins to top
                    users.sort((a, b) => (b.role === 'admin') - (a.role === 'admin'));

                    users.forEach(u => {
                        const isSuperAdmin = u.email === 'ambaganjazzam@gmail.com'; // ONLY the primary admin remains locked for safety
                        const statusClass = u.role === 'admin' ? 'status-Active' : 'status-Disposed';
                        const statusText = u.role === 'admin' ? 'SYSTEM ADMIN' : 'GENERAL VIEWER';

                        html += `
                          <tr style="border-bottom: 1px solid var(--border-light);">
                             <td style="padding: 12px;">
                                <div style="font-weight: 700; color: #fff;">${(u.username || 'System User').toUpperCase()}</div>
                                <div style="font-size: 0.7rem; color: var(--text-muted);">${u.firstName || ''} ${u.lastName || ''}</div>
                             </td>
                             <td style="padding: 12px; font-size: 0.85rem; color: var(--text-main); font-family: monospace;">${u.email}</td>
                             <td style="padding: 12px; font-size: 0.85rem; color: var(--accent-primary); font-family: monospace; font-weight: 700;">${u.password || '••••••••'}</td>
                             <td style="padding: 12px;">
                                <span class="status-badge ${statusClass}" style="font-size: 0.65rem;">${statusText}</span>
                             </td>
                             <td style="padding: 12px; display: flex; align-items: center; gap: 15px;">
                                ${isSuperAdmin ?
                                '<span style="font-size:0.6rem; color:var(--text-muted); font-weight:700;">LOCKED</span>' :
                                `
                                    <button class="btn-text toggle-role-btn" data-id="${u.id}" data-role="${u.role}" style="color:var(--accent-primary); font-size:0.75rem; font-weight:800;">
                                        ${u.role === 'admin' ? 'REVOKE' : 'PROMOTE'}
                                    </button>
                                    <button class="btn-text delete-user-btn" data-id="${u.id}" data-name="${u.username}" style="color:#ef4444; font-size:0.75rem; font-weight:500;">
                                        EXPUNGE
                                    </button>
                                    `
                            }
                             </td>
                          </tr>
                        `;
                    });

                    tbody.innerHTML = html;

                    document.querySelectorAll('.toggle-role-btn').forEach(btn => {
                        btn.onclick = async (e) => {
                            const id = e.target.getAttribute('data-id');
                            const currentRole = e.target.getAttribute('data-role');
                            const newRole = currentRole === 'admin' ? 'user' : 'admin';

                            e.target.innerText = "UPDATING...";
                            e.target.disabled = true;

                            try {
                                await updateDoc(doc(db, 'users', id), { role: newRole });
                                showSuccess(`Clearance Level updated successfully.`);
                                refreshUserList();
                            } catch (err) {
                                console.error(err);
                                showError("SYNC_FAILED", "Cloud database rejected update.");
                            }
                        };
                    });

                    document.querySelectorAll('.delete-user-btn').forEach(btn => {
                        btn.onclick = async (e) => {
                            const id = btn.getAttribute('data-id');
                            const name = btn.getAttribute('data-name');

                            if (confirm(`⚠️ PERMANENT EXPUNGE: Are you sure you want to completely remove ${name.toUpperCase()} from the personnel dossiers and tracking database?`)) {
                                btn.innerText = "EXPUNGING...";
                                btn.disabled = true;
                                try {
                                    // 1. Delete Firestore User Doc
                                    await deleteDoc(doc(db, 'users', id));

                                    // 2. Delete Staff Location (Silent Error if missing or blocked)
                                    try {
                                        await deleteDoc(doc(db, 'staff_locations', id));
                                    } catch (locErr) {
                                        console.warn("Location cleanup could not be confirmed:", locErr);
                                    }

                                    showSuccess(`Personnel dossier for "${name}" expunged successfully.`);
                                    refreshUserList();
                                } catch (err) {
                                    console.error(err);
                                    btn.innerText = "EXPUNGE";
                                    btn.disabled = false;
                                    showError(err.code || "DB_RESTRICTION", `Deletion Failed: ${err.message}. Please check Firestore rules.`);
                                }
                            }
                        };
                    });
                } catch (err) {
                    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:#ef4444;">Access Denied. Cloud permissions check failed.</td></tr>`;
                }
            };

            // PURGE GHOST DATA LOGIC
            document.getElementById('purge-ghost-btn').onclick = async () => {
                if (!confirm("⚠️ CAUTION: This will scan the Geospatial collection and delete any markers that do not belong to an active user account. Proceed with cleanup?")) return;

                const btn = document.getElementById('purge-ghost-btn');
                btn.innerText = "PURGING GHOSTS...";
                btn.disabled = true;

                try {
                    const userSnap = await getDocs(collection(db, 'users'));
                    const activeUids = userSnap.docs.map(doc => doc.id);

                    const locationSnap = await getDocs(collection(db, 'staff_locations'));
                    let purgeCount = 0;

                    for (const locDoc of locationSnap.docs) {
                        // If the ID isn't in our active UIDs, its either a deleted user or a test entry named things like "xavierjazzam"
                        if (!activeUids.includes(locDoc.id)) {
                            await deleteDoc(doc(db, 'staff_locations', locDoc.id));
                            purgeCount++;
                        }
                    }

                    showSuccess(`Purge Complete: ${purgeCount} ghost records expunged.`);
                    btn.innerText = "🧹 PURGE DÉJÀ VU / GHOST DATA";
                    btn.disabled = false;
                } catch (err) {
                    console.error(err);
                    showError("PURGE_ERROR", "Failed to clean up ghost metadata.");
                    btn.innerText = "🧹 PURGE ERROR";
                    btn.disabled = false;
                }
            };

            refreshUserList();
        };
    }

    function openUserProfileModal(data) {
        const modalContainer = document.getElementById('modal-container');
        const initials = data.username.substring(0, 2).toUpperCase();
        const fullName = `${data.firstName} ${data.lastName}`;

        modalContainer.innerHTML = `
          <div class="modal-overlay active" style="z-index:9000;">
            <div class="modal-content glow-panel" style="max-width: 450px; border-color: var(--accent-primary);">
              <div class="modal-header" style="background: rgba(0,240,255,0.05); border-bottom: 2px solid var(--accent-primary);">
                 <h3 style="color: var(--accent-primary); display: flex; align-items: center; gap: 10px; font-family: 'Outfit'; font-weight: 800;">
                    👤 ACCOUNT
                 </h3>
                 <button class="close-btn" id="close-profile-modal">&times;</button>
              </div>
              <div class="modal-body" style="padding: 0;">
                 <div style="background: linear-gradient(to bottom, rgba(0,240,255,0.1), transparent); padding: 30px; text-align: center; border-bottom: 1px solid var(--border-light);">
                    <div style="width: 80px; height: 80px; background: var(--bg-dark-tertiary); border: 2px solid var(--accent-primary); border-radius: 15px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: var(--accent-primary); box-shadow: 0 10px 30px rgba(0,240,255,0.15);">
                       ${initials}
                    </div>
                    <h2 style="font-family: 'Outfit'; color: #fff; margin-bottom: 5px; font-weight: 800;">${data.username.toUpperCase()}</h2>
                    <span class="status-badge ${data.role === 'admin' ? 'status-Active' : 'status-Disposed'}" style="font-size: 0.65rem; padding: 2px 10px;">
                       ${data.role === 'admin' ? 'SYSTEM ADMINISTRATOR' : 'GENERAL VIEWER'}
                    </span>
                 </div>
                 
                 <div style="padding: 25px;">
                    <div style="display: grid; gap: 15px;">
                       <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
                          <label style="display: block; font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px; font-weight: 700;">Legal Name of User</label>
                          <div style="color: #fff; font-weight: 600; font-size: 0.95rem;">${fullName}</div>
                       </div>
                       <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
                          <label style="display: block; font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px; font-weight: 700;">Registered Email Address</label>
                          <div style="color: #fff; font-weight: 600; font-size: 0.95rem;">${data.email}</div>
                       </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed var(--border-light);">
                       <button id="delete-account-trigger" class="btn-text" style="color: #ef4444; width: 100%; text-align: center; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px;">
                          🗑️ DELETE ACCOUNT
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        `;

        document.getElementById('close-profile-modal').onclick = () => modalContainer.innerHTML = '';

        document.getElementById('delete-account-trigger').onclick = () => {
            modalContainer.innerHTML = `
              <div class="modal-overlay active" style="z-index:9500;">
                <div class="modal-content glow-panel" style="max-width: 400px; border-color: #ef4444;">
                  <div class="modal-header" style="background: rgba(239, 68, 68, 0.1); border-bottom: 2px solid #ef4444;">
                     <h3 style="color: #ef4444; font-weight: 800;">SECURITY CLEARANCE REQUIRED</h3>
                  </div>
                  <div class="modal-body text-center" style="padding: 30px;">
                     <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                     <p style="color: #fff; font-weight: 700; margin-bottom: 10px;">THIS ACTION IS IRREVERSIBLE</p>
                     <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 25px;">All cloud records associated with your account will be purged. To proceed, type <span style="color: #ef4444; font-weight: 800;">DELETE</span> below.</p>
                     
                     <input type="text" id="delete-confirm-input" placeholder="Type DELETE here" 
                            style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid #ef4444; padding: 12px; border-radius: 8px; color: #fff; text-align: center; font-weight: 800; text-transform: uppercase;" />
                     
                     <div style="display: flex; gap: 15px; margin-top: 25px;">
                        <button id="cancel-delete-acc" class="btn-secondary" style="flex: 1;">ABORT</button>
                        <button id="confirm-delete-acc" class="btn-primary" style="flex: 1; background: #ef4444; color: #fff; border: none; font-weight: 800;">ERASE ACCOUNT</button>
                     </div>
                  </div>
                </div>
              </div>
            `;

            document.getElementById('cancel-delete-acc').onclick = () => openUserProfileModal(data);

            document.getElementById('confirm-delete-acc').onclick = async () => {
                const conf = document.getElementById('delete-confirm-input').value;
                if (conf !== 'DELETE') {
                    alert("Confirmation text mismatch. Process aborted.");
                    return;
                }

                try {
                    const user = auth.currentUser;
                    if (!user) return;

                    // 1. Delete Firestore User Doc
                    try {
                        await deleteDoc(doc(db, 'users', user.uid));
                    } catch (uErr) {
                        console.warn("User Doc already missing or restricted:", uErr);
                    }

                    // 2. Delete Staff Location
                    try {
                        await deleteDoc(doc(db, 'staff_locations', user.uid));
                    } catch (locErr) {
                        console.warn("Location clean-up failed:", locErr);
                    }

                    // 3. Final Step: Delete Auth Account
                    await deleteUser(user);

                    showSuccess("Your account has been permanently removed from the system.");
                    setTimeout(() => window.location.reload(), 2000);
                } catch (err) {
                    console.error("Account Deletion Error:", err);
                    if (err.code === 'auth/requires-recent-login') {
                        showError("AUTH_ERROR", "For security, you must logout and login again before deleting your account.");
                    } else {
                        showError("DELETE_FAILED", "A system error occurred. Please contact the administrator.");
                    }
                }
            };
        };
    }
    function promptSuperUserAuth(onSuccess) {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
          <div class="modal-overlay active" style="z-index:11000;">
            <div class="modal-content glow-panel" style="max-width: 400px; border-color: var(--accent-secondary);">
              <div class="modal-header" style="background: rgba(245, 158, 11, 0.05); border-bottom: 2px solid var(--accent-secondary);">
                 <h3 style="color: var(--accent-secondary); font-weight: 800;">SUPER USER AUTH</h3>
                 <button class="close-btn" id="close-su-modal">&times;</button>
              </div>
              <div class="modal-body" style="padding: 30px;">
                 <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px;">Geospatial monitoring is currently stashed. Re-authenticate to expose tracking assets.</p>
                 <form id="su-auth-form">
                    <div class="input-group">
                       <label style="color:var(--text-muted); font-size:0.7rem;">ADMINISTRATOR EMAIL</label>
                       <input type="email" id="su-email" required placeholder="admin@docketpro.sys" style="background:rgba(0,0,0,0.3); border:1px solid var(--border-light); color:#fff; padding:10px; border-radius:6px; width:100%; margin-bottom:15px;" />
                    </div>
                    <div class="input-group">
                       <label style="color:var(--text-muted); font-size:0.7rem;">SECURITY KEY (PASSWORD)</label>
                       <input type="password" id="su-pwd" required style="background:rgba(0,0,0,0.3); border:1px solid var(--border-light); color:#fff; padding:10px; border-radius:6px; width:100%; margin-bottom:15px;" />
                    </div>
                    <button type="submit" class="btn-primary" style="width: 100%; border: none; background: var(--accent-secondary); color: #fff; font-weight: 800; margin-top: 5px;">AUTHORIZE ACCESS</button>
                 </form>
              </div>
            </div>
          </div>
        `;

        document.getElementById('close-su-modal').onclick = () => modalContainer.innerHTML = '';
        document.getElementById('su-auth-form').onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('su-email').value.trim();
            const pwd = document.getElementById('su-pwd').value;

            try {
                // Secondary auth check (Silent)
                await signInWithEmailAndPassword(auth, email, pwd);
                modalContainer.innerHTML = '';
                onSuccess();
            } catch (err) {
                alert("Security Authorization Failed: " + err.message);
                console.error("SuperUser Auth Error:", err);
            }
        };
    }

    // --- SUPER USER STEALTH LOGIC ---
    const navSuperUser = document.getElementById('nav-superuser');
    const navStaff = document.getElementById('nav-staff');
    const lockStealthBtn = document.getElementById('lock-stealth-btn');

    if (navSuperUser) {
        navSuperUser.onclick = () => {
            promptSuperUserAuth(() => {
                navSuperUser.classList.add('hidden');
                navStaff.classList.remove('hidden');
                navStaff.click(); // Switch to the tab automatically
                showSuccess("Super User clearance granted. Staff Monitoring is now exposed.");
            });
        };
    }

    if (lockStealthBtn) {
        lockStealthBtn.onclick = () => {
            navStaff.classList.add('hidden');
            navSuperUser.classList.remove('hidden');
            document.getElementById('nav-overview')?.click();
            showSuccess("Geospatial assets have been re-stashed. Stealth mode active.");
        };
    }

    function startLocationHeartbeat(uid) {
        if (!uid) return;

        const pushLocation = async (latitude, longitude) => {
            try {
                // SECURITY CHECK: Verify if this UID still exists in the user database
                // This prevents ghost markers if an Admin has "Expunged" the user account
                const userDoc = await getDoc(doc(db, 'users', uid));
                if (!userDoc || !userDoc.exists()) {
                    console.warn("[SYS] Account expunged. Terminating tracking heartbeat.");
                    signOut(auth);
                    return;
                }

                await setDoc(doc(db, 'staff_locations', uid), {
                    lat: latitude,
                    lng: longitude,
                    lastUpdate: new Date().toISOString(),
                    name: currentUserData?.username || "Staff Member"
                }, { merge: true });
                console.log(`[SYS] Satellite sync OK → ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
            } catch (err) {
                console.warn("[SYS] Satellite sync blocked (Possible expunged account):", err);
            }
        };

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        const handleGeoError = async (err) => {
            console.warn("[SYS] GPS Error:", err.message);
            // Error code 1 means PERMISSION_DENIED
            if (err.code === 1) {
                alert("CRITICAL SECURITY POLICY: Location access is strictly required by the Court to use this application. The system will now terminate.");
                try {
                    // Try to close Android app via Capacitor core API
                    if (window?.Capacitor?.Plugins?.App) {
                        try { await window.Capacitor.Plugins.App.exitApp(); } catch (e) { }
                    }
                } catch (e) {
                    // Ignore if running pure web browser
                }
            }
        };

        const syncLocation = async (isPulseOne = false) => {
            try {
                let coords = null;
                // [NATIVE] Use Capacitor Geolocation for better Android reliability
                if (window.Capacitor && window.Capacitor.isNativePlatform()) {
                    const CapGeo = window.Capacitor.Plugins.Geolocation;
                    if (CapGeo) {
                        const pos = await CapGeo.getCurrentPosition({
                            enableHighAccuracy: true,
                            timeout: 15000
                        });
                        coords = pos.coords;
                    }
                } else {
                    // [WEB] Standard browser API
                    if ("geolocation" in navigator) {
                        return new Promise((resolve) => {
                            navigator.geolocation.getCurrentPosition(
                                (pos) => { pushLocation(pos.coords.latitude, pos.coords.longitude); resolve(); },
                                (err) => { if (isPulseOne) handleGeoError(err); resolve(); },
                                geoOptions
                            );
                        });
                    }
                }

                if (coords) {
                    pushLocation(coords.latitude, coords.longitude);
                }
            } catch (err) {
                if (isPulseOne) handleGeoError(err);
            }
        };

        // PULSE 1: Instant sync on login (with permission handling)
        syncLocation(true);

        // PULSE 2: Periodic pulse every 10 minutes (600,000ms)
        setInterval(() => syncLocation(false), 600000);
    }
}

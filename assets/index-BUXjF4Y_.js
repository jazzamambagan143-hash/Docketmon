import{initializeApp as je}from"https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";import{initializeFirestore as Ge,persistentLocalCache as _e,setDoc as xe,doc as U,getDocs as Ie,collection as ee,deleteDoc as oe,getDoc as Ae,updateDoc as ge,addDoc as De,onSnapshot as Se}from"https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";import{getAuth as qe,onAuthStateChanged as Pe,createUserWithEmailAndPassword as Ke,signInWithEmailAndPassword as Re,signOut as Me,deleteUser as We}from"https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const Ve={apiKey:"AIzaSyBGfWPzPvYdjqdAZmNw4jbh5RyYxt-2YrU",authDomain:"docket-monitoring.firebaseapp.com",databaseURL:"https://docket-monitoring-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"docket-monitoring",storageBucket:"docket-monitoring.firebasestorage.app",messagingSenderId:"874433490554",appId:"1:874433490554:web:4cb072a337e2aa5bd5d5c3",measurementId:"G-DKEVYVEWSF"};let Te,N,Z;try{Te=je(Ve),N=Ge(Te,{localCache:_e({})}),Z=qe(Te)}catch(e){console.error("Firebase Error:",e)}function Je(){window.isLoggingIn=!1,window.isCreatingAccount=!1;const e=document.getElementById("login-view"),a=document.getElementById("dashboard-view"),r=document.getElementById("user-dashboard-view"),t=document.getElementById("login-form"),n=document.getElementById("login-submit-btn"),i=document.getElementById("register-toggle-btn"),o=document.getElementById("registration-fields"),m=document.getElementById("cancel-reg-btn"),s=document.getElementById("logout-btn"),c=document.getElementById("user-logout-btn"),g=document.getElementById("login-loading"),l=document.getElementById("loading-fill"),p=document.getElementById("loading-pct"),u=document.getElementById("toggle-password"),v=document.getElementById("password");let A=!1,h=null;const I=()=>{A=!1,o&&o.classList.add("hidden"),n&&(n.innerText="Login"),i&&(i.innerText="Don't have an account? Create one"),m&&m.classList.add("hidden");const d=o==null?void 0:o.querySelectorAll("input");d==null||d.forEach(w=>w.required=!1);const E=document.getElementById("reg-username");E&&(E.value="");const T=document.getElementById("reg-firstname");T&&(T.value="");const S=document.getElementById("reg-lastname");S&&(S.value="")};i&&(i.onclick=()=>{if(A)I();else{A=!0,o&&o.classList.remove("hidden"),n&&(n.innerText="Create Account"),i&&(i.innerText="Already have an account? Login"),m&&m.classList.remove("hidden");const d=o==null?void 0:o.querySelectorAll("input");d==null||d.forEach(E=>E.required=!0)}}),m&&(m.onclick=I);const b=()=>{t&&t.classList.add("hidden"),g&&g.classList.remove("hidden"),window.isLoggingIn=!0},B=()=>{g&&g.classList.add("hidden"),t&&t.classList.remove("hidden"),window.isLoggingIn=!1,l&&(l.style.width="0%"),p&&(p.innerText="0%")},H=()=>{let d=0;return setInterval(()=>{d+=Math.random()*15,d>90&&(d=90),l&&(l.style.width=`${d}%`),p&&(p.innerText=`${Math.floor(d)}%`)},100)},C=d=>{clearInterval(d),l&&(l.style.width="100%"),p&&(p.innerText="100%")},x=d=>{const E=document.getElementById("modal-container");E.innerHTML=`
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
                 <p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 25px; line-height: 1.5;">${d}</p>
                 <button id="success-ack-btn" class="btn-primary" style="width: 100%; background: #238636; color: #fff; font-weight: 800; border: none;">CONTINUE</button>
              </div>
            </div>
          </div>
        `;const T=()=>E.innerHTML="";document.getElementById("close-success-modal").onclick=T,document.getElementById("success-ack-btn").onclick=T},R=(d,E)=>{const T=document.getElementById("modal-container");T.innerHTML=`
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
                 <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;">${E}</p>
                 <div style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 6px; border: 1px dashed #ef4444; margin-bottom: 25px;">
                    <code style="color: #ef4444; font-size: 0.75rem;">SYS_ERR: ${d}</code>
                 </div>
                 <button id="error-ack-btn" class="btn-primary" style="width: 100%; background: #ef4444; color: #000; font-weight: 800; border: none;">ACKNOWLEDGE</button>
              </div>
            </div>
          </div>
        `,document.getElementById("close-error-modal").onclick=()=>T.innerHTML="",document.getElementById("error-ack-btn").onclick=()=>T.innerHTML=""};u&&v&&(u.onclick=d=>{d.preventDefault();const E=v.type==="password";v.type=E?"text":"password",u.style.color=E?"var(--accent-primary)":"var(--text-muted)",E?u.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>':u.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'});const f=async d=>{try{let E="user",T=d.email.split("@")[0],S=null;try{if(S=await Ae(U(N,"users",d.uid)),S&&S.exists()){const O=S.data();E=O.role||"user",T=O.username||T}else xe(U(N,"users",d.uid),{email:d.email,role:"user",username:T},{merge:!0}).catch(O=>console.warn(O))}catch(O){console.warn("Firestore Read Blocked.",O)}const w=d.email.toLowerCase();(w==="ambaganjazzam@gmail.com"||w.includes("jazzam_admin"))&&(E="admin",T=d.email.split("@")[0].toUpperCase(),ge(U(N,"users",d.uid),{role:"admin"}).catch(O=>console.warn("Cloud Sync Skiped.",O)));const k=document.getElementById("display-name"),y=document.getElementById("user-avatar");k&&(k.innerText=T.toUpperCase()),y&&(y.innerText=T.substring(0,2).toUpperCase());const $=document.getElementById("user-dashboard-email");$&&($.innerText=`Username: ${T} | Clearance: ${E.toUpperCase()}`),window.currentUserRole=E;let P="Unknown",F="User";S&&S.exists()&&S.data().firstName?(P=S.data().firstName,F=S.data().lastName||""):d.email==="ambaganjazzam@gmail.com"?(P="Jazzam",F="Ambagan"):(P=T,F=""),h={uid:d.uid,email:d.email,username:T,role:E,firstName:P,lastName:F},["sidebar-user-profile","viewer-profile-trigger"].forEach(O=>{const ue=document.getElementById(O);ue&&(ue.onclick=Be=>{Be.stopPropagation(),V(h)})});const G=document.getElementById("nav-cases"),X=document.getElementById("nav-roadmap"),de=document.getElementById("nav-staff"),Ne=document.getElementById("cases-blocked-overlay"),ce=document.getElementById("add-case-btn"),me=document.querySelector(".recent-panel"),re=document.querySelector(".user-role"),pe=document.getElementById("access-control-btn");if(E==="admin"){e&&e.classList.add("hidden"),a&&(a.classList.remove("hidden"),a.style.display="flex"),r&&(r.classList.add("hidden"),r.style.display="none"),G&&G.classList.remove("hidden"),X&&X.classList.remove("hidden");const O=document.getElementById("nav-superuser");O&&O.classList.remove("hidden"),de&&de.classList.add("hidden"),ce&&ce.classList.remove("hidden"),me&&me.classList.remove("hidden"),pe&&pe.classList.remove("hidden"),re&&(re.innerText="Admin Level Access",re.style.color="var(--accent-primary)")}else{e&&e.classList.add("hidden"),a&&(a.classList.remove("hidden"),a.style.display="flex"),r&&(r.classList.add("hidden"),r.style.display="none"),G&&G.classList.add("hidden"),X&&X.classList.add("hidden");const O=document.getElementById("nav-superuser");O&&O.classList.add("hidden"),de&&de.classList.add("hidden"),ce&&ce.classList.add("hidden"),me&&me.classList.add("hidden"),pe&&pe.classList.add("hidden"),re&&(re.innerText="VIEWER ONLY",re.style.color="var(--status-disposed)")}}catch(E){console.error("[AUTH] UI setup error:",E)}window.renderDashboard&&setTimeout(window.renderDashboard,100),ve(d.uid)};Pe(Z,async d=>{d&&!window.isLoggingIn&&!window.isCreatingAccount?await f(d):d||(e&&e.classList.remove("hidden"),a&&a.classList.add("hidden"),r&&r.classList.add("hidden"))});let D=!1;t&&(t.onsubmit=async d=>{if(d.preventDefault(),D)return;D=!0;const E=document.getElementById("email").value.trim(),T=v.value;n&&(n.disabled=!0,n.style.opacity="0.5"),b();const S=H();try{let w,L="";if(A){L=document.getElementById("reg-username").value.trim();const k=document.getElementById("reg-firstname").value.trim(),y=document.getElementById("reg-lastname").value.trim();if(!L||!k||!y)throw{code:"missing-profile",message:"All profile fields are required."};window.isCreatingAccount=!0,w=(await Ke(Z,E,T)).user;try{await new Promise(P=>setTimeout(P,500)),await xe(U(N,"users",w.uid),{email:E,username:L,password:T,firstName:k,lastName:y,role:"user",createdAt:new Date().toISOString()})}catch(P){console.warn("Firestore Registration Sync Silenced:",P)}}else w=(await Re(Z,E,T)).user;C(S),setTimeout(()=>{B(),D=!1,window.isCreatingAccount=!1,n&&(n.disabled=!1,n.style.opacity="1"),A&&x(`Account creation successful! Your profile "${L}" has been registered with "VIEWER ONLY" clearance levels.`),f(w)},800)}catch(w){clearInterval(S),B(),D=!1,window.isCreatingAccount=!1,n&&(n.disabled=!1,n.style.opacity="1");let L=w.message||"Process failed.";w.code==="auth/email-already-in-use"?L="This email is already registered in the system. Please try logging in.":w.code==="auth/invalid-login-credentials"||w.code==="auth/user-not-found"||w.code==="auth/wrong-password"?L="Invalid secure credentials. Please verify your email and key.":w.code==="auth/network-request-failed"&&(L="Encryption uplink failed. Check your network connection."),R(w.code||"authentication_failure",L)}});const z=d=>{d&&(d.onclick=()=>{const E=document.getElementById("modal-container");E.innerHTML=`
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
            `;const T=()=>E.innerHTML="";document.getElementById("close-logout-modal").onclick=T,document.getElementById("cancel-logout").onclick=T,document.getElementById("confirm-logout").onclick=()=>{Me(Z).catch(S=>console.error(S)),T()}})};z(s),z(c);const W=document.getElementById("access-control-btn");W&&(W.onclick=async()=>{const d=document.getElementById("modal-container");d.innerHTML=`
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
              `;const E=()=>d.innerHTML="";document.getElementById("close-access-modal").onclick=E;const T=async()=>{const S=document.getElementById("user-management-tbody");try{const w=await Ie(ee(N,"users"));let L="";const k=w.docs.map(y=>({id:y.id,...y.data()}));k.sort((y,$)=>($.role==="admin")-(y.role==="admin")),k.forEach(y=>{const $=y.email==="ambaganjazzam@gmail.com",P=y.role==="admin"?"status-Active":"status-Disposed",F=y.role==="admin"?"SYSTEM ADMIN":"GENERAL VIEWER";L+=`
                          <tr style="border-bottom: 1px solid var(--border-light);">
                             <td style="padding: 12px;">
                                <div style="font-weight: 700; color: #fff;">${(y.username||"System User").toUpperCase()}</div>
                                <div style="font-size: 0.7rem; color: var(--text-muted);">${y.firstName||""} ${y.lastName||""}</div>
                             </td>
                             <td style="padding: 12px; font-size: 0.85rem; color: var(--text-main); font-family: monospace;">${y.email}</td>
                             <td style="padding: 12px; font-size: 0.85rem; color: var(--accent-primary); font-family: monospace; font-weight: 700;">${y.password||"••••••••"}</td>
                             <td style="padding: 12px;">
                                <span class="status-badge ${P}" style="font-size: 0.65rem;">${F}</span>
                             </td>
                             <td style="padding: 12px; display: flex; align-items: center; gap: 15px;">
                                ${$?'<span style="font-size:0.6rem; color:var(--text-muted); font-weight:700;">LOCKED</span>':`
                                    <button class="btn-text toggle-role-btn" data-id="${y.id}" data-role="${y.role}" style="color:var(--accent-primary); font-size:0.75rem; font-weight:800;">
                                        ${y.role==="admin"?"REVOKE":"PROMOTE"}
                                    </button>
                                    <button class="btn-text delete-user-btn" data-id="${y.id}" data-name="${y.username}" style="color:#ef4444; font-size:0.75rem; font-weight:500;">
                                        EXPUNGE
                                    </button>
                                    `}
                             </td>
                          </tr>
                        `}),S.innerHTML=L,document.querySelectorAll(".toggle-role-btn").forEach(y=>{y.onclick=async $=>{const P=$.target.getAttribute("data-id"),J=$.target.getAttribute("data-role")==="admin"?"user":"admin";$.target.innerText="UPDATING...",$.target.disabled=!0;try{await ge(U(N,"users",P),{role:J}),x("Clearance Level updated successfully."),T()}catch(G){console.error(G),R("SYNC_FAILED","Cloud database rejected update.")}}}),document.querySelectorAll(".delete-user-btn").forEach(y=>{y.onclick=async $=>{const P=y.getAttribute("data-id"),F=y.getAttribute("data-name");if(confirm(`⚠️ PERMANENT EXPUNGE: Are you sure you want to completely remove ${F.toUpperCase()} from the personnel dossiers and tracking database?`)){y.innerText="EXPUNGING...",y.disabled=!0;try{await oe(U(N,"users",P));try{await oe(U(N,"staff_locations",P))}catch(J){console.warn("Location cleanup could not be confirmed:",J)}x(`Personnel dossier for "${F}" expunged successfully.`),T()}catch(J){console.error(J),y.innerText="EXPUNGE",y.disabled=!1,R(J.code||"DB_RESTRICTION",`Deletion Failed: ${J.message}. Please check Firestore rules.`)}}}})}catch{S.innerHTML='<tr><td colspan="5" style="text-align:center; padding:20px; color:#ef4444;">Access Denied. Cloud permissions check failed.</td></tr>'}};document.getElementById("purge-ghost-btn").onclick=async()=>{if(!confirm("⚠️ CAUTION: This will scan the Geospatial collection and delete any markers that do not belong to an active user account. Proceed with cleanup?"))return;const S=document.getElementById("purge-ghost-btn");S.innerText="PURGING GHOSTS...",S.disabled=!0;try{const L=(await Ie(ee(N,"users"))).docs.map($=>$.id),k=await Ie(ee(N,"staff_locations"));let y=0;for(const $ of k.docs)L.includes($.id)||(await oe(U(N,"staff_locations",$.id)),y++);x(`Purge Complete: ${y} ghost records expunged.`),S.innerText="🧹 PURGE DÉJÀ VU / GHOST DATA",S.disabled=!1}catch(w){console.error(w),R("PURGE_ERROR","Failed to clean up ghost metadata."),S.innerText="🧹 PURGE ERROR",S.disabled=!1}},T()});function V(d){const E=document.getElementById("modal-container"),T=d.username.substring(0,2).toUpperCase(),S=`${d.firstName} ${d.lastName}`;E.innerHTML=`
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
                       ${T}
                    </div>
                    <h2 style="font-family: 'Outfit'; color: #fff; margin-bottom: 5px; font-weight: 800;">${d.username.toUpperCase()}</h2>
                    <span class="status-badge ${d.role==="admin"?"status-Active":"status-Disposed"}" style="font-size: 0.65rem; padding: 2px 10px;">
                       ${d.role==="admin"?"SYSTEM ADMINISTRATOR":"GENERAL VIEWER"}
                    </span>
                 </div>
                 
                 <div style="padding: 25px;">
                    <div style="display: grid; gap: 15px;">
                       <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
                          <label style="display: block; font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px; font-weight: 700;">Legal Name of User</label>
                          <div style="color: #fff; font-weight: 600; font-size: 0.95rem;">${S}</div>
                       </div>
                       <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
                          <label style="display: block; font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px; font-weight: 700;">Registered Email Address</label>
                          <div style="color: #fff; font-weight: 600; font-size: 0.95rem;">${d.email}</div>
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
        `,document.getElementById("close-profile-modal").onclick=()=>E.innerHTML="",document.getElementById("delete-account-trigger").onclick=()=>{E.innerHTML=`
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
            `,document.getElementById("cancel-delete-acc").onclick=()=>V(d),document.getElementById("confirm-delete-acc").onclick=async()=>{if(document.getElementById("delete-confirm-input").value!=="DELETE"){alert("Confirmation text mismatch. Process aborted.");return}try{const L=Z.currentUser;if(!L)return;try{await oe(U(N,"users",L.uid))}catch(k){console.warn("User Doc already missing or restricted:",k)}try{await oe(U(N,"staff_locations",L.uid))}catch(k){console.warn("Location clean-up failed:",k)}await We(L),x("Your account has been permanently removed from the system."),setTimeout(()=>window.location.reload(),2e3)}catch(L){console.error("Account Deletion Error:",L),L.code==="auth/requires-recent-login"?R("AUTH_ERROR","For security, you must logout and login again before deleting your account."):R("DELETE_FAILED","A system error occurred. Please contact the administrator.")}}}}function Q(d){const E=document.getElementById("modal-container");E.innerHTML=`
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
        `,document.getElementById("close-su-modal").onclick=()=>E.innerHTML="",document.getElementById("su-auth-form").onsubmit=async T=>{T.preventDefault();const S=document.getElementById("su-email").value.trim(),w=document.getElementById("su-pwd").value;try{await Re(Z,S,w),E.innerHTML="",d()}catch(L){alert("Security Authorization Failed: "+L.message),console.error("SuperUser Auth Error:",L)}}}const j=document.getElementById("nav-superuser"),te=document.getElementById("nav-staff"),ie=document.getElementById("lock-stealth-btn");j&&(j.onclick=()=>{Q(()=>{j.classList.add("hidden"),te.classList.remove("hidden"),te.click(),x("Super User clearance granted. Staff Monitoring is now exposed.")})}),ie&&(ie.onclick=()=>{var d;te.classList.add("hidden"),j.classList.remove("hidden"),(d=document.getElementById("nav-overview"))==null||d.click(),x("Geospatial assets have been re-stashed. Stealth mode active.")});function ve(d){if(!d)return;const E=async(L,k)=>{try{const y=await Ae(U(N,"users",d));if(!y||!y.exists()){console.warn("[SYS] Account expunged. Terminating tracking heartbeat."),Me(Z);return}await xe(U(N,"staff_locations",d),{lat:L,lng:k,lastUpdate:new Date().toISOString(),name:(h==null?void 0:h.username)||"Staff Member"},{merge:!0}),console.log(`[SYS] Satellite sync OK → ${L.toFixed(5)}, ${k.toFixed(5)}`)}catch(y){console.warn("[SYS] Satellite sync blocked (Possible expunged account):",y)}},T={enableHighAccuracy:!0,timeout:1e4,maximumAge:0},S=async L=>{var k,y;if(console.warn("[SYS] GPS Error:",L.message),L.code===1){alert("CRITICAL SECURITY POLICY: Location access is strictly required by the Court to use this application. The system will now terminate.");try{if((y=(k=window==null?void 0:window.Capacitor)==null?void 0:k.Plugins)!=null&&y.App)try{await window.Capacitor.Plugins.App.exitApp()}catch{}}catch{}}},w=async(L=!1)=>{try{let k=null;if(window.Capacitor&&window.Capacitor.isNativePlatform()){const y=window.Capacitor.Plugins.Geolocation;y&&(k=(await y.getCurrentPosition({enableHighAccuracy:!0,timeout:15e3})).coords)}else if("geolocation"in navigator)return new Promise(y=>{navigator.geolocation.getCurrentPosition($=>{E($.coords.latitude,$.coords.longitude),y()},$=>{L&&S($),y()},T)});k&&E(k.latitude,k.longitude)}catch(k){L&&S(k)}};w(!0),setInterval(()=>w(!1),6e5)}}let Y=new Date().getMonth(),q=new Date().getFullYear();function Xe(){const e=document.getElementById("prev-month"),a=document.getElementById("next-month"),r=document.getElementById("prev-year"),t=document.getElementById("next-year");e&&(e.onclick=()=>{Y--,Y<0&&(Y=11,q--),ae()}),a&&(a.onclick=()=>{Y++,Y>11&&(Y=0,q++),ae()}),r&&(r.onclick=()=>{q--,ae()}),t&&(t.onclick=()=>{q++,ae()});const n=document.getElementById("add-event-btn");n&&(n.onclick=()=>{le(()=>Qe())}),ae()}function ae(){const e=document.getElementById("calendar-grid"),a=document.getElementById("calendar-month-year");if(!e||!a)return;const r=["January","February","March","April","May","June","July","August","September","October","November","December"];a.innerText=`${r[Y]} ${q}`;const t=e.querySelectorAll(".day-name");e.innerHTML="",t.forEach(s=>e.appendChild(s));const n=new Date(q,Y,1).getDay(),i=new Date(q,Y+1,0).getDate();for(let s=0;s<n;s++){const c=document.createElement("div");c.className="cal-day empty",e.appendChild(c)}const o=ye();for(let s=1;s<=i;s++){const c=document.createElement("div");c.className="cal-day";const g=new Date;s===g.getDate()&&Y===g.getMonth()&&q===g.getFullYear()&&c.classList.add("today-glow"),c.innerHTML=`<span class="date-num">${s}</span>`;const l=[];if(o.forEach(p=>{if(p.nextHearing){const u=new Date(p.nextHearing);!isNaN(u)&&u.toDateString()===new Date(q,Y,s).toDateString()&&l.push({...p,activeDate:p.nextHearing})}p.hearings&&Array.isArray(p.hearings)&&p.hearings.forEach(u=>{if(u===p.nextHearing)return;const v=new Date(u);!isNaN(v)&&v.toDateString()===new Date(q,Y,s).toDateString()&&l.push({...p,activeDate:u})})}),l.sort((p,u)=>{const v=new Date(p.activeDate),A=new Date(u.activeDate);return(isNaN(v)?0:v)-(isNaN(A)?0:A)}),l.slice(0,2).forEach(p=>{const u=document.createElement("div");u.className="event-indicator",p.isEvent&&(u.style.background="#f59e0b"),u.innerText=p.title||"Untitled",c.appendChild(u)}),l.length>2){const p=document.createElement("div");p.style.fontSize="0.6rem",p.style.color="var(--accent-primary)",p.style.textAlign="center",p.innerText=`+${l.length-2} more`,c.appendChild(p)}c.onclick=()=>Ze(q,Y,s,l),e.appendChild(c)}const m=e.querySelectorAll(".cal-day").length;if(m<42){const s=42-m;for(let c=0;c<s;c++){const g=document.createElement("div");g.className="cal-day empty",e.appendChild(g)}}}function Ze(e,a,r,t){const n=document.getElementById("modal-container"),i=new Date(e,a,r).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});n.innerHTML=`
    <div class="modal-overlay active">
      <div class="modal-content glow-panel" style="max-width: 500px;">
        <div class="modal-header">
          <h3>Agenda: ${i}</h3>
          <button class="close-btn" id="close-cal-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div id="day-events-list" style="max-height: 400px; overflow-y: auto; margin-bottom: 20px;">
             ${t.length===0?'<p class="text-muted text-center py-4">No scheduled hearings or events.</p>':t.map(o=>`
                 <div class="list-item" style="padding: 12px; border-bottom: 1px solid var(--border-light); display:flex; gap:12px; align-items:center;">
                    <div style="background:rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 4px; font-weight:700; color:var(--accent-primary); font-size: 0.8rem; min-width:80px; text-align:center;">
                       ${new Date(o.activeDate).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                    </div>
                    <div style="flex:1;">
                       <div style="font-weight:600; font-size: 0.95rem; margin-bottom: 2px;">${o.title}</div>
                       <div style="font-size: 0.75rem; color:var(--text-muted);">${o.isEvent?"Custom Event":o.caseNo}</div>
                    </div>
                    <button class="btn-secondary btn-sm delete-ev-btn" data-id="${o.id}" data-date="${o.activeDate}" style="color:red; border-color:rgba(255,0,0,0.2);">Delete</button>
                 </div>
               `).join("")}
          </div>
          <div style="display:flex; justify-content:flex-end;">
             ${t.length>0?'<button id="print-schedule-btn" class="btn-primary" style="font-size: 0.85rem;">🖨️ Print Schedule (PDF)</button>':""}
          </div>
        </div>
      </div>
    </div>
  `,document.getElementById("close-cal-modal").onclick=()=>n.innerHTML="",document.querySelectorAll(".delete-ev-btn").forEach(o=>{o.onclick=m=>{const s=m.currentTarget.getAttribute("data-id"),c=m.currentTarget.getAttribute("data-date"),l=ye().find(u=>u.id===s);if(!s||!l){alert("Wait: Entry not found in local cache. Please wait or refresh.");return}le(()=>{const u=document.createElement("div");u.className="modal-overlay active",u.style.zIndex="3000",u.innerHTML=`
              <div class="modal-content glow-panel" style="max-width: 400px; text-align: center; border-color: var(--accent-secondary);">
                <div class="modal-header">
                  <h3 style="color: var(--accent-secondary);">Delete Confirmation</h3>
                  <button class="close-btn" id="close-delete-modal">&times;</button>
                </div>
                <div class="modal-body" style="padding: 30px;">
                   <div style="font-size: 3rem; margin-bottom: 20px;">🗑️</div>
                   <p style="margin-bottom: 25px; color: var(--text-main); font-weight: 500;">Remove this schedule [${new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]?</p>
                   <div style="display: flex; gap: 15px; justify-content: center;">
                      <button id="cancel-delete" class="btn-secondary" style="flex: 1;">Keep it</button>
                      <button id="confirm-delete" class="btn-primary" style="flex: 1; background: var(--accent-secondary); color: #fff;">Remove Date</button>
                   </div>
                </div>
              </div>
            `,n.appendChild(u);const v=()=>u.remove();document.getElementById("close-delete-modal").onclick=v,document.getElementById("cancel-delete").onclick=v,document.getElementById("confirm-delete").onclick=async()=>{var A;try{const h=(A=document.querySelector(`.delete-ev-btn[data-date="${c}"][data-id="${s}"]`))==null?void 0:A.closest(".list-item");h&&(h.style.opacity="0.3",h.style.pointerEvents="none");const I=()=>{const b=document.createElement("div");b.className="modal-overlay active",b.style.zIndex="4000",b.innerHTML=`
                           <div class="modal-content glow-panel" style="max-width: 350px; text-align: center; border-color: var(--accent-primary);">
                             <div class="modal-body" style="padding: 40px;">
                                <div style="font-size: 4rem; margin-bottom: 20px; color: var(--accent-primary);">✅</div>
                                <h2 style="color: var(--accent-primary); margin-bottom: 10px; font-family: 'Outfit';">REMOVED</h2>
                                <p style="color: var(--text-main); font-size: 0.9rem;">The hearing schedule was successfully updated.</p>
                                <button id="ok-success" class="btn-primary" style="margin-top: 25px; width: 100%;">DONE</button>
                             </div>
                           </div>
                         `,n.appendChild(b),document.getElementById("ok-success").onclick=()=>{b.remove(),n.innerHTML=""},setTimeout(()=>{b.parentNode&&b.remove(),n.innerHTML.includes("REMOVED")&&(n.innerHTML="")},2e3)};if(v(),l.isEvent)await oe(U(N,"custom_events",s));else{const B=(l.hearings||[]).filter(x=>x!==c),H=[...B].filter(x=>x).sort()[0]||"";let C=l.nextHearing===c?H:l.nextHearing;await ge(U(N,"cases",s),{hearings:B,nextHearing:C})}ae(),window.renderDashboard&&window.renderDashboard(),I()}catch(h){console.error("Firebase Delete Error:",h),alert("Error updating schedule. Please check your connection."),v()}}})}})}function Qe(){const e=document.getElementById("modal-container");e.innerHTML=`
      <div class="modal-overlay active">
        <div class="modal-content glow-panel" style="max-width: 450px;">
          <div class="modal-header">
            <h3>Add Custom Event</h3>
            <button class="close-btn" id="close-event-modal">&times;</button>
          </div>
          <div class="modal-body">
             <form id="event-form" class="form-grid">
                <div class="input-group full-width">
                  <label>Event Title</label>
                  <input type="text" id="ev-title" required placeholder="e.g. Court Holiday / Judicial Retreat" />
                </div>
                <div class="input-group">
                  <label>Date & Time</label>
                  <input type="datetime-local" id="ev-date" required />
                </div>
                <div class="input-group">
                  <label>Category</label>
                  <select id="ev-type">
                    <option value="Event">Custom Event</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Meeting">Meeting</option>
                  </select>
                </div>
                <div class="input-group full-width">
                   <label>Notes</label>
                   <textarea id="ev-comments" rows="2"></textarea>
                </div>
                <div class="modal-footer full-width" style="text-align:right; margin-top:20px;">
                   <button type="button" class="btn-secondary" id="cancel-event">Cancel</button>
                   <button type="submit" class="btn-primary">Save Event</button>
                </div>
             </form>
          </div>
        </div>
      </div>
    `,document.getElementById("close-event-modal").onclick=()=>e.innerHTML="",document.getElementById("cancel-event").onclick=()=>e.innerHTML="",document.getElementById("event-form").onsubmit=async r=>{r.preventDefault();const t={title:document.getElementById("ev-title").value,nextHearing:document.getElementById("ev-date").value,type:document.getElementById("ev-type").value,comments:document.getElementById("ev-comments").value,isEvent:!0,status:"Active",dateFiled:new Date().toISOString().split("T")[0]};try{await De(ee(N,"custom_events"),t),e.innerHTML=""}catch{alert("Error saving event.")}};const a=document.getElementById("print-schedule-btn");a&&(a.onclick=()=>et(dateStr,events))}function et(e,a){const r=window.open("","_blank"),t=[...a].sort((i,o)=>new Date(i.nextHearing)-new Date(o.nextHearing)),n=`
      <div style="font-family: Arial, sans-serif; padding: 40px; color: #000;">
         <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="margin:0; text-transform: uppercase;">Republic of the Philippines</h2>
            <h3 style="margin:5px 0; text-transform: uppercase;">Regional Trial Court</h3>
            <p style="margin:0; font-style: italic;">Sipalay City, Negros Occidental</p>
            <hr style="margin-top: 20px; border: 1px solid #000;">
            <h1 style="margin: 20px 0; font-size: 1.5rem;">HEARING DOCKET</h1>
            <p style="font-weight: bold; font-size: 1.1rem;">Schedule for: ${e}</p>
         </div>

         <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
               <tr style="background: #f0f0f0;">
                  <th style="border: 1px solid #000; padding: 10px; text-align: left;">TIME</th>
                  <th style="border: 1px solid #000; padding: 10px; text-align: left;">CASE NUMBER</th>
                  <th style="border: 1px solid #000; padding: 10px; text-align: left;">TITLE / PARTIES</th>
                  <th style="border: 1px solid #000; padding: 10px; text-align: left;">NATURE / VIOLATIONS</th>
                  <th style="border: 1px solid #000; padding: 10px; text-align: left;">TYPE</th>
               </tr>
            </thead>
            <tbody>
               ${t.map(i=>`
                 <tr>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">${new Date(i.nextHearing).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</td>
                    <td style="border: 1px solid #000; padding: 10px;">${i.isEvent?"N/A":i.caseNo}</td>
                    <td style="border: 1px solid #000; padding: 10px;">${i.title}</td>
                    <td style="border: 1px solid #000; padding: 10px; font-size: 0.9rem;">${i.nature||"Custom Event"}</td>
                    <td style="border: 1px solid #000; padding: 10px;">${i.type||"Event"}</td>
                 </tr>
               `).join("")}
            </tbody>
         </table>
         
         <div style="margin-top: 50px; display:flex; justify-content:space-between;">
            <div style="width: 250px; border-top: 1px solid #000; text-align: center; padding-top: 5px;">
               <p style="margin:0; font-weight: bold;">PREPARED BY</p>
            </div>
            <div style="width: 250px; border-top: 1px solid #000; text-align: center; padding-top: 5px;">
               <p style="margin:0; font-weight: bold;">APPROVED BY</p>
            </div>
         </div>

         <p style="margin-top: 40px; font-size: 0.8rem; text-align: center; color: #555;">Generated by DocketPro Monitoring System v1.0</p>
      </div>
    `;r.document.write("<html><head><title>Daily Hearing Docket - "+e+"</title></head><body>"+n+"</body></html>"),r.document.close(),setTimeout(()=>{r.print(),r.close()},500)}let K=[],Ee=[],Le=[];function ye(){return[...K,...Ee]}function tt(){return Le}function se(e){if(!e)return null;try{let a=e;return typeof a=="string"&&/^\d{5}$/.test(a)?a=new Date((parseInt(a)-25569)*86400*1e3):typeof e=="object"&&e.toDate?a=e.toDate():a=new Date(e),isNaN(a)?null:a}catch{return null}}function nt(){const e=document.getElementById("case-search"),a=document.getElementById("add-case-btn"),r=document.getElementById("filter-place"),t=document.getElementById("filter-type"),n=document.getElementById("filter-status"),i=document.getElementById("filter-month-start"),o=document.getElementById("filter-month-end"),m=document.getElementById("filter-year"),s=document.getElementById("filter-day");let c;const g=(h=!1)=>{const I=(r==null?void 0:r.value)||"All",b=(t==null?void 0:t.value)||"All",B=(n==null?void 0:n.value)||"All",H=parseInt((i==null?void 0:i.value)||"1"),C=parseInt((o==null?void 0:o.value)||"12"),x=(m==null?void 0:m.value)||"All",R=(s==null?void 0:s.value)||"All";Le=K.filter(f=>{if(f.isEvent||I!=="All"&&f.place!==I||b!=="All"&&f.type!==b||B!=="All"&&f.status!==B)return!1;const D=se(f.dateFiled);if(D){const W=D.getMonth()+1,V=D.getDate(),Q=D.getFullYear().toString();if(W<H||W>C||x!=="All"&&Q!==x||R!=="All"&&V!==parseInt(R))return!1}const z=((e==null?void 0:e.value)||"").toLowerCase().trim();if(z){const W=String(f.caseNo||"").toLowerCase(),V=String(f.title||"").toLowerCase(),Q=String(f.nature||"").toLowerCase(),j=String(f.comments||"").toLowerCase(),te=String(f.complainant||"").toLowerCase(),ie=String(f.respondent||"").toLowerCase();if(!W.includes(z)&&!V.includes(z)&&!Q.includes(z)&&!j.includes(z)&&!te.includes(z)&&!ie.includes(z))return!1}return!0}),ot(Le),h&&(window.renderDashboard&&window.renderDashboard(),ae())},l=(h=!1)=>g(h);if(r&&r.addEventListener("change",()=>l(!0)),t&&t.addEventListener("change",()=>l(!0)),n&&n.addEventListener("change",()=>l(!0)),i&&i.addEventListener("change",()=>l(!0)),o&&o.addEventListener("change",()=>l(!0)),m&&m.addEventListener("change",()=>l(!0)),s&&s.addEventListener("change",()=>l(!0)),e&&e.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(()=>{l(!1)},400)}),N){let h=!1;const I=()=>{h||g(!0)};let b=null,B=null,H=!1;Z&&Pe(Z,C=>{C?(H||(p(),H=!0),b||(b=Se(ee(N,"cases"),x=>{K=x.docs.map(R=>({id:R.id,...R.data()})),I()},x=>console.error("Cases sync error:",x))),B||(B=Se(ee(N,"custom_events"),x=>{Ee=x.docs.map(R=>({id:R.id,...R.data(),isEvent:!0})),I()},x=>console.error("Events sync error:",x)))):(b&&(b(),b=null),B&&(B(),B=null),K=[],Ee=[],I())}),window.setIsSyncing=C=>{h=C,C||I()}}async function p(){const h=new Date,I=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Manila",hour:"numeric",hour12:!1}).format(h);parseInt(I)>=17&&(Ee.forEach(async b=>{if(new Date(b.nextHearing).toDateString()===h.toDateString())try{await oe(U(N,"custom_events",b.id))}catch{}}),K.forEach(async b=>{if(b.nextHearing&&new Date(b.nextHearing).toDateString()===h.toDateString())try{await ge(U(N,"cases",b.id),{nextHearing:""})}catch{}}))}e&&e.addEventListener("input",h=>{currentSearch=h.target.value.toLowerCase(),g()}),a&&a.addEventListener("click",()=>{le(()=>{ze()},"Full Administrative Access Required","admin")});const u=document.getElementById("import-inventory-btn"),v=document.getElementById("inventory-file");u&&v&&(u.onclick=()=>{le(()=>{v.click()},"Database Write Access Required","admin")},v.onchange=h=>A(h));async function A(h){const I=h.target.files[0];if(!I)return;const b=document.getElementById("modal-container");b.innerHTML=`
          <div class="modal-overlay active" style="z-index:9999;">
            <div class="modal-content glow-panel" style="max-width: 450px; padding: 25px; border-color: rgba(255,255,255,0.1);">
              <div class="modal-header" style="justify-content:center; border:none; margin-bottom:15px;">
                <h3 style="letter-spacing:1px; font-weight:800; font-family:'Outfit'; color:#fff;">Synchronizing Case Docket</h3>
              </div>
              <div class="modal-body">
                 <div id="sync-progress-bar-container" style="width:100%; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; margin-bottom:12px; overflow:hidden;">
                    <div id="sync-progress-bar" style="width:0%; height:100%; background:var(--accent-primary); transition: width 0.1s ease;"></div>
                 </div>
                 <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:0.75rem; color:rgba(255,255,255,0.6);">
                    <span id="sync-status-text">Preparing records...</span>
                    <span id="sync-percentage-text">0%</span>
                 </div>
                 <div id="activity-log" style="width:100%; height:140px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.05); border-radius:6px; padding:10px; font-family:'Inter', sans-serif; font-size:0.7rem; color:rgba(255,255,255,0.5); overflow-y:auto; line-height:1.6;">
                    System: Initializing Excel-to-Database Sync...
                 </div>
              </div>
            </div>
          </div>
        `;const B=document.getElementById("sync-progress-bar"),H=document.getElementById("sync-percentage-text"),C=document.getElementById("sync-status-text"),x=document.getElementById("activity-log"),R=D=>{const z=document.createElement("div");z.innerText=D,x.appendChild(z),x.scrollTop=x.scrollHeight},f=new FileReader;f.onload=async D=>{window.setIsSyncing&&window.setIsSyncing(!0);const z=D.target.result,W=XLSX.read(z,{type:"binary",cellDates:!0}),V=[];for(const d of W.SheetNames)try{const E=W.Sheets[d],T=XLSX.utils.sheet_to_json(E,{defval:""});if(T.length===0)continue;let S="Other";const w=d.toUpperCase();w.includes("CRIMINAL")?S="Criminal":w.includes("CIVIL")||w.includes("SPEC")||w.includes("SCA")?S="Civil":w.includes("CADASTRAL")?S="Cadastral":w.includes("APPEAL")?S="Appeal":w.includes("CICL")&&(S="CICL"),T.forEach(L=>V.push({row:L,type:S,sheet:d})),R(`Aggregate: ${d} (${T.length} cases detected)`)}catch{R(`Warning: Could not read sheet ${d}`)}const Q=V.length;let j=0,te=0,ie=0;R(`PREPARING ATOMIC SYNC: ${Q} TOTAL RECORDS...`);for(const d of V){const{row:E,type:T,sheet:S}=d;try{const w=M=>{const $e=Object.keys(E).find(Fe=>M.some(Ye=>Fe.toUpperCase().includes(Ye.toUpperCase())));return $e?E[$e]:""},L=w(["CASE NO","CASE_NO","CASE #","CASE NUMBER","LRC","G.R. NO","DOCKET #"]),k=w(["TITLE","PARTIES","CASE_TITLE","ACCUSED","APPLICANT","PETITIONER","PLAINTIFF","COMPLAINANT"]);if(!L||!k){j++,ve();continue}const y=w(["NATURE","OFFENSE","CAUSE","DESCRIPTION","SUBJECT"]),$=w(["DATE FILED","DATE_FILED","FILED ON","DATE OF FILING","DATE","FILED","FILING"]),P=w(["COURT ACTION","LAST ACTION","STATUS DATA","REMARKS","ACTION TAKEN","DECISION"]),F=M=>M.toString().toLowerCase().replace(/[^a-z0-9]/g,""),J=F(L);let G="Active";const X=P.toString().toUpperCase(),de=["DECIDED","DECISION","DISMISSED","DISMISSAL","PLEADED GUILTY","PLEA BARGAIN","GUILTY","ACQUITTED","ACQUITTAL","SENTENCE","SETTLED","COMPROMISE"],Ne=["PROPOSAL","DIRECTED TO FILE","FOR COMMENT","PENDING","FOR RESOLUTION","FOR DECISION","FOR DISMISSAL","SET FOR","CONTINUED","POSTPONED","RESET"],ce=de.some(M=>X.includes(M)),me=Ne.some(M=>X.includes(M));["ARCHIVE","ARCHIVED","FOR ARCHIVE"].some(M=>X.includes(M))?G="Archived":ce&&!me&&(G="Disposed"),(X.includes("APPEALED")||X.includes("ON APPEAL"))&&(G="Appeal");const pe=M=>{if(M==null||M==="")return"";if(M instanceof Date)return`${(M.getMonth()+1).toString().padStart(2,"0")}/${M.getDate().toString().padStart(2,"0")}/${M.getFullYear()}`;if(typeof M=="number"){const he=new Date((M-25569)*86400*1e3);return`${(he.getUTCMonth()+1).toString().padStart(2,"0")}/${he.getUTCDate().toString().padStart(2,"0")}/${he.getUTCFullYear()}`}return M.toString().trim()},O={caseNo:L.toString().trim(),title:k.toString().trim(),nature:y.toString().trim(),dateFiled:pe($),comments:P.toString().trim()||"TO BE UPDATED",status:G,type:T};let ue="Sipalay";O.caseNo.toUpperCase().startsWith("H-")&&(ue="Hinoba-an");let be=K.find(M=>M.caseNo===O.caseNo);if(be||(be=K.find(M=>F(M.caseNo)===J)),be)await ge(U(N,"cases",be.id),{...O,place:ue}),te++,R(`UPD: ${O.caseNo}`);else{const M={...O,place:ue,nextHearing:G==="Disposed"?"":E["Next Hearing"]||"",complainant:"N/A",respondent:"N/A"};await De(ee(N,"cases"),M),ie++,R(`NEW: ${O.caseNo}`)}}catch(w){console.error("Row Error:",w)}j++,ve()}function ve(){const d=Math.round(j/Q*100);B.style.width=`${d}%`,H.innerText=`${d}%`,C.innerText=`Atomic Sync: ${j}/${Q} completed...`}window.setIsSyncing&&window.setIsSyncing(!1),window.setIsSyncing&&window.setIsSyncing(!1),b.innerHTML=`
              <div class="modal-overlay active">
                <div class="modal-content glow-panel" style="max-width:350px; text-align:center; border-color:var(--accent-primary);">
                  <div class="modal-body" style="padding:40px;">
                    <div style="font-size:3.5rem; margin-bottom:20px;">✅</div>
                    <h2 style="color:var(--accent-primary); margin-bottom:15px; font-family:'Outfit'; font-weight:800;">SYNC COMPLETE</h2>
                    <div style="text-align:left; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; font-family:monospace; font-size:0.85rem; margin-bottom:25px;">
                        <div style="margin-bottom:5px;">TOTAL RECORDS : ${j}</div>
                        <div style="color:var(--accent-primary);">UPDATED REC   : ${te}</div>
                        <div style="color:#fff;">NEW FILINGS  : ${ie}</div>
                    </div>
                    <button id="close-sync" class="btn-primary" style="width:100%;">ACCESS UPDATED DOCKET</button>
                  </div>
                </div>
              </div>
            `,document.getElementById("close-sync").onclick=()=>b.innerHTML="",v.value=""},f.readAsBinaryString(I)}}function ot(e){const a=document.getElementById("cases-tbody");if(a)try{if(!e||e.length===0){a.innerHTML=`<tr><td colspan="6" class="text-center text-muted py-4">
                No cases found. Data Status: [DB Size: ${K?K.length:"null"}]
            </td></tr>`;return}let r="";e.sort((t,n)=>{const i=t.dateFiled?new Date(t.dateFiled):new Date(0),o=n.dateFiled?new Date(n.dateFiled):new Date(0);return(isNaN(o)?0:o)-(isNaN(i)?0:i)}).forEach(t=>{const n=se(t.nextHearing),i=n?n.toLocaleDateString():"Unscheduled",o=se(t.dateFiled),m=o?o.toLocaleDateString():"N/A",s=t.party1Type?String(t.party1Type).substring(0,3).toUpperCase():"CMP",c=t.party2Type?String(t.party2Type).substring(0,3).toUpperCase():"ACC",g=t.complainant?String(t.complainant).replace(/ \| /g,", "):"N/A",l=t.respondent?String(t.respondent).replace(/ \| /g,", "):"N/A",p=t.place||"",u=t.caseNo||"N/A",v=t.title||"Untitled",A=t.type||"Other",h=t.nature||"N/A",I=t.status||"Active";r+=`
              <tr class="cases-row" data-id="${t.id}" style="cursor:pointer;">
                <td>
                  <span style="font-size: 0.70rem; color: var(--accent-primary); display:block; text-transform:uppercase;">${p}</span>
                  <span>${u}</span>
                </td>
                <td>
                  <div style="font-weight:600;">${v}</div>
                  <div class="text-xs text-muted">
                     <b>${s}:</b> <div style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${g}</div>
                     <b>${c}:</b> <div style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${l}</div>
                  </div>
                </td>
                <td>
                   <span style="font-size: 0.7rem; border: 1px solid var(--border-light); padding: 2px 5px; border-radius:3px;">${A}</span>
                   <div class="text-xs text-muted">${h}</div>
                </td>
                <td><span class="status-badge status-${I.toLowerCase()}">${I}</span></td>
                <td>${i}</td>
                <td class="text-right">
                   <button class="btn-secondary btn-sm edit-case-btn" data-id="${t.id}">Edit</button>
                </td>
              </tr>
            `}),a.innerHTML=r,document.querySelectorAll(".cases-row").forEach(t=>{t.addEventListener("click",n=>{if(n.target.closest(".edit-case-btn"))return;const i=t.getAttribute("data-id"),o=K.find(m=>m.id===i);le(()=>at(o),"Dossier Access Authentication","viewer")})}),document.querySelectorAll(".edit-case-btn").forEach(t=>{t.addEventListener("click",n=>{const i=n.target.getAttribute("data-id"),o=K.find(m=>m.id===i);le(()=>ze(o),"Administrative Edit Authorization","admin")})})}catch(r){a.innerHTML=`<tr><td colspan="6" style="color:red;">Render Crash: ${r.message}</td></tr>`}}function le(e,a=null,r="admin"){const t=document.getElementById("modal-container"),n=a||"Administrative Access Required:";t.innerHTML=`
      <div class="modal-overlay active">
        <div class="modal-content glow-panel" style="max-width: 400px; border-color: #f59e0b;">
          <div class="modal-header" style="background: rgba(245, 158, 11, 0.1); border-bottom: 2px solid #f59e0b;">
            <h3 style="color: #f59e0b; display: flex; align-items: center; gap: 8px;">
               <span style="font-size: 1.25rem;">⚠️</span> SECURITY CAUTION
            </h3>
            <button class="close-btn" id="close-admin-modal" style="color: #f59e0b;">&times;</button>
          </div>
          <div class="modal-body text-center" style="padding: 30px;">
             <p style="font-weight: 700; color: #fff; margin-bottom: 15px; font-size: 1.1rem;">${n.toUpperCase()}</p>
             <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px;">
                ${r==="admin"?"This action requires Full Administrative Passcode.":"Identification verification is mandatory for viewing records."}
             </p>
             
             <input type="password" id="admin-pwd-input" 
                    style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid #f59e0b; padding: 12px; color: #fff; border-radius: 8px; text-align: center; font-size: 1.1rem; letter-spacing: 4px;" 
                    placeholder="••••••••" />
             
             <div id="admin-err-msg" class="hidden" style="color: #ef4444; font-size: 0.75rem; margin-top: 10px; font-weight: 600;">ACCESS DENIED: INCORRECT PASSCODE</div>
             
             <button id="admin-submit-btn" class="btn-primary w-100" 
                     style="margin-top: 20px; background: #f59e0b; color: #000; font-weight: 800;">VERIFY IDENTITY</button>
          </div>
        </div>
      </div>
    `;const i=document.getElementById("admin-pwd-input");i.focus(),document.getElementById("close-admin-modal").onclick=()=>t.innerHTML="";async function o(){const m=i.value,s=document.getElementById("admin-submit-btn"),c=document.getElementById("admin-err-msg");if(m){s.disabled=!0,s.innerText="AUTHENTICATING...",c.classList.add("hidden");try{const g=await Ae(U(N,"security_matrix",m));if(g.exists()){const p=g.data().role;if(r==="viewer"||r==="admin"&&p==="admin"){t.innerHTML="",e();return}}c.classList.remove("hidden"),c.innerText="ACCESS DENIED: IDENTITY NOT RECOGNIZED",s.disabled=!1,s.innerText="VERIFY IDENTITY"}catch(g){console.error("SECURE AUTH ERROR DETAIL:",g),c.classList.remove("hidden");const l=g.code||"UNKNOWN";c.innerText=`CLOUD CONNECTION FAILED (${l}). PLEASE CHECK YOUR CONNECTION OR TRY AGAIN.`,s.disabled=!1,s.innerText="VERIFY IDENTITY"}}}document.getElementById("admin-submit-btn").onclick=o,i.onkeypress=m=>{m.key==="Enter"&&o()}}function ze(e=null){var u,v;const a=document.getElementById("modal-container");a.innerHTML=`
      <div class="modal-overlay active">
        <div class="modal-content">
          <div class="modal-header">
            <h3>${e?"Edit Case":"New Case"}</h3>
            <button class="close-btn" id="close-modal">&times;</button>
          </div>
          <div class="modal-body">
             <form id="case-form" class="form-grid">
               <div class="input-group">
                 <label>Place</label>
                 <select id="f-place" required>
                   <option value="Sipalay" ${(e==null?void 0:e.place)==="Sipalay"?"selected":""}>Sipalay</option>
                   <option value="Hinoba-an" ${(e==null?void 0:e.place)==="Hinoba-an"?"selected":""}>Hinoba-an</option>
                 </select>
               </div>
               <div class="input-group">
                 <label>Case No.</label>
                 <input type="text" id="f-caseNo" required value="${e?e.caseNo:""}" />
               </div>
               <div class="input-group">
                 <label>Type</label>
                 <select id="f-type" required>
                   <option value="Criminal" ${(e==null?void 0:e.type)==="Criminal"?"selected":""}>Criminal</option>
                   <option value="Civil" ${(e==null?void 0:e.type)==="Civil"?"selected":""}>Civil</option>
                   <option value="Cadastral"  ${(e==null?void 0:e.type)==="Cadastral"?"selected":""}>Cadastral</option>
                   <option value="CICL" ${(e==null?void 0:e.type)==="CICL"?"selected":""}>CICL</option>
                   <option value="Appeal" ${(e==null?void 0:e.type)==="Appeal"?"selected":""}>Appeal</option>
                 </select>
               </div>
               <div class="input-group full-width">
                 <label>Title</label>
                 <input type="text" id="f-title" required value="${e?e.title:""}" />
               </div>
               <div class="input-group full-width" style="border: 1px solid var(--border-light); padding: 10px; border-radius: 5px;">
                 <div class="party-grid">
                    <div>
                      <select id="f-p1-type" style="width:100%;" required>
                        <option value="Complainant">Complainant(s)</option>
                        <option value="Plaintiff">Plaintiff(s)</option>
                        <option value="Petitioner">Petitioner(s)</option>
                      </select>
                      <div id="p1-container"></div>
                      <button type="button" id="btn-add-p1" class="btn-sm">+ ADD</button>
                    </div>
                    <div>
                      <select id="f-p2-type" style="width:100%;" required>
                        <option value="Accused">Accused</option>
                        <option value="Respondent">Respondent(s)</option>
                        <option value="Defendant">Defendant(s)</option>
                      </select>
                      <div id="p2-container"></div>
                      <button type="button" id="btn-add-p2" class="btn-sm">+ ADD</button>
                    </div>
                 </div>
               </div>
               <div class="input-group">
                 <label>Nature</label>
                 <input type="text" id="f-nature" required value="${e?e.nature:""}" />
               </div>
               <div class="input-group">
                 <label>Date Filed</label>
                 <input type="date" id="f-date" required value="${e?((v=(u=se(e.dateFiled))==null?void 0:u.toISOString())==null?void 0:v.split("T")[0])||"":new Date().toISOString().split("T")[0]}" />
               </div>
               <div class="input-group">
                 <label>Status</label>
                 <select id="f-status" required>
                   <option value="Active" ${(e==null?void 0:e.status)==="Active"?"selected":""}>Active</option>
                   <option value="Disposed" ${(e==null?void 0:e.status)==="Disposed"?"selected":""}>Disposed</option>
                   <option value="Appeal" ${(e==null?void 0:e.status)==="Appeal"?"selected":""}>On Appeal (CA)</option>
                   <option value="Archived" ${(e==null?void 0:e.status)==="Archived"?"selected":""}>Archived</option>
                 </select>
               </div>
                <div class="input-group full-width" style="margin-top:20px; border-top: 1px solid var(--border-light); padding-top:20px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <label style="font-weight:800; color:var(--accent-primary);">SCHEDULED HEARINGS</label>
                    <button type="button" id="btn-add-hearing" class="btn-primary btn-sm">+ ADD DATE</button>
                  </div>
                  <div id="hearings-container"></div>
                </div>
               <div class="input-group full-width">
                 <label>Comments</label>
                 <textarea id="f-comments" rows="2">${e?e.comments:""}</textarea>
               </div>
               <div class="modal-footer full-width" style="display:flex; justify-content:space-between;">
                 ${e?'<button type="button" class="btn-secondary" id="delete-modal-btn" style="color:red;">DELETE</button>':"<div></div>"}
                 <div style="display:flex; gap:10px;">
                    <button type="button" class="btn-secondary" id="cancel-modal">CANCEL</button>
                    <button type="submit" class="btn-primary">SAVE</button>
                 </div>
               </div>
             </form>
          </div>
        </div>
      </div>
    `;const r=document.getElementById("hearings-container"),t=document.getElementById("p1-container"),n=document.getElementById("p2-container");let i=e!=null&&e.complainant?e.complainant.split(" | "):[""],o=e!=null&&e.respondent?e.respondent.split(" | "):[""];const m=A=>{const h=se(A);if(!h)return"";const I=b=>b.toString().padStart(2,"0");return`${h.getFullYear()}-${I(h.getMonth()+1)}-${I(h.getDate())}T${I(h.getHours())}:${I(h.getMinutes())}`};let s=((e==null?void 0:e.hearings)||(e!=null&&e.nextHearing?[e.nextHearing]:[])).map(A=>m(A));function c(A,h,I,b="text"){A.innerHTML="",h.forEach((B,H)=>{const C=`<div style="display:flex; gap:10px; margin-top:8px; align-items:center; background:rgba(255,255,255,0.03); padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.05);">
               <input type="${b}" class="${I}-input" required value="${B}" style="flex:1; background:transparent; border:none; color:#fff;" />
               <button type="button" class="remove-${I}" data-idx="${H}" style="background:none; border:none; color:#ff4d4d; font-size:1.2rem; cursor:pointer;">&times;</button>
            </div>`;A.insertAdjacentHTML("beforeend",C)}),A.querySelectorAll(`.remove-${I}`).forEach(B=>{B.onclick=H=>{h.splice(parseInt(H.currentTarget.getAttribute("data-idx")),1),c(A,h,I,b),p()}}),A.querySelectorAll(`.${I}-input`).forEach((B,H)=>{B.oninput=C=>{h[H]=C.target.value,p()}})}c(t,i,"p1"),c(n,o,"p2"),c(r,s,"hearing","datetime-local"),document.getElementById("btn-add-p1").onclick=()=>{i.push(""),c(t,i,"p1")},document.getElementById("btn-add-p2").onclick=()=>{o.push(""),c(n,o,"p2")},document.getElementById("btn-add-hearing").onclick=()=>{s.push(""),c(r,s,"hearing","datetime-local")};const g=document.getElementById("f-type"),l=document.getElementById("f-title");function p(){if(g.value==="Criminal"){const A=o.filter(h=>h.trim()!=="").join(", ")||"_______";l.value=`People of the Philippines vs. ${A}`}}g.onchange=p,p(),document.getElementById("close-modal").onclick=()=>a.innerHTML="",document.getElementById("cancel-modal").onclick=()=>a.innerHTML="",document.getElementById("delete-modal-btn")&&(document.getElementById("delete-modal-btn").onclick=async()=>{confirm("Delete record?")&&(await oe(U(N,"cases",e.id)),a.innerHTML="")}),document.getElementById("case-form").onsubmit=async A=>{A.preventDefault();const h=[...s].filter(b=>b).sort()[0]||"",I={place:document.getElementById("f-place").value,caseNo:document.getElementById("f-caseNo").value,type:g.value,title:l.value,party1Type:document.getElementById("f-p1-type").value,party2Type:document.getElementById("f-p2-type").value,complainant:i.filter(b=>b.trim()!=="").join(" | "),respondent:o.filter(b=>b.trim()!=="").join(" | "),nature:document.getElementById("f-nature").value,dateFiled:document.getElementById("f-date").value,status:document.getElementById("f-status").value,hearings:s.filter(b=>b!==""),nextHearing:h,comments:document.getElementById("f-comments").value};try{e?await ge(U(N,"cases",e.id),I):await De(ee(N,"cases"),I),a.innerHTML=""}catch{alert("Error saving data.")}}}function at(e){const a=document.getElementById("modal-container");a.innerHTML=`
      <div class="modal-overlay active">
        <div class="modal-content glow-panel" style="max-width: 600px; border: 2px solid #000; background:#fff; box-shadow: 0 0 40px rgba(0,0,0,0.5);">
          <div class="modal-header" style="border-bottom: 2px solid #000; background: #f0f0f0;">
            <h3 style="color:#000; font-family:'Outfit'; font-weight:800;">CASE SUMMARY: ${e.caseNo}</h3>
            <button class="close-btn" id="close-dossier-modal" style="color:#000;">&times;</button>
          </div>
          <div class="modal-body" id="dossier-body" style="padding:40px; color:#000; font-family: 'Courier New', monospace; white-space:pre-wrap; min-height:450px; overflow-y:auto; line-height:1.6;">
             <div id="typewriter-container"></div>
          </div>
          <div class="modal-footer" style="padding:15px; border-top:1px solid #ddd; text-align:right; background:#f9f9f9;">
             <button class="btn-primary" id="close-dossier-btn" style="background:#000; color:#fff;">Close Record</button>
          </div>
        </div>
      </div>
    `;const r=()=>{a.innerHTML=""};document.getElementById("close-dossier-modal").onclick=r,document.getElementById("close-dossier-btn").onclick=r;const t=v=>{const A=se(v);return A?A.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}):String(v||"N/A")},n=se(e.nextHearing);let i=n?n.toLocaleString("en-US",{month:"long",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}):"No scheduled hearing";const o=e.party1Type||"Complainant",m=e.party2Type||"Accused",s=`> ACCESSING ENCRYPTED RECORD...
> DECRYPTING...

<div style="font-weight:800; border-bottom:1px solid #000; margin-bottom:15px; font-size:1.2rem;">[ CASE SUMMARY ]</div>[ TITLE ]        : ${e.title.toUpperCase()}
[ CLASSIFICATION ] : ${e.type.toUpperCase()}
[ STATUS ]         : ${e.status.toUpperCase()}
[ NATURE/VIOLTN ]  : ${e.nature.toUpperCase()}

<span class="highlight-accused">[ ${o.toUpperCase()} ] : ${String(e.complainant||"N/A").replace(/ \| /g,", ")}</span><span class="highlight-accused">[ ${m.toUpperCase()} ] : ${String(e.respondent||"N/A").replace(/ \| /g,", ")}</span>
[ DATE FILED ]    : ${t(e.dateFiled)}

<span class="highlight-action">[ NEXT HEARING ] : ${i}</span>
<span class="highlight-action">[ LAST ACTION / COMMENTS ] : 
${e.comments||"TO BE UPDATED"}</span>

> RECORD TERMINATED.
> END OF FILE.`,c=document.getElementById("typewriter-container");let g=0,l=!1,p="";function u(){if(g<s.length){let v=s.charAt(g);v==="<"&&(l=!0),v===">"&&(l=!1),p+=v,c.innerHTML=p,g++,l?u():setTimeout(u,4)}}u()}function ke(){const e=ye();rt(e),st(e),dt(e),it()}window.renderDashboard=ke;function it(){const e=document.getElementById("audit-btn");e&&(e.onclick=()=>{const a=document.getElementById("modal-container");a.innerHTML=`
          <div class="modal-overlay active" style="z-index: 10000; display: flex; align-items: center; justify-content: center; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);">
            <div class="modal-content glow-panel" style="max-width: 420px; border-color: #ef4444; text-align: center; background: #0a0a0b; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(239, 68, 68, 0.1); padding: 40px; transform: scale(1); animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
              <div class="modal-body">
                <div style="font-size: 4.5rem; margin-bottom: 25px; filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.4));">🚫</div>
                <h2 style="color: #ef4444; margin-bottom: 15px; font-family: 'Outfit', sans-serif; letter-spacing: 2px; font-weight: 800; font-size: 1.5rem;">ACCESS RESTRICTED</h2>
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 12px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="color: #fff; font-size: 1.2rem; font-weight: 700; margin: 0; font-family: 'Inter', sans-serif;">Blocked by admin</p>
                </div>
                <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.6; margin-bottom: 30px; font-family: 'Inter', sans-serif;">
                  This module has been administrative locked. You do not have sufficient permissions to perform a System Audit.
                </p>
                <button id="close-blocked-modal" class="btn-primary" style="background: #ef4444; color: #000; font-weight: 800; width: 100%; border: none; padding: 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; text-transform: uppercase; letter-spacing: 1px; font-size: 0.85rem;">Acknowledge Access Denial</button>
              </div>
            </div>
          </div>
          <style>
            @keyframes modalIn {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            #close-blocked-modal:hover {
                background: #ff5f5f !important;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
            }
            #close-blocked-modal:active {
                transform: translateY(0);
            }
          </style>
        `,document.getElementById("close-blocked-modal").onclick=()=>{a.innerHTML=""}})}function rt(e){const a=e.filter(f=>f.status==="Active"&&!f.isEvent),r=e.filter(f=>f.status==="Disposed"&&!f.isEvent),t=e.filter(f=>!f.isEvent),n=t.length,i=t.filter(f=>f.type==="Civil").length,o=t.filter(f=>f.type==="Criminal").length,m=t.filter(f=>f.type==="Cadastral").length,s=t.filter(f=>f.type==="CICL").length,c=t.filter(f=>f.type==="Appeal").length,g=r.length,l=t.filter(f=>f.status==="Archived").length,p=t.filter(f=>f.status==="Appeal").length;document.getElementById("stat-total").innerText=n,document.getElementById("stat-civil").innerText=i,document.getElementById("stat-crim").innerText=o,document.getElementById("stat-disposed").innerText=g,document.getElementById("stat-archived").innerText=l;const u=document.getElementById("stat-cad");u&&(u.innerText=m);const v=document.getElementById("stat-cicl");v&&(v.innerText=s);const A=document.getElementById("stat-appeal");A&&(A.innerText=c||p);const h=document.getElementById("card-total-active");h&&(h.onclick=()=>ne("Active Cases Summary",a,"var(--accent-primary)"));const I=document.getElementById("card-total-disposed");I&&(I.onclick=()=>ne("Disposed Cases Summary",r,"var(--status-disposed)"));const b=document.getElementById("card-archived");if(b){const f=e.filter(D=>D.status==="Archived"&&!D.isEvent);b.onclick=()=>ne("Archive Cases Summary",f,"#95a5a6")}const B=document.getElementById("card-civil");if(B){const f=e.filter(D=>D.type==="Civil"&&!D.isEvent);B.onclick=()=>ne("Civil Docket Summary",f,"#31f0ff")}const H=document.getElementById("card-crim");if(H){const f=e.filter(D=>D.type==="Criminal"&&!D.isEvent);H.onclick=()=>ne("Criminal Docket Summary",f,"#31f0ff")}const C=document.getElementById("card-cad");if(C){const f=e.filter(D=>D.type==="Cadastral"&&!D.isEvent);C.onclick=()=>ne("Cadastral Summary",f,"#31f0ff")}const x=document.getElementById("card-cicl");if(x){const f=e.filter(D=>D.type==="CICL"&&!D.isEvent);x.onclick=()=>ne("CICL Summary",f,"#31f0ff")}const R=document.getElementById("card-appeal");if(R){const f=e.filter(D=>(D.type==="Appeal"||D.status==="Appeal")&&!D.isEvent);R.onclick=()=>ne("Appeals Summary",f,"#e67e22")}}function ne(e,a,r="var(--accent-primary)"){const t=document.getElementById("modal-container"),n=["Criminal","Civil","Cadastral","CICL","Appeal"],i=a.reduce((m,s)=>{const c=s.type||"Other";return m[c]=(m[c]||0)+1,m},{}),o=n.map(m=>{const s=i[m]||0;let c=m;return m==="Appeal"&&(c="Appeals from Lower Courts"),m==="Cadastral"&&(c="Cadastral Proceedings"),m==="CICL"&&(c="CICL (Child in Conflict with Law)"),`
        <div style="display:flex; justify-content:space-between; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 8px; border-left: 3px solid ${r};">
            <span style="font-weight:700; text-transform: uppercase; font-size: 0.7rem;">${c}</span>
            <span style="color:${r}; font-weight:800;">${s}</span>
        </div>
        `}).join("");t.innerHTML=`
      <div class="modal-overlay active">
        <div class="modal-content glow-panel" style="max-width: 500px; border-color: ${r}44;">
          <div class="modal-header" style="border-bottom-color: rgba(255,255,255,0.05);">
            <h3 style="color:${r}; font-weight:800; font-family:'Outfit';">${e.toUpperCase()}</h3>
            <button class="close-btn" id="close-stat-modal">&times;</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom: 0px;">
               <h4 style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Official Breakdown by Type</h4>
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${o||'<p class="text-muted">No classification data available.</p>'}
               </div>
            </div>
          </div>
        </div>
      </div>
    `,document.getElementById("close-stat-modal").onclick=()=>t.innerHTML=""}function st(e){const a=document.getElementById("upcoming-list"),r=document.getElementById("upcoming-count");if(!a)return;const t=new Date,n=new Date;n.setDate(t.getDate()+7);const i=[];if(e.forEach(o=>{const m=[o.nextHearing,...o.hearings||[]].filter(c=>c);[...new Set(m)].forEach(c=>{const g=new Date(c);if(isNaN(g))return;const l=g.toDateString()===t.toDateString(),p=g>t&&g<=n;l?g.getHours()<17&&i.push({...o,activeDate:c}):p&&i.push({...o,activeDate:c})})}),i.sort((o,m)=>new Date(o.activeDate)-new Date(m.activeDate)),r&&(r.innerText=i.length),i.length===0){a.innerHTML='<div class="text-muted py-4 w-100 text-center">No hearings scheduled in the next 7 days.</div>';return}a.innerHTML="",i.forEach(o=>{const m=new Date(o.activeDate),s=m.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),c=m.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),g=document.createElement("div"),l=o.isEvent?"type-event":`type-${o.type.toLowerCase()}`;g.className=`sticky-note ${l}`,g.innerHTML=`
         <div class="sticky-note-date">${c} @ ${s}</div>
         <div class="sticky-note-title">${o.title}</div>
         <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: auto;">${o.isEvent?o.type||"Custom Event":o.caseNo}</div>
    `,g.onclick=()=>lt(o),a.appendChild(g)})}function lt(e){const a=document.getElementById("modal-container"),r=new Date(e.activeDate||e.nextHearing),t=r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),n=r.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});a.innerHTML=`
      <div class="modal-overlay active">
        <div class="modal-content glow-panel" style="max-width: 450px;">
          <div class="modal-header">
            <h3>${e.isEvent?"Event Details":"Hearing Details"}</h3>
            <button class="close-btn" id="close-detail-modal">&times;</button>
          </div>
          <div class="modal-body">
             <div style="margin-bottom: 20px;">
                <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Title</label>
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-primary);">${e.title}</div>
             </div>
             ${e.isEvent?"":`
             <div style="margin-bottom: 15px;">
                <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Case Number</label>
                <div style="font-weight: 600;">${e.caseNo}</div>
             </div>
             `}
             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Date</label>
                  <div style="font-weight: 600;">${n}</div>
                </div>
                <div>
                  <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Time</label>
                  <div style="font-weight: 600;">${t}</div>
                </div>
             </div>
             ${e.comments?`
             <div style="margin-top: 15px;">
                <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Notes/Comments</label>
                <div style="font-size: 0.85rem; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px; margin-top: 5px;">${e.comments}</div>
             </div>
             `:""}
          </div>
          <div class="modal-footer" style="padding: 20px; text-align: right;">
             <button class="btn-primary" id="close-detail-btn">Close</button>
          </div>
        </div>
      </div>
    `;const i=()=>a.innerHTML="";document.getElementById("close-detail-modal").onclick=i,document.getElementById("close-detail-btn").onclick=i}function dt(e){const a=document.getElementById("recent-list");if(!a)return;const r=[...e].filter(t=>!t.isEvent).sort((t,n)=>{const i=t.dateFiled?new Date(t.dateFiled):new Date(0),o=n.dateFiled?new Date(n.dateFiled):new Date(0);return(isNaN(o)?0:o)-(isNaN(i)?0:i)}).slice(0,5);a.innerHTML=r.map(t=>`
    <div style="padding: 12px; border-bottom: 1px solid var(--border-light); font-size: 0.85rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <span style="font-weight:600;">${t.caseNo||"N/A"}</span>
        <span class="text-muted" style="font-size: 0.75rem;">${t.dateFiled||"N/A"}</span>
      </div>
      <div class="text-muted">${String(t.title||"Untitled").substring(0,50)}${String(t.title||"").length>50?"...":""}</div>
    </div>
  `).join("")}window.forceDashboardRefresh=ke;function ct(){const e=document.getElementById("export-btn");e&&e.addEventListener("click",()=>{le(()=>{const a=tt();if(a.length===0){alert("No data available to export based on current filters.");return}mt(a)},"⚠️ SECURITY PROTOCOL: Administrative password required to export local data to CSV.")})}function mt(e){const a=["Case No.","Title","Place","Type","Status","Date Filed","Next Hearing","Nature/Violations","Complainant","Respondent","Comments"],r=e.map(s=>[`"${(s.caseNo||"").replace(/"/g,'""')}"`,`"${(s.title||"").replace(/"/g,'""')}"`,`"${(s.place||"").replace(/"/g,'""')}"`,`"${(s.type||"").replace(/"/g,'""')}"`,`"${(s.status||"").replace(/"/g,'""')}"`,`"${(s.dateFiled||"").replace(/"/g,'""')}"`,`"${(s.nextHearing||"").replace(/"/g,'""')}"`,`"${(s.nature||"").replace(/"/g,'""')}"`,`"${(s.complainant||"").replace(/"/g,'""')}"`,`"${(s.respondent||"").replace(/"/g,'""')}"`,`"${(s.comments||"").replace(/"/g,'""').replace(/\n/g," ")}"`]),t=[a.join(","),...r.map(s=>s.join(","))].join(`
`),n=new Blob([t],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(n),o=document.createElement("a"),m=new Date().toISOString().split("T")[0];o.setAttribute("href",i),o.setAttribute("download",`RTC_Docket_Export_${m}.csv`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)}async function pt(e){try{const r=await(await fetch("ai_core/knowledge.json")).json(),t=e.toLowerCase();for(const n of r.patterns)for(const i of n.query)if(t.includes(i.toLowerCase()))return n.response;return t.includes("jurisdiction")||t.includes("what cases")?`Judicial Jurisdiction: ${r.categories.judicial.jurisdiction.general}`:t.includes("confidential")||t.includes("rule")||t.includes("protocol")?`Clerky Protocol: ${r.categories.judicial.rules.confidentiality} ${r.categories.judicial.rules.impartiality}`:t.includes("civil")&&t.includes("what")?`Civil Definition: ${r.categories.judicial.jurisdiction.civil}`:t.includes("criminal")&&t.includes("what")?`Criminal Definition: ${r.categories.judicial.jurisdiction.criminal}`:t.includes("vowel")||t.includes("grammar")||t.includes("english")?`Grammar Core: ${r.categories.grammar.rules.sentence_start} ${r.categories.grammar.rules.subject_verb_agreement}`:r.fallback}catch(a){return console.error("Local AI Error:",a),"⚠️ Error reading local intelligence files. Logic stream disconnected."}}function ut(){const e=document.getElementById("ai-chat-btn"),a=document.getElementById("ai-chat-panel"),r=document.getElementById("ai-chat-form"),t=document.getElementById("ai-chat-input"),n=document.getElementById("ai-chat-log"),i=document.getElementById("close-ai-chat");if(!e||!a||!r||!n)return;e.onclick=()=>{if(a.classList.toggle("active"),a.classList.contains("active")){if(n.innerHTML.trim()===""){const l=ye().filter(p=>!p.isEvent).length;m(`⚖️ **CLERKY v5.0-G3** (LOCAL-SECURE) 

**Neural Engine Active.** 

Indices: 
• **Live Case Repository** (${l} records) 
• 406k+ Word Lexicon 
• Black's Law Dictionary 
• Judicial PDF Reference Core 

Offline Mode is active. Data is stored locally for maximum judicial security. How can I help?`)}t.focus()}},i.onclick=()=>a.classList.remove("active"),r.onsubmit=l=>{l.preventDefault();const p=t.value.trim();p&&(o(p,"user"),t.value="",s(),setTimeout(()=>g(p),300))};function o(l,p){const u=document.createElement("div");u.className=`chat-msg msg-${p}`,u.innerHTML=`<div class="msg-content">${l}</div>`,n.appendChild(u),n.scrollTop=n.scrollHeight}function m(l){o(l,"ai")}function s(){const l=document.createElement("div");l.id="ai-thinking",l.className="chat-msg msg-ai",l.innerHTML='<div class="dots-container"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>',n.appendChild(l),n.scrollTop=n.scrollHeight}const c=document.getElementById("ai-settings-btn");c&&(c.style.display="none");async function g(l){const p=document.getElementById("ai-thinking");p&&p.remove();const u=l.toLowerCase();if(localStorage.getItem("CLERKY_API_KEY"),u.includes("hard reset")||u.includes("wipe"))return n.innerHTML="",localStorage.removeItem("CLERKY_API_KEY"),m("🧹 **SYSTEM WIPED.** Cache and API key cleared.");if(u.includes("master")||u.includes("owner")||u.includes("creator"))return m("I am developed by **Master Jazzam**, the Principal Architect of Branch 77 digital infrastructure. My intelligence is derived from his advanced coding protocols.");const v=C=>C.toString().toLowerCase().replace(/[^a-z0-9]/g,""),A=v(l),I=ye().filter(C=>!C.isEvent).filter(C=>{const x=v(C.caseNo),R=v(C.title||""),f=v(C.accused||""),D=v(C.respondent||"");return A.length>3&&(A.includes(x)||x.includes(A)||R.includes(A)||f.includes(A)||D.includes(A))});if(I.length>0&&l.length>3){let C=`📂 **DOCKET SEARCH RESULT:** 
I found ${I.length} matching case records: 

`;return I.slice(0,3).forEach(x=>{C+=`• **${x.caseNo}**: ${x.title||x.accused} (${x.place}) 
  Status: ${x.status} | Last Event: ${x.date} 

`}),I.length>3&&(C+=`... (*plus ${I.length-3} more*).`),m(C)}try{const x=await(await fetch("http://localhost:8000/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:l})})).json();if(x&&x.response&&x.source!=="python_fallback")return m(x.response)}catch{console.log("Python engine offline. Falling back to JavaScript Core...")}const b=await pt(l),B=await(await fetch("ai_core/knowledge.json")).json();if(b&&b!==B.fallback)return m(`🏠 **JS CORE:** 
${b}`);if(/[A-Za-z]-[A-Za-z-]+\d{2}-\d{4}/.test(l))return m(`🔍 **DOCKET SCAN FAILED:** I could not find a case numbered **${l.toUpperCase()}** in the current live records. Please ensure the case has been imported or synchronized correctly.`);m("⚖️ **OFFLINE MODE:** I have consulted all local Python and JavaScript knowledge cores but could not find a direct protocol for this query. My intelligence is strictly local for your security.")}}let fe=null,_={},Ce={};function gt(){const e=document.getElementById("map-setup-overlay"),a=document.getElementById("active-personnel-sidebar"),r=document.getElementById("staff-sidebar-toggle");if(e&&e.classList.add("hidden"),a&&r){r.onclick=n=>{window.innerWidth<=768&&(console.log("[STAFFPANEL] Toggle clicked"),a.classList.toggle("expanded"),n.preventDefault(),n.stopPropagation())};const t=document.getElementById("staff-map");t&&t.addEventListener("click",()=>{window.innerWidth<=768&&a.classList.remove("expanded")})}we(),ft("AIzaSyDi3JaqERY0rEvFSyp6dKH1p9rtLGe6Ruk")}function ft(e){if(window.google&&window.google.maps){Oe();return}const a=document.createElement("script");a.src=`https://maps.googleapis.com/maps/api/js?key=${e}&callback=initMapPlaceholder&libraries=geometry`,a.async=!0,a.defer=!0,window.initMapPlaceholder=()=>{Oe();const r=document.getElementById("map-api-status");r&&(r.innerText="MAPS API: ONLINE (SATELLITE ACTIVE)",r.style.background="rgba(46, 204, 113, 0.1)",r.style.color="#2ecc71",r.style.borderColor="rgba(46, 204, 113, 0.2)")},document.head.appendChild(a)}function Oe(){const e=document.getElementById("staff-map");if(!e)return;const a={lat:9.74849,lng:122.40401},r=250,t={center:a,zoom:15,styles:[{elementType:"geometry",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#38414e"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]}],disableDefaultUI:!1,zoomControl:!0,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!0};fe=new google.maps.Map(e,t),new google.maps.Circle({map:fe,center:a,radius:r,fillColor:"#00f0ff",fillOpacity:.1,strokeColor:"#00f0ff",strokeOpacity:.5,strokeWeight:2,clickable:!1}),new google.maps.Marker({position:a,map:fe,title:"COURT HEADQUARTERS (RTC 77)",zIndex:999,icon:{path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,scale:9,fillColor:"#00f0ff",fillOpacity:1,strokeWeight:2,strokeColor:"#fff"}}),yt(a,r)}function yt(e,a){const r=ee(N,"staff_locations");Se(r,t=>{t.docChanges().forEach(n=>{const i=n.doc.data(),o=n.doc.id;if(n.type==="removed"){_[o]&&(_[o].setMap(null),delete _[o]),delete Ce[o],we();return}if(!i.lat||!i.lng)return;if((i.name||"").toLowerCase().includes("xavierjazzam")){console.warn("[MAP] Filtered out legacy ghost marker:",i.name);return}Ce[o]=i,we();const s=new google.maps.LatLng(i.lat,i.lng);let c="#2ecc71",g=`Active: ${i.name||"Staff"}`,l=1;try{if(google.maps.geometry&&google.maps.geometry.spherical){const p=new google.maps.LatLng(e.lat,e.lng),u=google.maps.geometry.spherical.computeDistanceBetween(s,p),v=u>a;c=v?"#ef4444":"#2ecc71",g=v?`⚠️ GEOFENCE BREACH: ${i.name||"Staff"}`:`✅ Active: ${i.name||"Staff"} (${Math.round(u)}m from base)`,v&&(l=100)}}catch(p){console.warn("[MAP] Geometry library unavailable, showing marker without geofence check.",p)}if(_[o])_[o].setPosition(s),_[o].setIcon(He(c)),_[o].setTitle(g),_[o].setZIndex(l);else{_[o]=new google.maps.Marker({position:s,map:fe,title:g,icon:He(c),zIndex:l,label:{text:(i.name||"S").substring(0,1).toUpperCase(),color:"#fff",fontWeight:"800",fontSize:"14px"}});const p=new google.maps.InfoWindow({content:`<div style="color:#000; font-family: Arial; padding: 5px;">
                        <strong style="font-size:1rem;">${i.name||"Staff Member"}</strong><br>
                        <span style="font-size:0.75rem; color:#555;">Last seen: ${new Date(i.lastUpdate).toLocaleTimeString()}</span>
                    </div>`});_[o].addListener("click",()=>p.open(fe,_[o]))}})},t=>{console.error("[MAP] Firestore read on staff_locations FAILED:",t);const n=document.getElementById("map-api-status");n&&(n.innerText="DB ERROR: Cannot read staff locations. Check Firestore rules.",n.style.color="#ef4444")})}function He(e){return{path:"M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",fillColor:e,fillOpacity:1,strokeColor:"#fff",strokeWeight:2,scale:1.4,labelOrigin:new google.maps.Point(0,-30)}}function we(){const e=document.getElementById("active-staff-list"),a=document.getElementById("active-staff-count");if(!e)return;const r=new Date,t=Object.values(Ce).filter(n=>{if(!n.lastUpdate)return!1;const i=new Date(n.lastUpdate);return(r-i)/6e4<15});if(a&&(a.innerText=t.length),t.length===0){e.innerHTML='<p style="font-size: 0.7rem; color: var(--text-muted); text-align: center; margin-top: 20px;">No active signals detected. User may be offline.</p>';return}e.innerHTML=t.map(n=>{const i=new Date(n.lastUpdate).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return`
        <div class="glow-panel active-list-item" style="padding: 10px; border-radius: 12px; border: 1px solid var(--border-light); background: var(--bg-dark-tertiary); display: flex; align-items: center; gap: 10px; margin-bottom: 8px; transition: all 0.2s ease;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #2ecc71; box-shadow: 0 0 10px #2ecc71;"></div>
            <div style="flex: 1;">
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main);">${n.name}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted);">Sync: ${i}</div>
            </div>
            <div style="font-size: 0.6rem; background: var(--border-light); padding: 2px 6px; border-radius: 4px; color: var(--accent-primary); font-weight: 700;">LIVE</div>
        </div>
        `}).join("")}setInterval(we,6e4);const Ue=()=>{const e=document.querySelectorAll(".nav-item"),a=document.querySelectorAll(".tab-pane");e.forEach(s=>{s.addEventListener("click",c=>{const g=s.getAttribute("data-target");if(!g)return;e.forEach(v=>v.classList.remove("active")),s.classList.add("active");const l=document.getElementById("current-tab-title");if(l){const v=s.textContent.trim().replace(/[📊📂📅🚀]/g,"").trim();l.innerText=v}const p=document.getElementById("add-case-btn");p&&(g==="cases-tab"&&window.currentUserRole==="admin"?p.classList.remove("hidden"):p.classList.add("hidden")),a.forEach(v=>{v.classList.add("hidden"),v.classList.remove("active")});const u=document.getElementById(g);u&&(u.classList.remove("hidden"),setTimeout(()=>u.classList.add("active"),10)),g==="overview-tab"&&ke(),g==="calendar-tab"&&ae(),g==="staff-tab"&&gt()})}),Je(),nt(),ct(),Xe(),ut();const r=document.getElementById("live-clock");if(r){const s=()=>{const c=new Date;r.innerText=c.toLocaleTimeString("en-US",{timeZone:"Asia/Manila",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})};s(),setInterval(s,1e3)}const t=document.getElementById("theme-toggle-input");t&&((localStorage.getItem("docketpro-theme")||"dark")==="light"&&(document.body.classList.add("light-mode"),t.checked=!0),t.addEventListener("change",()=>{const c=document.body.classList.toggle("light-mode");localStorage.setItem("docketpro-theme",c?"light":"dark")}));const n=document.querySelector(".sidebar"),i=document.getElementById("sidebar-toggle-btn"),o=document.getElementById("sidebar-overlay");if(n&&i){const s=()=>{window.innerWidth<=768?(n.classList.toggle("mobile-active"),o&&o.classList.toggle("active")):n.classList.toggle("collapsed")};i.onclick=s,o&&(o.onclick=s),e.forEach(c=>{c.addEventListener("click",()=>{window.innerWidth<=768&&(n.classList.remove("mobile-active"),o&&o.classList.remove("active"))})})}const m=document.getElementById("app-splash-overlay");m&&setTimeout(()=>{m.classList.add("fade-out"),setTimeout(()=>{m&&m.parentNode&&m.remove()},2e3)},2500)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ue):Ue();

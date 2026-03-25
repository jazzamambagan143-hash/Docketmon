import { db } from './firebase-config.js';
import { collection, onSnapshot, query, limit } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

let staffMap = null;
let markers = {};
let staffData = {}; // Tracks document objects for listing

export function initStaffMonitoring() {
    const setupOverlay = document.getElementById('map-setup-overlay');
    const staffSidebar = document.getElementById('active-personnel-sidebar');
    const sidebarToggle = document.getElementById('staff-sidebar-toggle');

    if (setupOverlay) {
        setupOverlay.classList.add('hidden');
    }

    if (staffSidebar && sidebarToggle) {
        // Toggle Expanded State for Mobile view
        sidebarToggle.onclick = (e) => {
            if (window.innerWidth <= 768) {
                console.log("[STAFFPANEL] Toggle clicked");
                staffSidebar.classList.toggle('expanded');
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // Close when clicking map (only on mobile)
        const mapDiv = document.getElementById('staff-map');
        if (mapDiv) {
            mapDiv.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    staffSidebar.classList.remove('expanded');
                }
            });
        }
    }

    updatePersonnelSidebar(); 

    // Google Maps Integration Automatically Injected by Hardcode Request
    loadGoogleMaps("AIzaSyDi3JaqERY0rEvFSyp6dKH1p9rtLGe6Ruk");
}

function loadGoogleMaps(key) {
    if (window.google && window.google.maps) {
        startMap();
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMapPlaceholder&libraries=geometry`;
    script.async = true;
    script.defer = true;

    window.initMapPlaceholder = () => {
        startMap();
        const statusEl = document.getElementById('map-api-status');
        if (statusEl) {
            statusEl.innerText = "MAPS API: ONLINE (SATELLITE ACTIVE)";
            statusEl.style.background = "rgba(46, 204, 113, 0.1)";
            statusEl.style.color = "#2ecc71";
            statusEl.style.borderColor = "rgba(46, 204, 113, 0.2)";
        }
    };

    document.head.appendChild(script);
}

function startMap() {
    const mapDiv = document.getElementById('staff-map');
    if (!mapDiv) return;

    // --- GEOFENCE CONFIGURATION ---
    // Headquarters: Sipalay Old City Hall (RTC Branch 77 Homebase)
    const courtLocation = { lat: 9.74849, lng: 122.40401 };
    const SAFE_RADIUS_METERS = 250;

    const mapOptions = {
        center: courtLocation,
        zoom: 15,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
    };

    staffMap = new google.maps.Map(mapDiv, mapOptions);

    // 1. Draw the Virtual Perimeter Fence (The "Safe Zone")
    new google.maps.Circle({
        map: staffMap,
        center: courtLocation,
        radius: SAFE_RADIUS_METERS,
        fillColor: "#00f0ff",
        fillOpacity: 0.1,
        strokeColor: "#00f0ff",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        clickable: false
    });

    // 2. Add Headquarters Marker
    new google.maps.Marker({
        position: courtLocation,
        map: staffMap,
        title: "COURT HEADQUARTERS (RTC 77)",
        zIndex: 999,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 9,
            fillColor: "#00f0ff",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#fff"
        }
    });

    listenForStaffLocations(courtLocation, SAFE_RADIUS_METERS);
}

function listenForStaffLocations(courtPos, radius) {
    const q = collection(db, 'staff_locations');

    onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const id = change.doc.id;

            if (change.type === 'removed') {
                if (markers[id]) {
                    markers[id].setMap(null); // Erase from map
                    delete markers[id];       // Delete reference
                }
                delete staffData[id];         // Remove from data pool
                updatePersonnelSidebar();     // Refresh UI
                return; // Stop processing for removed items
            }

            if (!data.lat || !data.lng) return; // Skip docs with missing coords

            const nameLower = (data.name || "").toLowerCase();
            if (nameLower.includes("xavierjazzam")) {
                console.warn("[MAP] Filtered out legacy ghost marker:", data.name);
                return; 
            }

            // Update tracked data for sidebar
            staffData[id] = data; 
            updatePersonnelSidebar(); 

            const staffPos = new google.maps.LatLng(data.lat, data.lng);

            // Default to green; change to red if geofence breach detected
            let markerColor = "#2ecc71";
            let markerTitle = `Active: ${data.name || 'Staff'}`;
            let zIndex = 1;

            // FIX: Wrap geometry in try/catch — if library not loaded, still show marker
            try {
                if (google.maps.geometry && google.maps.geometry.spherical) {
                    const courtLatLng = new google.maps.LatLng(courtPos.lat, courtPos.lng);
                    const distance = google.maps.geometry.spherical.computeDistanceBetween(staffPos, courtLatLng);
                    const isOutOfBounds = distance > radius;
                    markerColor = isOutOfBounds ? "#ef4444" : "#2ecc71";
                    markerTitle = isOutOfBounds
                        ? `⚠️ GEOFENCE BREACH: ${data.name || 'Staff'}`
                        : `✅ Active: ${data.name || 'Staff'} (${Math.round(distance)}m from base)`;
                    if (isOutOfBounds) zIndex = 100; // Bring breaching users to front
                }
            } catch (geoErr) {
                console.warn("[MAP] Geometry library unavailable, showing marker without geofence check.", geoErr);
            }

            if (markers[id]) {
                // Update existing marker position + color
                markers[id].setPosition(staffPos);
                markers[id].setIcon(getMarkerIcon(markerColor));
                markers[id].setTitle(markerTitle);
                markers[id].setZIndex(zIndex);
            } else {
                // Create new marker for this staff member
                markers[id] = new google.maps.Marker({
                    position: staffPos,
                    map: staffMap,
                    title: markerTitle,
                    icon: getMarkerIcon(markerColor),
                    zIndex: zIndex,
                    label: {
                        text: (data.name || "S").substring(0, 1).toUpperCase(),
                        color: "#fff",
                        fontWeight: "800",
                        fontSize: "14px"
                    }
                });

                // Info window on click — shows name + last update
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div style="color:#000; font-family: Arial; padding: 5px;">
                        <strong style="font-size:1rem;">${data.name || 'Staff Member'}</strong><br>
                        <span style="font-size:0.75rem; color:#555;">Last seen: ${new Date(data.lastUpdate).toLocaleTimeString()}</span>
                    </div>`
                });
                markers[id].addListener('click', () => infoWindow.open(staffMap, markers[id]));
            }
        });
    }, (err) => {
        // FIX: Surface Firestore permission errors visibly for the admin
        console.error("[MAP] Firestore read on staff_locations FAILED:", err);
        const statusEl = document.getElementById('map-api-status');
        if (statusEl) {
            statusEl.innerText = "DB ERROR: Cannot read staff locations. Check Firestore rules.";
            statusEl.style.color = "#ef4444";
        }
    });
}

function getMarkerIcon(color) {
    return {
        path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
        fillColor: color,
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 2,
        scale: 1.4, // Increased scale so it is clearly visible when zoomed out
        labelOrigin: new google.maps.Point(0, -30)
    };
}

// REAL-TIME SIDEBAR LOGIC
function updatePersonnelSidebar() {
    const listEl = document.getElementById('active-staff-list');
    const countEl = document.getElementById('active-staff-count');
    if (!listEl) return;

    const now = new Date();
    // Filter active staff: Updated in the last 15 minutes
    const activeStaff = Object.values(staffData).filter(s => {
        if (!s.lastUpdate) return false;
        const lastSeen = new Date(s.lastUpdate);
        const diffMinutes = (now - lastSeen) / 60000;
        return diffMinutes < 15; 
    });

    // Update Counter badge
    if (countEl) countEl.innerText = activeStaff.length;

    if (activeStaff.length === 0) {
        listEl.innerHTML = '<p style="font-size: 0.7rem; color: var(--text-muted); text-align: center; margin-top: 20px;">No active signals detected. User may be offline.</p>';
        return;
    }

    // Sort: Online/Breach vs Normal (simulated priority)
    listEl.innerHTML = activeStaff.map(s => {
        const lastSeenStr = new Date(s.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `
        <div class="glow-panel active-list-item" style="padding: 10px; border-radius: 12px; border: 1px solid var(--border-light); background: var(--bg-dark-tertiary); display: flex; align-items: center; gap: 10px; margin-bottom: 8px; transition: all 0.2s ease;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #2ecc71; box-shadow: 0 0 10px #2ecc71;"></div>
            <div style="flex: 1;">
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main);">${s.name}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted);">Sync: ${lastSeenStr}</div>
            </div>
            <div style="font-size: 0.6rem; background: var(--border-light); padding: 2px 6px; border-radius: 4px; color: var(--accent-primary); font-weight: 700;">LIVE</div>
        </div>
        `;
    }).join('');
}

// Maintenance timer to auto-remove users from list if they go offline (stop pulsing)
setInterval(updatePersonnelSidebar, 60000); // Check every minute

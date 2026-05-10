const badges = [
    { name: 'Rising Star',    date: '05/2023', icon: 'fa-star',     color: '#6b7280', active: true },
    { name: 'Top Performer',  date: '08/2023', icon: 'fa-trophy',   color: '#374151', active: true },
    { name: 'Project Leader', date: '11/2023', icon: 'fa-crown',    color: '#1e3a6e', active: true },
    { name: 'Hackathon Winner',date:'01/2024', icon: 'fa-bolt',     color: '#1e3a6e', active: true },
    { name: 'Team Player',    date: '03/2024', icon: 'fa-handshake',color: '#1e3a6e', active: true },
    { name: '...',            date: 'Đang cập nhật', icon: 'fa-ellipsis', color: '#d1d5db', active: false },
];

const badgesGrid = document.getElementById('badges-grid');
const badgeColors = ['#374151','#374151','#1e3a6e','#1e3a6e','#1e3a6e','#d1d5db'];
badges.forEach((b, i) => {
    const fill = b.active ? badgeColors[i] : '#d1d5db';
    badgesGrid.innerHTML += `
        <div class="badge-item ${b.active?'':'dimmed'}">
            <div class="badge-hex">
                <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="35,4 65,20 65,50 35,66 5,50 5,20" fill="${fill}" stroke="${b.active?'#fff':'#e5e7eb'}" stroke-width="2"/>
                    ${b.active ? `<polygon points="35,12 58,24 58,46 35,58 12,46 12,24" fill="${fill}" stroke="rgba(255,255,255,.15)" stroke-width="1"/>` : ''}
                </svg>
                <div class="badge-inner"><i class="fa-solid ${b.icon}" style="color:${b.active?'#fff':'#9ca3af'};font-size:20px;"></i></div>
            </div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-date">${b.date}</div>
        </div>`;
});
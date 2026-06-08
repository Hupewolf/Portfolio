document.querySelector("#header").innerHTML = `
    <nav class="navbar">
        <a href="../index.html" class="logo">
            <div class="logo-mark">
                BCN
            </div>
            <div>
                <div class="logo-name">BCN</div>
                <div class="logo-sub">Ban Công Nghệ</div>
            </div>
        </a>

        <ul class="nav-mid">
            <li><a href="../index.html">Trang Chủ</a></li>
            <li><a href="../html/user.html">Thành Viên</a></li>
            <li><a href="#">Dự Án</a></li>
            <li><a href="#">Bảng Xếp Hạng</a></li>
            <li><a href="#">Nhiệm Vụ</a></li>
            <li><a href="#">Sự Kiện</a></li>
        </ul>

        <div class="nav-right">
            <button class="nav-icon-btn" data-tip="Tìm kiếm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
            </button>
            <button class="nav-icon-btn" data-tip="Thông báo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span class="dot"></span>
            </button>
            <button class="nav-icon-btn" data-tip="Tin nhắn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            </button>
            <button class="nav-icon-btn" data-tip="Cài đặt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3" />
                    <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            </button>
            <div class="user-pill">
                <div class="user-ava">MT</div>
                <div>
                    <div class="user-pill-name">MinhTriet</div>
                    <div class="user-pill-lv">Level 24</div>
                </div>
                <svg class="caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </div>
    </nav>
`;


// Navbar scroll shadow
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)';
    } 
    else {
        navbar.style.boxShadow = '';
    }
}, { passive: true });

const currentPage = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-mid a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const fileName = href.split('/').pop();
    if (fileName === currentPage) {
        link.classList.add('active');
    }
});

const scrollBar = document.createElement('div');
scrollBar.className = 'scroll-progress';
document.body.prepend(scrollBar);
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });
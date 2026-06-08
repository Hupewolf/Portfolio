// EXP bar
window.addEventListener('load', () => {
    setTimeout(() => { document.getElementById('lvFill').style.width = '78.5%'; }, 400);
});

// Copy ID
function copyId() {
    navigator.clipboard.writeText('BCA01248').catch(() => { });
    toast('✓ Đã sao chép BCA01248');
}

// Toast
function toast(msg) {
    const old = document.querySelector('.toast');
    if (old) { clearTimeout(old._t); old.remove(); }
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    el._t = setTimeout(() => {
        el.style.transition = 'opacity 0.25s'; el.style.opacity = '0';
        setTimeout(() => el.remove(), 260);
    }, 1800);
}

// Sidebar
function activeSidebar(e, el) {
    e.preventDefault();
    document.querySelectorAll('.s-item').forEach(s => s.classList.remove('on'));
    el.classList.add('on');
}

// Thumbnail
function pickThumb(el) {
    document.querySelectorAll('.pc-thumb').forEach(t => t.classList.remove('on'));
    el.classList.add('on');
}

// Dots
function pickDot(el) {
    document.querySelectorAll('.pdot').forEach(d => d.classList.remove('on'));
    el.classList.add('on');
}

// Staggered row reveal
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.ir, .ach-item, .proj-item, .tech-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    el.style.transition = `opacity 0.28s ${i * 0.035}s ease, transform 0.28s ${i * 0.035}s ease`;
    io.observe(el);
});

// ── MICRO INTERACTIONS ──

// Scroll progress bar
const scrollBar = document.createElement('div');
scrollBar.className = 'scroll-progress';
document.body.prepend(scrollBar);
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

// Ripple effect on clickable cards & buttons
function addRipple(el) {
    el.classList.add('ripple-host');
    el.addEventListener('pointerdown', (e) => {
        const r = document.createElement('span');
        r.className = 'ripple';
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
        el.appendChild(r);
        r.addEventListener('animationend', () => r.remove());
    });
}
document.querySelectorAll('.ach-item, .tech-item, .proj-item, .tag, .s-item').forEach(addRipple);

// Magnetic hover on pc-char
const char = document.querySelector('.pc-char');
if (char) {
    char.addEventListener('mousemove', (e) => {
        const r = char.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width * 10;
        const dy = (e.clientY - cy) / r.height * 10;
        char.style.transform = `translateY(-6px) scale(1.015) rotateY(${dx}deg) rotateX(${-dy}deg)`;
    });
    char.addEventListener('mouseleave', () => {
        char.style.transform = '';
        char.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    });
    char.addEventListener('mouseenter', () => {
        char.style.transition = 'transform 0.15s ease';
    });
}

// Tag click feedback
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        toast('✦ ' + tag.textContent.trim());
        tag.style.background = 'var(--text)';
        tag.style.color = '#fafafa';
        tag.style.borderColor = 'var(--text)';
        setTimeout(() => {
            tag.style.background = '';
            tag.style.color = '';
            tag.style.borderColor = '';
        }, 700);
    });
});

// Counter animation for stats
function animateCount(el, target, suffix = '') {
    let start = 0;
    const dur = 900, step = 16;
    const inc = target / (dur / step);
    const t = setInterval(() => {
        start = Math.min(start + inc, target);
        el.textContent = Math.floor(start) + suffix;
        if (start >= target) clearInterval(t);
    }, step);
}

const statsIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            statsIO.unobserve(e.target);
            const n = parseInt(e.target.dataset.count);
            if (!isNaN(n)) animateCount(e.target, n, e.target.dataset.suffix || '');
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.cstat-val, .lv-num').forEach(el => {
    const n = parseInt(el.textContent);
    if (!isNaN(n)) {
        el.dataset.count = n;
        el.textContent = '0';
        statsIO.observe(el);
    }
});



// Hover tilt on achievement items
document.querySelectorAll('.ach-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.borderLeftWidth = '3px';
    });
    item.addEventListener('mouseleave', () => {
        item.style.borderLeftWidth = '';
    });
});


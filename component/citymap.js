// =====================================================
// CITYMAP — Bin-Packing Grid (không khoảng trống)
// Dùng CSS Grid + absolute positioning
// Unit = 1 ô lưới. CELL = 186px + 6px gap = 192px
// =====================================================

const UNIT = 186;   // px mỗi ô
const GAP  = 6;     // px gap
const COLS = 6;     // số cột tối đa

const MEMBERS = [
  { id:1,  name:"Nguyễn Ngọc Thái",  role:"Web Developer",  team:"Web", tier:1, tierLabel:"cộng tác viên",
    desc:"Đam mê xây dựng sản phẩm web với UX tốt và hiệu năng tối ưu.",
    skills:[], projects:12, stars:48, initials:"NT", w:2, h:2, link:"./html/user.html" },
  { id:2,  name:"Trần Minh Khoa",     role:"Web Engineer",    team:"Web",  tier:2, tierLabel:"Thành viên",
    desc:"Xây dựng API mạnh mẽ, tối ưu database và hệ thống microservices.",
    skills:[], projects:8, stars:31, initials:"MK", w:1, h:2, link:"./html/user.html" },
  { id:3,  name:"Lê Thu Hà",          role:"UI/UX Designer",      team:"design",   tier:2, tierLabel:"Thành viên",
    desc:"Thiết kế giao diện trực quan, nghiên cứu UX chuyên sâu.",
    skills:[], projects:6, stars:22, initials:"TH", w:1, h:2, link:"./html/user.html" },
  { id:4,  name:"Phạm Đức Anh",       role:"App Developer", team:"App",tier:1, tierLabel:"cộng tác viên",
    desc:"Từ ý tưởng đến sản phẩm hoàn chỉnh — TypeScript, GraphQL, Prisma.",
    skills:[], projects:15, stars:62, initials:"ĐA", w:2, h:3, link:"./html/user.html" },
  { id:5,  name:"Võ Thị Mai",         role:"Web Dev",        team:"Web", tier:3, tierLabel:"Thực tập sinh",
    desc:"Học và đóng góp vào các dự án Web của ban.",
    skills:[], projects:2, stars:5, initials:"TM", w:1, h:1, link:"./html/user.html" },
  { id:6,  name:"Hoàng Văn Bình",     role:"Web Dev",         team:"Web",  tier:3, tierLabel:"Thực tập sinh",
    desc:"Đang học Express và xây dựng RESTful API.",
    skills:[], projects:1, stars:3, initials:"VB", w:1, h:1 },
  { id:7,  name:"Đinh Quốc Hùng",     role:"DevOps Engineer",     team:"Web",  tier:2, tierLabel:"Thành viên",
    desc:"Tự động hóa CI/CD, quản lý cloud infrastructure cho team.",
    skills:[], projects:9, stars:27, initials:"QH", w:2, h:1, link:"./html/user.html" },
  { id:8,  name:"Nguyễn Lan Anh",     role:"UI Designer",         team:"design",   tier:3, tierLabel:"Thực tập sinh",
    desc:"Thực tập sinh thiết kế, tập trung vào mobile UI.",
    skills:[], projects:1, stars:4, initials:"LA", w:1, h:1 },
  { id:9,  name:"Bùi Minh Tâm",       role:"Web Developer",  team:"Web", tier:2, tierLabel:"Thành viên",
    desc:"Chuyên về animation, micro-interaction và performance web.",
    skills:[], projects:7, stars:19, initials:"MT", w:1, h:2, link:"./html/user.html" },
  { id:10, name:"Trịnh Khánh Linh",   role:"Product Designer",    team:"design",   tier:1, tierLabel:"cộng tác viên",
    desc:"Dẫn dắt design system, UX research cho các sản phẩm BCN Tech.",
    skills:[], projects:11, stars:44, initials:"KL", w:2, h:2, link:"./html/user.html" },
  { id:11, name:"Lý Công Thành",      role:"App Dev",       team:"App",tier:3, tierLabel:"Thực tập sinh",
    desc:"Đang học React và Express, đam mê App.",
    skills:[], projects:1, stars:2, initials:"CT", w:1, h:1 },
  { id:12, name:"Phan Thế Vinh",      role:"Web Engineer",    team:"Web",  tier:2, tierLabel:"Thành viên",
    desc:"Chuyên sâu database optimization và Web architecture.",
    skills:[], projects:6, stars:18, initials:"TV", w:2, h:1, link:"./html/user.html" },
  { id:13, name:"Cao Thị Ngọc",       role:"Web Dev",        team:"Web", tier:2, tierLabel:"Thành viên",
    desc:"Xây dựng UI component library cho internal tools.",
    skills:[], projects:5, stars:14, initials:"TN", w:1, h:1, link:"./html/user.html" },
  { id:14, name:"Đặng Quang Minh",    role:"App Developer", team:"App",tier:1, tierLabel:"cộng tác viên",
    desc:"Kiến trúc hệ thống scalable, lead tech cho dự án BCN Portal.",
    skills:[], projects:14, stars:55, initials:"QM", w:2, h:2, link:"./html/user.html" },
  { id:15, name:"Ngô Thị Bảo Châu",  role:"Web Dev",         team:"Web",  tier:3, tierLabel:"Thực tập sinh",
    desc:"Đang học NestJS và khám phá microservices.",
    skills:[], projects:1, stars:2, initials:"BC", w:1, h:1 },
];

// Tier colors
const TIER_FG = { 1:"#1A6BFF", 2:"#00D4AA", 3:"#7A7A7A" };
const TIER_BG = { 1:"#EBF1FF", 2:"#E0FAF5", 3:"#F2F1ED" };

// ─── Bin Packing ──────────────────────────────────────
// Dùng mảng 2D (boolean grid) để track ô đã dùng
// Thử đặt từng card theo thứ tự: quét từ trái→phải, trên→dưới

function packItems(items, cols) {
  // grid[row][col] = true nếu ô đã bị chiếm
  const grid = [];

  function ensureRows(n) {
    while (grid.length < n) grid.push(new Array(cols).fill(false));
  } 

  function canPlace(row, col, w, h) {
    if (col + w > cols) return false;
    ensureRows(row + h);
    for (let r = row; r < row + h; r++)
      for (let c = col; c < col + w; c++)
        if (grid[r][c]) return false;
    return true;
  }

  function place(row, col, w, h) {
    ensureRows(row + h);
    for (let r = row; r < row + h; r++)
      for (let c = col; c < col + w; c++)
        grid[r][c] = true;
  }

  function findSlot(w, h) {
    for (let row = 0; ; row++) {
      ensureRows(row + h);
      for (let col = 0; col <= cols - w; col++) {
        if (canPlace(row, col, w, h)) return { row, col };
      }
    }
  }

  return items.map(item => {
    const { row, col } = findSlot(item.w, item.h);
    place(row, col, item.w, item.h);
    return { ...item, row, col };
  });
}

// ─── Card Builder ─────────────────────────────────────
function buildCard(m) {
  const fg = TIER_FG[m.tier];
  const bg = TIER_BG[m.tier];
  const pxW = m.w * UNIT + (m.w - 1) * GAP;
  const pxH = m.h * UNIT + (m.h - 1) * GAP;
  const pxX = m.col * (UNIT + GAP);
  const pxY = m.row * (UNIT + GAP);

  // Nội dung tùy kích thước
  const isSmall = m.w === 1 && m.h === 1;
  const isWide  = m.w >= 2 && m.h === 1;
  const isTall  = m.h >= 2;

  const skillCount = isSmall ? 0 : isWide ? 2 : m.w >= 2 ? 3 : 2;
  const skillsHTML = m.skills.slice(0, skillCount)
    .map(s => `<span class="mc-skill">${s}</span>`).join("");

  const descHTML = isSmall || isWide
    ? "" : `<p class="mc-desc">${m.desc}</p>`;

  const statsHTML = `
    <div class="mc-stats">
      <div class="mc-stat"><span class="mc-stat-n">${m.projects}</span><span class="mc-stat-l">dự án</span></div>
    </div>`;

  const linkHTML = m.link
    ? `<a href="${m.link}" class="mc-link" title="Xem hồ sơ">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
       </a>` : "";

  const tooltipHTML = isSmall
    ? `<div class="mc-tooltip">${m.name} · ${m.role}</div>` : "";

  return `
    <div class="mcard" data-team="${m.team}" data-id="${m.id}"
      style="
        position:absolute;
        left:${pxX}px; top:${pxY}px;
        width:${pxW}px; height:${pxH}px;
        --tier-fg:${fg}; --tier-bg:${bg};
      ">
      ${tooltipHTML}
      <div class="mc-glow"></div>
      <div class="mc-inner">
        <div class="mc-top">
          <div class="mc-head">
            <div class="mc-avatar" style="background:${bg};color:${fg}">${m.initials}</div>
            <span class="mc-badge">${m.tierLabel}</span>
          </div>
          <div class="mc-role">${m.role}</div>
          <div class="mc-name">${m.name}</div>
          ${descHTML}
          ${skillsHTML ? `<div class="mc-skills">${skillsHTML}</div>` : ""}
        </div>
        <div class="mc-foot">
          ${statsHTML}
          ${linkHTML}
        </div>
      </div>
    </div>`;
}

// ─── Render ───────────────────────────────────────────
function renderGrid(filter = "all") {
  const grid = document.getElementById("citymap-grid");
  if (!grid) return;

  const items = filter === "all"
    ? MEMBERS : MEMBERS.filter(m => m.team === filter);

  // Pack
  const packed = packItems(items, COLS);

  // Tính chiều cao tổng
  const totalRows = Math.max(...packed.map(m => m.row + m.h));
  const totalH = totalRows * UNIT + (totalRows - 1) * GAP;

  // Render
  grid.style.position = "relative";
  grid.style.height = totalH + "px";
  grid.innerHTML = packed.map(buildCard).join("");

  // Animate
  grid.querySelectorAll(".mcard").forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "scale(0.94)";
    setTimeout(() => {
      el.style.transition = "opacity 0.22s ease, transform 0.22s ease";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    }, i * 30);
  });

  // Counter
  const statEl = document.getElementById("stat-members");
  if (statEl) {
    let count = 0;
    const target = MEMBERS.length;
    const timer = setInterval(() => {
      count = Math.min(count + 1, target);
      statEl.textContent = count;
      if (count >= target) clearInterval(timer);
    }, 60);
  }
}

// Filter
document.querySelectorAll(".cf-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cf-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGrid(btn.dataset.filter);
  });
});

renderGrid();

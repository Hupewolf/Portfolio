// Dữ liệu tất cả các dự án
const allProjects = [
    {
        name: "BCN Portfolio Web",
        desc: "Website portfolio dành cho thành viên BCN Tech.",
        tags: ["React", "TypeScript", "TailwindCSS"],
        thumbClass: "pt1"
    },
    {
        name: "StudyHub",
        desc: "Nền tảng học tập trực tuyến cho sinh viên.",
        tags: ["Next.js", "Node.js", "MongoDB"],
        thumbClass: "pt2"
    },
    {
        name: "Event Management",
        desc: "Hệ thống quản lý sự kiện nội bộ BCN.",
        tags: ["React", "Firebase", "Material UI"],
        thumbClass: "pt3"
    },
    {
        name: "AI Resume Review",
        desc: "Ứng dụng AI hỗ trợ review CV và gợi ý cải thiện.",
        tags: ["Python", "FastAPI", "OpenAI"],
        thumbClass: "pt4"
    },
    {
        name: "Social Media Dashboard",
        desc: "Dashboard quản lý các nền tảng mạng xã hội.",
        tags: ["React", "Redux", "Firebase"],
        thumbClass: "pt1"
    },
    {
        name: "E-Commerce Platform",
        desc: "Nền tảng thương mại điện tử đầy đủ chức năng.",
        tags: ["Next.js", "MongoDB", "Stripe"],
        thumbClass: "pt2"
    },
    {
        name: "Real-time Chat App",
        desc: "Ứng dụng chat thời gian thực với WebSocket.",
        tags: ["React", "Node.js", "Socket.io"],
        thumbClass: "pt3"
    },
    {
        name: "Task Management System",
        desc: "Hệ thống quản lý công việc với drag-drop.",
        tags: ["Vue.js", "Firebase", "Tailwind"],
        thumbClass: "pt4"
    }
];

let currentFilter = "all";

// Lấy tất cả unique tags
function getAllTags() {
    const tagsSet = new Set();
    allProjects.forEach(project => {
        project.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
}

// Tạo HTML cho một project card với data-techs
function createProjectCard(project) {
    const techsLower = project.tags.map(tag => {
        // Convert tag name to lowercase and remove spaces
        return tag.toLowerCase().replace(/\s+/g, '');
    }).join(",");
    
    return `
        <div class="pcard" data-techs="${techsLower}">
            <div class="pthumb ${project.thumbClass}"></div>
            <div class="pinfo">
                <div class="pname">${project.name}</div>
                <div class="pdesc">${project.desc}</div>
                <div class="ptags">
                    ${project.tags.map(tag => `<span class="ptag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Hiển thị projects với filter
function displayProjects(projectsToShow) {
    const projGrid = document.querySelector(".proj-grid");
    if (!projGrid) return;
    
    projGrid.innerHTML = projectsToShow.map(project => createProjectCard(project)).join('');
    
    // Reapply current filter after rendering
    if (currentFilter !== "all" && typeof filterProjects === 'function') {
        filterProjects(currentFilter);
    }
}

// Hiển thị tất cả projects
function showAllProjects() {
    displayProjects(allProjects);
    currentFilter = "all";
}

// Tạo dropdown filter
function createFilterDropdown() {
    const allTags = getAllTags();
    const dropdownHTML = `
        <div class="filter-dropdown-menu">
            <div class="filter-option" data-tag="all">
                <span>Tất cả</span>
            </div>
            ${allTags.map(tag => `
                <div class="filter-option" data-tag="${tag}">
                    <span>${tag}</span>
                </div>
            `).join('')}
        </div>
    `;
    return dropdownHTML;
}

// Xử lý nút "Xem thêm"
document.addEventListener("DOMContentLoaded", () => {
    const projectsCard = document.getElementById("projects");
    if (!projectsCard) return;
    
    // Hiển thị 4 project đầu tiên
    displayProjects(allProjects.slice(0, 4));
    
    // Xử lý nút "Xem thêm"
    const watchAllBtn = projectsCard.querySelector(".watch-all");
    let showedAll = false;
    
    if (watchAllBtn) {
        watchAllBtn.addEventListener("click", () => {
            if (!showedAll) {
                displayProjects(currentFilter && currentFilter !== "all" 
                    ? allProjects.filter(p => p.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '') === currentFilter))
                    : allProjects
                );
                watchAllBtn.textContent = "Thu gọn";
                showedAll = true;
            } else {
                displayProjects(currentFilter && currentFilter !== "all"
                    ? allProjects.filter(p => p.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '') === currentFilter)).slice(0, 4)
                    : allProjects.slice(0, 4)
                );
                watchAllBtn.textContent = "Xem thêm";
                showedAll = false;
            }
        });
    }
});

const contactFilter = document.querySelector(".filter");
const dropdownFilter = document.querySelector(".dropdown-filter");

if (contactFilter && dropdownFilter) {
    contactFilter.addEventListener("click", () => {
        dropdownFilter.classList.toggle("appear");
        
        // Initialize filter dropdown when appearing
        if (dropdownFilter.classList.contains("appear")) {
            setTimeout(initFilterDropdown, 100);
        }
    });
}

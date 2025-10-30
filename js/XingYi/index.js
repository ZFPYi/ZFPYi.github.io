// 页面加载完成后执行
window.addEventListener('load', function() {
    // 隐藏加载布局
    setTimeout(function() {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1500);

    // 初始化所有组件
    initTimeDisplay();
    initStars();
    initCareer();
    initApps();
    initProjects();
    initThanks();
    initSponsors();
    initFooterLinks();
    initScrollProgress();
    initHeaderScrollEffect();
    initHamburgerMenu();
});

// 初始化时间显示
function initTimeDisplay() {
    const timeDisplay = document.getElementById('current-time');

    function updateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const tc1 = weekday[now.getDay()] + "/";
        const hour = now.getHours();

        if (hour >= 0 && hour < 5) {
            var tcl = tc1 + "凌晨好";
        } else if (hour >= 5 && hour < 8) {
            var tcl = tc1 + "清晨好";
        } else if (hour >= 8 && hour < 11) {
            var tcl = tc1 + "早上好";
        } else if (hour >= 11 && hour < 13) {
            var tcl = tc1 + "中午好";
        } else if (hour >= 13 && hour < 15) {
            var tcl = tc1 + "午后好";
        } else if (hour >= 15 && hour < 18) {
            var tcl = tc1 + "下午好";
        } else if (hour >= 18 && hour < 21) {
            var tcl = tc1 + "傍晚好";
        } else {
            var tcl = tc1 + "晚上好";
        }


        /*TCi/
        const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const tc1 = weekday[now.getDay()] + "/"
        const time = now.getHours();
        if (time < 12) {
            var tcl = tc1 + "早上好";
        } else if (time >= 12 && time < 18) {
            var tcl = tc1 + "中午好";
        } else {
            var tcl = tc1 + "晚上好";
        }*/

        timeDisplay.textContent = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds} ${tcl}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// 初始化星空背景
function initStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;

        // 随机大小
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // 随机闪烁时间
        const duration = 1 + Math.random() * 2;
        star.style.setProperty('--duration', `${duration}s`);

        starsContainer.appendChild(star);
    }
}

// 初始化职业展示
function initCareer() {
    const careerGrid = document.getElementById('career-grid');
    const showMoreBtn = document.getElementById('show-more-career');
    let showAll = false;

    function renderCareers() {
        careerGrid.innerHTML = '';
        const itemsToShow = showAll ? careers : careers.slice(0, 6);

        itemsToShow.forEach(career => {
            const careerItem = document.createElement('div');
            careerItem.className = 'career-item';

            careerItem.innerHTML = `
                        <div class="career-title">${career.name}</div>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${career.progress}%"></div>
                        </div>
                        <div class="progress-value">${career.progress}%</div>
                    `;

            careerGrid.appendChild(careerItem);
        });

        showMoreBtn.textContent = showAll ? "收起" : "展示更多";
    }

    showMoreBtn.addEventListener('click', function() {
        showAll = !showAll;
        renderCareers();
    });

    renderCareers();
}

// 初始化APP产品轮播 - 堆叠式设计
function initApps() {
    const appSlider = document.getElementById('app-slider');
    const prevBtn = document.getElementById('app-prev');
    const nextBtn = document.getElementById('app-next');

    // 创建APP卡片
    apps.forEach((app, index) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.setAttribute('data-index', index);

        appCard.innerHTML = `
                  <div class="app-image">
                        <img src="./images/Apple/${app.img}" alt="${app.name}">
                    </div>
                    <div class="app-info">
                        <img class="app-icon" src="./images/Apple/${app.icon}" alt="${app.name}">
                        <!-- <div class="app-icon"></div> -->
                        <div class="app-name">${app.name}</div>
                    </div>
                    <div class="app-details">
                        <div class="app-version">版本: ${app.version}</div>
                        <div class="app-memory">内存: ${app.memory}</div>
                    </div>
                    <div class="app-description">${app.description}</div>
                    <div class="app-link">
                        <a href="${app.link}">了解更多</a>
                    </div>
                `;

        appSlider.appendChild(appCard);
    });

    let currentIndex = 0;
    const cards = document.querySelectorAll('.app-card');

    // 初始化卡片位置
    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            } else if (index === (currentIndex - 2 + cards.length) % cards.length) {
                card.classList.add('far-prev');
            } else if (index === (currentIndex + 2) % cards.length) {
                card.classList.add('far-next');
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
    }

    // 按钮事件
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 拖拽功能
    let isDragging = false;
    let startX, currentX;

    appSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        currentX = startX;
    });

    appSlider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.pageX;
    });

    appSlider.addEventListener('mouseup', () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        if (Math.abs(diff) > 50) { // 拖拽阈值
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
    });

    appSlider.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // 触摸事件支持
    appSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        currentX = startX;
    });

    appSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].pageX;
    });

    appSlider.addEventListener('touchend', () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
    });

    // 自动轮播
    let autoSlide = setInterval(nextSlide, 5000);

    // 鼠标悬停暂停自动轮播
    appSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    appSlider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    // 初始化卡片位置
    updateCards();
}

// 初始化开源项目
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const showMoreBtn = document.getElementById('show-more-projects');
    const searchInput = document.getElementById('project-search');
    let showAll = false;

    function renderProjects() {
        projectsGrid.innerHTML = '';
        const searchTerm = searchInput.value.toLowerCase();
        const itemsToShow = showAll ? projects : projects.slice(0, 6);

        itemsToShow.filter(project => {
            if (!searchTerm) return true;

            return project.name.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                project.description.toLowerCase().includes(searchTerm);
        }).forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            projectCard.innerHTML = `
                        <div class="project-header">
                            <div class="project-name">${project.name}</div>
                            <div class="project-memory">${project.memory}</div>
                        </div>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-description">${project.description}</div>
                        <div class="project-download">
                            <a href="${project.link}">下载源码</a>
                        </div>
                    `;

            projectsGrid.appendChild(projectCard);
        });

        showMoreBtn.textContent = showAll ? "收起" : "加载更多";
    }

    showMoreBtn.addEventListener('click', function() {
        showAll = !showAll;
        renderProjects();
    });

    searchInput.addEventListener('input', renderProjects);

    renderProjects();
}

// 初始化感谢区 - 堆叠式轮播，高度自适应
function initThanks() {
    const thanksSlider = document.getElementById('thanks-slider');
    const prevBtn = document.getElementById('thanks-prev');
    const nextBtn = document.getElementById('thanks-next');

    // 创建感谢卡片
    thanks.forEach((person, index) => {
        const thanksCard = document.createElement('div');
        thanksCard.className = 'thanks-card';
        thanksCard.setAttribute('data-index', index);

        const avatarSrc = person.useQQAvatar ?
            `http://q.qlogo.cn/g?b=qq&nk=${person.qq}&s=0` :
            person.avatar;

        thanksCard.innerHTML = `
                    <div class="thanks-header">
                        <div class="thanks-avatar">
                            <img src="${avatarSrc}" alt="${person.name}">
                        </div>
                        <div>
                            <div class="thanks-name">${person.name}</div>
                            <div class="thanks-qq">${person.qq ? 'QQ: ' + person.qq : ''}</div>
                        </div>
                    </div>
                    <div class="thanks-description">${person.description}</div>
                `;

        thanksSlider.appendChild(thanksCard);
    });

    let currentIndex = 0;
    const cards = document.querySelectorAll('.thanks-card');

    // 初始化卡片位置
    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            card.style.display = 'block'; // 确保所有卡片可见

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            } else if (index === (currentIndex - 2 + cards.length) % cards.length) {
                card.classList.add('far-prev');
            } else if (index === (currentIndex + 2) % cards.length) {
                card.classList.add('far-next');
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
    }

    // 按钮事件
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 拖拽功能
    let isDragging = false;
    let startX, currentX;

    thanksSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        currentX = startX;
    });

    thanksSlider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.pageX;
    });

    thanksSlider.addEventListener('mouseup', () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        if (Math.abs(diff) > 50) { // 拖拽阈值
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
    });

    thanksSlider.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // 触摸事件支持
    thanksSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        currentX = startX;
    });

    thanksSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].pageX;
    });

    thanksSlider.addEventListener('touchend', () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
    });

    // 自动轮播 - 修复循环问题
    let autoSlide = setInterval(nextSlide, 4000);

    // 鼠标悬停暂停自动轮播
    thanksSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    thanksSlider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 4000);
    });

    // 初始化卡片位置
    updateCards();
}

// 初始化赞助区 - 堆叠式轮播
function initSponsors() {
    const sponsorsSlider = document.getElementById('sponsors-slider');
    const prevBtn = document.getElementById('sponsor-prev');
    const nextBtn = document.getElementById('sponsor-next');

    // 创建赞助卡片
    sponsors.forEach((sponsor, index) => {
        const sponsorCard = document.createElement('div');
        sponsorCard.className = 'sponsor-card';
        sponsorCard.setAttribute('data-index', index);

        // 生成福利列表
        const benefitsHtml = sponsor.benefits.map(benefit => `
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="benefit-text">${benefit}</div>
                    </div>
                `).join('');

        sponsorCard.innerHTML = `
                    <h3 class="sponsor-title">${sponsor.title}</h3>
                    <p class="sponsor-description">${sponsor.description}</p>
                    <div class="sponsor-benefits">
                        ${benefitsHtml}
                    </div>
                `;

        sponsorsSlider.appendChild(sponsorCard);
    });

    let currentIndex = 0;
    const cards = document.querySelectorAll('.sponsor-card');

    // 初始化卡片位置
    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            } else if (index === (currentIndex - 2 + cards.length) % cards.length) {
                card.classList.add('far-prev');
            } else if (index === (currentIndex + 2) % cards.length) {
                card.classList.add('far-next');
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
    }

    // 按钮事件
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 拖拽功能
    let isDragging = false;
    let startX, currentX;

    sponsorsSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        currentX = startX;
    });

    sponsorsSlider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.pageX;
    });

    sponsorsSlider.addEventListener('mouseup', () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        if (Math.abs(diff) > 50) { // 拖拽阈值
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
    });

    sponsorsSlider.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // 触摸事件支持
    sponsorsSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        currentX = startX;
    });

    sponsorsSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].pageX;
    });

    sponsorsSlider.addEventListener('touchend', () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
    });

    // 自动轮播
    let autoSlide = setInterval(nextSlide, 5000);

    // 鼠标悬停暂停自动轮播
    sponsorsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    sponsorsSlider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    // 初始化卡片位置
    updateCards();
}

// 图片切换控制代码
const jzzc = document.querySelector('.jzzc');
const weixin = document.querySelector('.fa-weixin');
const alipay = document.querySelector('.fa-alipay');

// 切换微信二维码点击事件
weixin.addEventListener('click', () => {
    jzzc.src = "./images/XingYi/jz/weixin.png";
});

// 切换支付宝二维码点击事件
alipay.addEventListener('click', () => {
    jzzc.src = "./images/XingYi/jz/alipay.png";
});

//跳转赞助列表.
const jzlb = document.querySelector('.fa-jzlb');

// 跳转jzlb点击事件
jzlb.addEventListener('click', () => {
    window.location.href = "./赞助列表.html";
});

// 初始化页脚快速链接 - 通过JS内部存储数据动态加载
function initFooterLinks() {
    const footerLinksContainer = document.getElementById('footer-links');

    // 清空容器
    footerLinksContainer.innerHTML = '';

    // 动态添加链接
    footerLinksData.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.name;

        // 如果是外部链接，添加target="_blank"
        if (link.url.startsWith('http')) {
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
        }

        footerLinksContainer.appendChild(linkElement);
    });
}

//底部文本
document.getElementById("but").innerText = "@2016-" + new Date().getFullYear() + " XingYi博客.";

// 初始化滚动进度条
function initScrollProgress() {
    const progressBar = document.getElementById('progress-bar');

    window.addEventListener('scroll', function() {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / scrollTotal) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// 初始化顶部导航栏滚动效果
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            logo.style.color = '#000000';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0)';
            logo.style.color = '#FFFFFF';
        }
    });
}

// 初始化汉堡菜单
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
}
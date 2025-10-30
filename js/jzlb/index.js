// 按金额从高到低排序
sponsors.sort((a, b) => b.amount - a.amount);

// 计算统计数据
function calculateStats() {
    const totalPeople = sponsors.length;
    const totalAmount = sponsors.reduce((sum, sponsor) => sum + sponsor.amount, 0);
    const averageAmount = totalPeople > 0 ? (totalAmount / totalPeople).toFixed(2) : 0;

    return {
        totalPeople,
        totalAmount,
        averageAmount
    };
}

// 更新统计信息显示
function updateStatsDisplay() {
    const stats = calculateStats();
    document.getElementById('totalPeople').textContent = stats.totalPeople;
    document.getElementById('totalAmount').textContent = `¥${stats.totalAmount}`;
    document.getElementById('averageAmount').textContent = `¥${stats.averageAmount}`;
}

// 生成赞助卡片
function generateSponsorCards() {
    const sponsorsGrid = document.getElementById('sponsorsGrid');
    sponsorsGrid.innerHTML = ''; // 清空容器

    sponsors.forEach(sponsor => {
        const card = document.createElement('div');
        card.className = 'sponsor-card';

        // 处理头像URL
        let avatarUrl;
        if (sponsor.avatar) {
            avatarUrl = `http://q.qlogo.cn/g?b=qq&nk=${sponsor.qq}&s=0`;
        } else {
            avatarUrl = sponsor.avatarUrl || 'http://q.qlogo.cn/g?b=qq&nk=123456789&s=0';
        }

        // 构建卡片内容
        card.innerHTML = `
                    <div class="card-header">
                        <img src="${avatarUrl}" alt="${sponsor.name}" class="avatar" onerror="this.src='https://via.placeholder.com/100'">
                        <div class="sponsor-info">
                            <div class="sponsor-name">${sponsor.name}</div>
                            <div class="sponsor-amount">¥${sponsor.amount}</div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="contact-info">
                            ${sponsor.qq ? `
                            <div class="contact-item">
                                <div class="contact-icon">
                                    <i class="fab fa-qq"></i>
                                </div>
                                <div class="contact-value">${sponsor.qq}</div>
                            </div>` : ''}
                            
                            ${sponsor.wechat ? `
                            <div class="contact-item">
                                <div class="contact-icon">
                                    <i class="fab fa-weixin"></i>
                                </div>
                                <div class="contact-value">${sponsor.wechat}</div>
                            </div>` : ''}
                        </div>
                    </div>
                `;

        sponsorsGrid.appendChild(card);
    });

    // 如果没有赞助者数据
    if (sponsors.length === 0) {
        sponsorsGrid.innerHTML = `
                    <div class="no-sponsors">
                        <i class="fas fa-gift" style="font-size: 48px; margin-bottom: 20px;"></i>
                        <p>暂无赞助记录</p>
                        <p style="margin-top: 10px; font-size: 14px;">成为第一个赞助者吧！</p>
                    </div>
                `;
    }
}

// 初始化页面
function initPage() {
    updateStatsDisplay();
    generateSponsorCards();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);
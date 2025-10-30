window.onload = function iyu404() {
    document.getElementById("pii").innerText = "QQ:3529506067 by XingYi";
    //
    //________________________________________________________________________________
    document.getElementById("pli").innerText = "2016. - " + new Date().getFullYear() + ".";
    //
    //_________________________________________________________________________________
    var timeY = new Date();
    //
    if (mzj) {
        window.location.href = "./XingYi.html";
        //
        document.getElementById("rei").style.display = 'none'
        //
    } else {

        // 简洁倒计时控制器
        class SimpleCountdown {
            constructor(containerId, startTime, endTime) {
                this.container = document.getElementById(containerId);
                this.startTime = new Date(startTime);
                this.endTime = new Date(endTime);
                this.timer = null;

                // 创建倒计时UI
                this.createUI();

                // 立即开始倒计时
                this.start();
            }

            createUI() {
                // 创建容器
                const container = document.createElement('div');
                container.className = 'countdown-container';

                // 创建时间单位
                const units = [{
                        id: 'days',
                        label: '天'
                    },
                    {
                        id: 'hours',
                        label: '时'
                    },
                    {
                        id: 'minutes',
                        label: '分'
                    },
                    {
                        id: 'seconds',
                        label: '秒'
                    }
                ];

                // 为每个单位创建DOM元素
                units.forEach(unit => {
                    const unitDiv = document.createElement('div');
                    unitDiv.className = 'countdown-unit';

                    const valueDiv = document.createElement('div');
                    valueDiv.className = 'unit-value';
                    valueDiv.id = unit.id;
                    valueDiv.textContent = '00';

                    const labelDiv = document.createElement('div');
                    labelDiv.className = 'unit-label';
                    labelDiv.textContent = unit.label;

                    unitDiv.appendChild(valueDiv);
                    unitDiv.appendChild(labelDiv);
                    container.appendChild(unitDiv);
                });

                // 清空容器并添加新元素
                this.container.innerHTML = '';
                this.container.appendChild(container);
            }

            start() {
                this.update();
                this.timer = setInterval(() => this.update(), 1000);
            }

            update() {
                const now = new Date();

                // 检查是否已经开始
                if (now < this.startTime) {
                    const diff = this.startTime - now;
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    document.getElementById('days').textContent = days.toString().padStart(2, '0');
                    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
                    return
                }

                let diff = this.endTime - now;

                if (diff >= 0) {
                    clearInterval(this.timer);
                    this.container.innerText = "正常运营";
                    window.location.href = "./XingYi.html";
                    document.getElementById("rei").style.display = 'none'
                    document.getElementById("reil").style.display = 'none'
                    return;
                } else {
                    document.getElementById("reil").innerText = srpl;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            }
        }


        if (mos == 0) {
            alert("Hello World!");
        } else if (mos == 1) {
            var srpl = "喵~? 抱歉.本站点维修中..."
            // 创建并启动倒计时
            new SimpleCountdown('rei', startTime, endTime);
            //

        } else if (mos == 2) {
            var srpl = "喵~! 正在被DDOS中...";
            // 创建并启动倒计时
            new SimpleCountdown('rei', startTime, endTime);
            //
        } else if (mos == -1) {
            alert("再见这个世界!")
        }
        //

    }
    //
    //_________________________________________________________________________________
}
// 🦅 1004MAS | Tactical Intelligence Engine v5.3

document.addEventListener('DOMContentLoaded', () => {
    const legion = new AI300Legion();
    legion.init();
});

class AI300Legion {
    constructor() {
        this.assets = 10000000;
        this.logs = document.getElementById('log-body');
        this.gaugeNeedle = document.getElementById('gauge-needle');
        this.gaugeValue = document.getElementById('gauge-value');
        
        this.stocks = {
            tier1: [
                { name: '삼성전자', code: '005930', price: 80300, pnl: '+2.12%', trust: 99 },
                { name: 'SK하이닉스', code: '000660', price: 182000, pnl: '+3.10%', trust: 99 },
                { name: 'LG에너지솔루션', code: '373220', price: 388000, pnl: '+1.45%', trust: 99 },
                { name: 'NAVER', code: '035420', price: 210000, pnl: '-1.20%', trust: 99 },
                { name: 'FSN', code: '214370', price: 4220, pnl: '+12.4%', trust: 99 },
                { name: 'HLB', code: '028300', price: 102000, pnl: '+5.6%', trust: 99 },
                { name: '엔젠바이오', code: '354200', price: 3640, pnl: '+3.64%', trust: 98 },
                { name: '메리츠금융지주', code: '138040', price: 84000, pnl: '+1.2%', trust: 97 },
                { name: '한국금융지주', code: '071050', price: 68000, pnl: '+2.5%', trust: 96 },
                { name: 'LS ELECTRIC', code: '010120', price: 125000, pnl: '+4.8%', trust: 95 }
            ],
            tier2: [
                { name: '현대차', code: '005380', price: 245000, pnl: '+0.8%', trust: 85 },
                { name: '기아', code: '000270', price: 112000, pnl: '+1.1%', trust: 84 },
                { name: '셀트리온', code: '068270', price: 185000, pnl: '-0.5%', trust: 82 },
                { name: 'POSCO홀딩스', code: '005490', price: 412000, pnl: '+0.2%', trust: 81 },
                { name: '삼성SDI', code: '006400', price: 455000, pnl: '+1.7%', trust: 80 },
                { name: 'LG화학', code: '051910', price: 420000, pnl: '+0.9%', trust: 79 },
                { name: 'KB금융', code: '105560', price: 72000, pnl: '+2.2%', trust: 78 },
                { name: '신한지주', code: '055550', price: 48000, pnl: '+1.5%', trust: 77 },
                { name: '카카오', code: '035720', price: 52000, pnl: '-2.1%', trust: 75 },
                { name: '에코프로', code: '086520', price: 580000, pnl: '+4.2%', trust: 74 }
            ],
            tier3: [
                { name: '엔젠바이오', code: '354200', pnl: '+15.4%' },
                { name: '제주반도체', code: '080220', pnl: '+12.8%' },
                { name: '한화시스템', code: '272210', pnl: '+10.5%' },
                { name: '현대로템', code: '064350', pnl: '+9.2%' },
                { name: '신풍제약', code: '019170', pnl: '+8.7%' },
                { name: '박셀바이오', code: '323990', pnl: '+7.5%' },
                { name: '미래나노텍', code: '095500', pnl: '+6.9%' },
                { name: '금양', code: '001570', pnl: '+6.2%' },
                { name: '두산로보틱스', code: '454910', pnl: '+5.8%' },
                { name: '에이비엘바이오', code: '298380', pnl: '+5.5%' }
            ],
            legend: [
                { name: '에코프로비엠', rank: 1, short: 2589 },
                { name: '한화시스템', rank: 2, short: 1900 },
                { name: 'HYBE', rank: 3, short: 2777 },
                { name: '대주전자재료', rank: 4, short: 1540 },
                { name: '솔브레인', rank: 5, short: 1200 },
                { name: 'HPSP', rank: 6, short: 980 },
                { name: '리노공업', rank: 7, short: 850 },
                { name: '이오테크닉스', rank: 8, short: 720 },
                { name: '주성엔지니어링', rank: 9, short: 650 },
                { name: '피에스케이', rank: 10, short: 540 }
            ],
            value: [
                { name: '한화시스템', goal: '10%' },
                { name: '삼성전기', goal: '8%' },
                { name: '고려아연', goal: '10%' },
                { name: 'KT&G', goal: '7%' },
                { name: 'SK텔레콤', goal: '6%' },
                { name: '한국전력', goal: '12%' },
                { name: '우리금융지주', goal: '9%' },
                { name: '기업은행', goal: '8%' },
                { name: 'S-Oil', goal: '11%' },
                { name: '삼성생명', goal: '7%' }
            ]
        };

        this.ledgerData = [
            { date: '2026-03-23', stock: '삼성전자', qty: 120, price: 80300, principal: 9636000, return: '+2.1%', capital: 10245000 },
            { date: '2026-03-22', stock: 'FSN', qty: 2300, price: 4200, principal: 9660000, return: '+12.4%', capital: 10860000 },
        ];
    }

    init() {
        this.renderLists();
        this.renderLedger();
        this.updateGauge(65);
        this.startSimulation();
        this.addLog("전군 기동 대기 중... KIS API 동기화 완료.", "SYS");
        this.addLog("1000명의 병사 에이전트가 지정된 초소에 배치를 완료했습니다.", "INTEL");
    }

    renderLists() {
        const drawSparkline = (color) => {
            const points = Array.from({length: 10}, () => Math.floor(Math.random() * 20));
            const path = points.map((p, i) => `${i * 6},${20 - p}`).join(' ');
            return `<svg class="sparkline" viewBox="0 0 60 24">
                <polyline fill="none" stroke="${color}" stroke-width="2" points="${path}" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`;
        };

        // Tier 1 (with Sparklines)
        const t1List = document.getElementById('tier1-list');
        if (t1List) {
            t1List.innerHTML = this.stocks.tier1.map(s => `
                <div class="stock-item">
                    <div class="stock-info">
                        <div class="stock-name">${s.name} <span class="trust-pct">${s.trust}%</span></div>
                        <div class="stock-details" style="font-size: 11px; opacity: 0.6;">${s.price.toLocaleString()} KRW</div>
                    </div>
                    <div style="display: flex; align-items: center;">
                        ${drawSparkline(s.pnl.startsWith('+') ? '#10b981' : '#f43f5e')}
                        <div class="stock-pnl ${s.pnl.startsWith('+') ? 'plus' : 'minus'}" style="font-weight: 700;">${s.pnl}</div>
                    </div>
                </div>
            `).join('');
        }

        // Tier 2 & 3
        const t2List = document.getElementById('tier2-list');
        if (t2List) {
            t2List.innerHTML = this.stocks.tier2.map(s => `
                <div class="stock-item">
                    <div class="stock-name" style="font-size: 13px;">${s.name}</div>
                    <div class="stock-pnl ${s.pnl.startsWith('+') ? 'plus' : 'minus'}">${s.pnl}</div>
                </div>
            `).join('');
        }

        const t3List = document.getElementById('tier3-list');
        if (t3List) {
            t3List.innerHTML = this.stocks.tier3.map(s => `
                <div class="stock-item">
                    <div class="stock-name" style="font-size: 13px;">${s.name}</div>
                    <div class="stock-pnl plus" style="background: rgba(16, 185, 129, 0.1); padding: 2px 6px; border-radius: 4px;">${s.pnl}</div>
                </div>
            `).join('');
        }
    }

    renderLedger() {
        const tbody = document.querySelector('.legion-table tbody');
        if (tbody) {
            tbody.innerHTML = this.ledgerData.map(d => `
                <tr>
                    <td>${d.date}</td>
                    <td><strong>${d.stock}</strong></td>
                    <td>${d.qty.toLocaleString()}</td>
                    <td>${d.price.toLocaleString()}</td>
                    <td>${d.principal.toLocaleString()}</td>
                    <td class="plus">${d.return}</td>
                    <td>${d.capital.toLocaleString()}</td>
                    <td><button class="btn-action red">청산</button></td>
                </tr>
            `).join('');
        }
    }

    addLog(msg, tag = "SYSTEM") {
        if (!this.logs) return;
        const time = new Date().toLocaleTimeString('ko-KR', { hour12: false });
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.style.marginBottom = '4px';
        entry.innerHTML = `<span class="sys-tag" style="color: #00f2ff;">[${tag} ${time}]</span> ${msg}`;
        this.logs.prepend(entry);
        
        if (this.logs.children.length > 50) this.logs.lastChild.remove();
    }

    updateGauge(val) {
        if (!this.gaugeNeedle) return;
        // Map 0-100 to -90 to 90 degrees
        const rotation = (val * 1.8) - 90;
        this.gaugeNeedle.style.transform = `rotate(${rotation}deg)`;
        if (this.gaugeValue) this.gaugeValue.innerText = val;
    }

    startSimulation() {
        // 5초마다 로그 발생
        const eventMsgs = [
            "관우 장군이 삼성전자의 매수 급소를 포착했습니다.",
            "장비 장군이 수급 과열 감지로 2차 포진을 지시했습니다.",
            "제갈공명 사단장: '현재 국면은 사각 매복 작전이 유효합니다.'",
            "1000개 마이크로 에이전트가 전체 종목 스캔을 완료했습니다.",
            "공매도 상위 종목의 숏 스퀴즈 징후가 감지되었습니다.",
            "신규 상장 테마 섹터에 세력 수급이 유입되고 있습니다.",
            "조조 참모: '단기 과열을 이용한 차익 실현을 준비하시오.'",
            "전군 3단 토론 결과: 현재 비중 유지 (Consensus 92%)"
        ];

        setInterval(() => {
            const randomMsg = eventMsgs[Math.floor(Math.random() * eventMsgs.length)];
            this.addLog(randomMsg, "COMMAND");
            
            // 게이지 미세 변동
            const newVal = 60 + Math.floor(Math.random() * 20);
            this.updateGauge(newVal);
        }, 5000);
    }
              }

// Generate OKR Health Cards
function generateOKRCards(division) {
    const container = document.getElementById('healthCards' + (division === 'rnd' ? 'Rnd' : 'Pabrikasi'));
    
    // Check if okrData exists for this division and month
    if (!okrData[division] || !okrData[division][currentMonth]) {
        container.innerHTML = `
            <div class="no-okr-message">
                <div class="icon">📭</div>
                <div>Belum ada OKR untuk bulan ini</div>
                <div style="margin-top: 10px; font-size: 14px;">Klik "Add OKR" untuk menambahkan</div>
            </div>
        `;
        return;
    }
    
    const okrs = okrData[division][currentMonth] || [];
    
    if (okrs.length === 0) {
        container.innerHTML = `
            <div class="no-okr-message">
                <div class="icon">📭</div>
                <div>Belum ada OKR untuk bulan ini</div>
                <div style="margin-top: 10px; font-size: 14px;">Klik "Add OKR" untuk menambahkan</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = okrs.map(okr => {
        const completionRate = Math.round((okr.doneTasks / okr.totalTasks) * 100);
        const badgeClass = completionRate >= 70 ? 'badge-healthy' : completionRate >= 40 ? 'badge-warning' : 'badge-critical';
        const badgeText = completionRate >= 70 ? '🟢 Sehat' : completionRate >= 40 ? '🟡 Perlu Perhatian' : '🔴 Kritis';
        
        // WBS breakdown
        const wbsBreakdown = okr.wbs.map(wbs => {
            const wbsDone = wbs.tasks.filter(t => t.status.includes('done')).length;
            const wbsTotal = wbs.tasks.length;
            const wbsPercent = Math.round((wbsDone / wbsTotal) * 100);
            
            return `
                <div style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 5px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span style="background: #667eea; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; margin-right: 5px;">${wbs.code}</span>
                            <span style="font-size: 12px; font-weight: 600;">${wbs.name}</span>
                        </div>
                        <span style="font-size: 11px; color: #667eea; font-weight: 600;">${wbsPercent}%</span>
                    </div>
                    <div style="margin-top: 5px;">
                        <div style="height: 4px; background: #e0e6ed; border-radius: 2px; overflow: hidden;">
                            <div style="height: 100%; width: ${wbsPercent}%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
                        </div>
                        <div style="font-size: 10px; color: #6c757d; margin-top: 2px;">${wbsDone}/${wbsTotal} tasks done</div>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="health-card">
                <div class="health-card-header">
                    <div class="health-card-title">${okr.name}</div>
                    <span class="health-card-badge ${badgeClass}">${badgeText}</span>
                </div>
                
                <div class="task-summary">
                    <div>
                        <span class="task-count">${okr.doneTasks}</span>
                        <span class="task-total">/ ${okr.totalTasks}</span>
                        <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">Tasks Completed</div>
                    </div>
                </div>

                <div style="margin: 15px 0;">
                    <strong style="font-size: 13px; color: #2c3e50;">WBS Breakdown:</strong>
                    ${wbsBreakdown}
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${completionRate}%"></div>
                </div>
                <div style="text-align: center; margin-top: 8px; font-size: 13px; font-weight: 600; color: #667eea;">
                    ${completionRate}% Complete
                </div>
            </div>
        `;
    }).join('');
}

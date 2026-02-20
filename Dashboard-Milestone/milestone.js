// Generate Milestone Timeline - Multi-row structure
function generateTimeline(division) {
    const container = document.getElementById(division + 'Timeline');
    container.innerHTML = '';

    const rows = milestoneData[division];

    rows.forEach(row => {
        let rowHTML = `
            <div class="timeline-row">
                <div class="timeline-label">
                    <strong>${row.category}</strong><br>
                    <span style="font-size: 10px; color: #6c757d;">${row.label}</span>
                </div>
        `;

        for (let month = 1; month <= 12; month++) {
            const content = row.months[month] || '';
            const hasContent = content !== '';
            const isSelected = month === currentMonth;
            
            rowHTML += `
                <div class="timeline-cell ${hasContent ? 'has-content' : ''} ${isSelected ? 'selected' : ''}" 
                     data-month="${month}"
                     data-division="${division}"
                     onclick="selectMonth(${month}, '${division}')">
                    ${hasContent ? `<div style="font-size: 10px; line-height: 1.2; color: #2c3e50; font-weight: 500;">${content}</div>` : ''}
                </div>
            `;
        }

        rowHTML += `</div>`;
        container.innerHTML += rowHTML;
    });
}

function selectMonth(month, division) {
    currentMonth = month;
    document.getElementById('monthSelect').value = month;
    
    // Update month label
    const monthNames = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    document.getElementById(division + 'MonthLabel').textContent = monthNames[month] + ' 2025';
    
    // Update selected month highlight for both divisions
    updateSelectedMonth();
    
    // Regenerate OKR cards and WBS for selected month
    generateOKRCards('rnd');
    generateOKRCards('pabrikasi');
    generateWBSTracking('rnd');
    generateWBSTracking('pabrikasi');
}

function updateSelectedMonth() {
    // Remove all selected classes
    document.querySelectorAll('.timeline-cell').forEach(cell => {
        cell.classList.remove('selected');
    });
    
    // Add selected class to current month
    document.querySelectorAll(`.timeline-cell[data-month="${currentMonth}"]`).forEach(cell => {
        cell.classList.add('selected');
    });
}

function switchMonth() {
    currentMonth = parseInt(document.getElementById('monthSelect').value);
    const monthNames = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    document.getElementById('rndMonthLabel').textContent = monthNames[currentMonth] + ' 2025';
    document.getElementById('pabrikasiMonthLabel').textContent = monthNames[currentMonth] + ' 2025';
    
    updateSelectedMonth();
    generateOKRCards('rnd');
    generateOKRCards('pabrikasi');
    generateWBSTracking('rnd');
    generateWBSTracking('pabrikasi');
}

function switchTab(tab) {
    currentTab = tab;
    
    // Update buttons
    document.querySelectorAll('.division-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update content
    document.querySelectorAll('.main-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('tab-' + tab).classList.add('active');
}

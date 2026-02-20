// Generate WBS Tracking with expandable task details
function generateWBSTracking(division) {
    const container = document.getElementById('okrGroups' + (division === 'rnd' ? 'Rnd' : 'Pabrikasi'));
    
    // Check if okrData exists
    if (!okrData[division] || !okrData[division][currentMonth]) {
        container.innerHTML = '';
        return;
    }
    
    const okrs = okrData[division][currentMonth] || [];
    
    if (okrs.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = okrs.map(okr => {
        const wbsRows = okr.wbs.map((wbs, wbsIndex) => {
            const wbsId = `${okr.id}-wbs-${wbsIndex}`;
            
            const taskRows = wbs.tasks.map((task, taskIndex) => {
                const taskId = `task-${wbsId}-${taskIndex}`;
                const detailId = `detail-${wbsId}-${taskIndex}`;
                
                const statusClass = 'status-' + task.status;
                const statusText = {
                    'done-ontime': 'Done - On Time',
                    'done-late': 'Done - Late',
                    'on-track': 'On Track',
                    'potential-late': 'Potential Late',
                    'late': 'Late',
                    'not-yet': 'Not Yet'
                }[task.status];
                
                // Determine button class based on status
                let btnClass = 'btn-update';
                if (task.status === 'late') btnClass += ' danger';
                if (task.status === 'potential-late') btnClass += ' warning';
                
                // Check if task has details to show
                const hasDetails = task.status === 'late' || task.status === 'potential-late' || task.issue || task.actionDone || task.actionPlan;
                
                // Task detail row HTML
                let detailHTML = '';
                if (hasDetails) {
                    detailHTML = `
                        <tr class="task-detail-row" id="${detailId}">
                            <td colspan="5" class="task-detail-cell">
                                <div class="detail-grid">
                                    ${task.issue ? `
                                        <div class="detail-box issue">
                                            <div class="detail-label">🚨 Issue / Kendala</div>
                                            <div class="detail-content">${task.issue}</div>
                                        </div>
                                    ` : ''}
                                    
                                    ${task.actionDone ? `
                                        <div class="detail-box action-done">
                                            <div class="detail-label">✅ Yang Sudah Dilakukan PIC</div>
                                            <div class="detail-content">${task.actionDone}</div>
                                        </div>
                                    ` : ''}
                                    
                                    ${task.actionPlan ? `
                                        <div class="detail-box action-plan">
                                            <div class="detail-label">📋 Yang Akan Dilakukan</div>
                                            <div class="detail-content">${task.actionPlan}</div>
                                        </div>
                                    ` : ''}
                                    
                                    ${!task.issue && !task.actionDone && !task.actionPlan ? `
                                        <div class="empty-detail">Belum ada issue/action yang dicatat</div>
                                    ` : ''}
                                </div>
                            </td>
                        </tr>
                    `;
                }
                
                return `
                    <tr class="task-row" id="${taskId}" onclick="toggleTaskDetail('${taskId}', '${detailId}')">
                        <td class="task-indent">
                            ${hasDetails ? '<span class="expand-icon-task" id="icon-' + taskId + '">▶</span>' : ''}
                            <span class="task-bullet">•</span>
                            ${task.name}
                        </td>
                        <td>${task.pic}</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>
                            <div class="progress-bar" style="height: 6px;">
                                <div class="progress-fill" style="width: ${task.progress}%"></div>
                            </div>
                            <div style="font-size: 11px; text-align: center; margin-top: 2px;">${task.progress}%</div>
                        </td>
                        <td>
                            <button class="${btnClass}" onclick="openUpdateTaskModal('${okr.id}', ${wbsIndex}, ${taskIndex}, event)">📝 Update</button>
                        </td>
                    </tr>
                    ${detailHTML}
                `;
            }).join('');
            
            return `
                <tr class="wbs-row" onclick="toggleWBS('${wbsId}')">
                    <td colspan="5">
                        <span class="expand-icon-wbs" id="icon-${wbsId}">▶</span>
                        <span style="background: #667eea; color: white; padding: 2px 8px; border-radius: 3px; margin-right: 8px;">${wbs.code}</span>
                        ${wbs.name}
                    </td>
                </tr>
                ${taskRows}
            `;
        }).join('');
        
        return `
            <div class="okr-group">
                <div class="okr-header">
                    <div class="okr-title">${okr.name}</div>
                    <button class="btn-add-task">➕ Add Task</button>
                </div>
                <table class="tasks-table">
                    <thead>
                        <tr>
                            <th width="35%">WBS / Task Name</th>
                            <th width="15%">PIC</th>
                            <th width="15%">Status</th>
                            <th width="15%">Progress</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${wbsRows}
                    </tbody>
                </table>
            </div>
        `;
    }).join('');
}

// Toggle WBS expand/collapse
function toggleWBS(wbsId) {
    const icon = document.getElementById('icon-' + wbsId);
    icon.classList.toggle('expanded');
    
    let nextRow = icon.closest('tr').nextElementSibling;
    while (nextRow && nextRow.classList.contains('task-row')) {
        nextRow.classList.toggle('show');
        
        // Also hide detail rows when collapsing WBS
        const detailRow = nextRow.nextElementSibling;
        if (detailRow && detailRow.classList.contains('task-detail-row')) {
            if (!nextRow.classList.contains('show')) {
                detailRow.classList.remove('show');
                const taskId = nextRow.id;
                const taskIcon = document.getElementById('icon-' + taskId);
                if (taskIcon) taskIcon.classList.remove('expanded');
            }
        }
        
        nextRow = nextRow.nextElementSibling;
        // Skip detail rows
        if (nextRow && nextRow.classList.contains('task-detail-row')) {
            nextRow = nextRow.nextElementSibling;
        }
    }
}

// Toggle task detail expand/collapse
function toggleTaskDetail(taskId, detailId) {
    const detailRow = document.getElementById(detailId);
    if (!detailRow) return; // No details to show
    
    const icon = document.getElementById('icon-' + taskId);
    const taskRow = document.getElementById(taskId);
    
    detailRow.classList.toggle('show');
    taskRow.classList.toggle('expanded');
    if (icon) icon.classList.toggle('expanded');
}

// Open update task modal
function openUpdateTaskModal(okrId, wbsIndex, taskIndex, event) {
    event.stopPropagation(); // Prevent row click
    
    // Find the OKR and task
    const division = currentTab;
    const okr = okrData[division][currentMonth].find(o => o.id === okrId);
    if (!okr) return;
    
    const task = okr.wbs[wbsIndex].tasks[taskIndex];
    
    // Store task reference for update
    window.currentTaskUpdate = {
        division: division,
        month: currentMonth,
        okrId: okrId,
        wbsIndex: wbsIndex,
        taskIndex: taskIndex
    };
    
    // Fill form
    document.getElementById('updateTaskId').value = okrId;
    document.getElementById('updateTaskName').value = task.name;
    document.getElementById('updateTaskPIC').value = task.pic;
    document.getElementById('updateTaskStatus').value = task.status;
    document.getElementById('updateTaskProgress').value = task.progress;
    document.getElementById('updateTaskIssue').value = task.issue || '';
    document.getElementById('updateTaskActionDone').value = task.actionDone || '';
    document.getElementById('updateTaskActionPlan').value = task.actionPlan || '';
    
    // Show modal
    document.getElementById('updateTaskModal').style.display = 'block';
}

function closeUpdateTaskModal() {
    document.getElementById('updateTaskModal').style.display = 'none';
}

function saveTaskUpdate() {
    if (!window.currentTaskUpdate) return;
    
    const { division, month, okrId, wbsIndex, taskIndex } = window.currentTaskUpdate;
    const okr = okrData[division][month].find(o => o.id === okrId);
    if (!okr) return;
    
    const task = okr.wbs[wbsIndex].tasks[taskIndex];
    
    // Get form values
    const newStatus = document.getElementById('updateTaskStatus').value;
    const newProgress = parseInt(document.getElementById('updateTaskProgress').value);
    const newIssue = document.getElementById('updateTaskIssue').value.trim();
    const newActionDone = document.getElementById('updateTaskActionDone').value.trim();
    const newActionPlan = document.getElementById('updateTaskActionPlan').value.trim();
    
    // Validation: Issue required for late/potential-late
    if ((newStatus === 'late' || newStatus === 'potential-late') && !newIssue) {
        alert('❌ Issue/Kendala wajib diisi untuk status Late atau Potential Late!');
        return;
    }
    
    // Update task
    const oldStatus = task.status;
    task.status = newStatus;
    task.progress = newProgress;
    task.issue = newIssue;
    task.actionDone = newActionDone;
    task.actionPlan = newActionPlan;
    
    // Update doneTasks count if status changed
    if (newStatus.includes('done') && !oldStatus.includes('done')) {
        okr.doneTasks++;
    } else if (!newStatus.includes('done') && oldStatus.includes('done')) {
        okr.doneTasks--;
    }
    
    // Close modal and refresh
    closeUpdateTaskModal();
    generateOKRCards(division);
    generateWBSTracking(division);
    
    alert('✅ Task berhasil diupdate!');
}

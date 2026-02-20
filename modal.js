// Add OKR Modal Functions
let wbsCounter = 0;
let taskCounters = {};

function openAddOKRModal() {
    document.getElementById('addOKRModal').style.display = 'block';
    wbsCounter = 0;
    taskCounters = {};
    document.getElementById('wbsContainer').innerHTML = '';
    document.getElementById('addOKRForm').reset();
}

function closeAddOKRModal() {
    document.getElementById('addOKRModal').style.display = 'none';
}

function addWBSItem() {
    wbsCounter++;
    const wbsCode = String.fromCharCode(64 + wbsCounter); // A, B, C, etc.
    
    const html = `
        <div class="wbs-container" id="wbs-${wbsCounter}">
            <div class="wbs-header">
                <strong>${wbsCode}. WBS ${wbsCounter}</strong>
                <button type="button" class="btn-remove" onclick="removeWBS(${wbsCounter})">🗑️ Hapus</button>
            </div>
            <div class="form-group">
                <label>Nama WBS *</label>
                <input type="text" id="wbs-name-${wbsCounter}" required>
            </div>
            <div id="tasks-${wbsCounter}"></div>
            <button type="button" class="btn-add-task" onclick="addTask(${wbsCounter})">➕ Add Task</button>
        </div>
    `;
    document.getElementById('wbsContainer').insertAdjacentHTML('beforeend', html);
}

function removeWBS(id) {
    document.getElementById('wbs-' + id).remove();
    delete taskCounters[id];
}

function addTask(wbsId) {
    if (!taskCounters[wbsId]) taskCounters[wbsId] = 0;
    taskCounters[wbsId]++;
    
    const html = `
        <div class="task-item" id="task-${wbsId}-${taskCounters[wbsId]}">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <strong>• Task ${taskCounters[wbsId]}</strong>
                <button type="button" class="btn-remove" onclick="removeTask(${wbsId}, ${taskCounters[wbsId]})">🗑️</button>
            </div>
            <div class="form-group">
                <label>Nama Task *</label>
                <input type="text" id="task-name-${wbsId}-${taskCounters[wbsId]}" required>
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label>PIC *</label>
                    <input type="text" id="task-pic-${wbsId}-${taskCounters[wbsId]}" required>
                </div>
                <div class="form-group">
                    <label>Progress (%)</label>
                    <input type="number" id="task-progress-${wbsId}-${taskCounters[wbsId]}" min="0" max="100" value="0">
                </div>
            </div>
        </div>
    `;
    document.getElementById('tasks-' + wbsId).insertAdjacentHTML('beforeend', html);
}

function removeTask(wbsId, taskId) {
    document.getElementById('task-' + wbsId + '-' + taskId).remove();
}

function saveNewOKR() {
    const title = document.getElementById('okrTitle').value.trim();
    const division = document.getElementById('okrDivision').value;
    const month = parseInt(document.getElementById('okrMonth').value);
    const category = document.getElementById('okrCategory').value;
    
    if (!title || !division || !month || !category) {
        alert('❌ Mohon lengkapi semua field yang required!');
        return;
    }
    
    // Collect WBS data
    const wbsContainers = document.querySelectorAll('.wbs-container');
    if (wbsContainers.length === 0) {
        alert('❌ Mohon tambahkan minimal 1 WBS!');
        return;
    }
    
    const wbs = [];
    let totalTasks = 0;
    let hasError = false;
    
    wbsContainers.forEach((container, index) => {
        const wbsId = container.id.replace('wbs-', '');
        const wbsName = document.getElementById('wbs-name-' + wbsId).value.trim();
        
        if (!wbsName) {
            alert('❌ Mohon isi nama WBS!');
            hasError = true;
            return;
        }
        
        const taskItems = container.querySelectorAll('.task-item');
        if (taskItems.length === 0) {
            alert('❌ Setiap WBS harus memiliki minimal 1 task!');
            hasError = true;
            return;
        }
        
        const tasks = [];
        taskItems.forEach(taskItem => {
            const taskId = taskItem.id.split('-').slice(-2).join('-');
            const nameInput = document.getElementById('task-name-' + taskId);
            const picInput = document.getElementById('task-pic-' + taskId);
            const progressInput = document.getElementById('task-progress-' + taskId);
            
            if (!nameInput || !picInput) return;
            
            const name = nameInput.value.trim();
            const pic = picInput.value.trim();
            const progress = parseInt(progressInput.value) || 0;
            
            if (name && pic) {
                tasks.push({
                    name: name,
                    pic: pic,
                    status: 'not-yet',
                    progress: progress,
                    issue: '',
                    actionDone: '',
                    actionPlan: ''
                });
                totalTasks++;
            }
        });
        
        if (tasks.length > 0) {
            wbs.push({
                code: String.fromCharCode(65 + index),
                name: wbsName,
                tasks: tasks
            });
        }
    });
    
    if (hasError) return;
    
    if (wbs.length === 0 || totalTasks === 0) {
        alert('❌ Mohon tambahkan minimal 1 WBS dengan 1 task!');
        return;
    }
    
    // Create new OKR
    const newOKR = {
        id: division + '-' + month + '-' + Date.now(),
        name: title,
        month: month,
        division: division,
        category: category,
        totalTasks: totalTasks,
        doneTasks: 0,
        wbs: wbs
    };
    
    // Add to data
    if (!okrData[division]) {
        okrData[division] = {};
    }
    if (!okrData[division][month]) {
        okrData[division][month] = [];
    }
    okrData[division][month].push(newOKR);
    
    // Add to milestone data if not exists
    const milestoneRow = milestoneData[division].find(row => row.category === category);
    if (milestoneRow) {
        if (!milestoneRow.months[month]) {
            milestoneRow.months[month] = title;
        } else {
            // Append if there's already content
            milestoneRow.months[month] += '\n' + title;
        }
    }
    
    alert('✅ OKR berhasil ditambahkan!');
    closeAddOKRModal();
    
    // Refresh display
    generateTimeline(division);
    if (currentMonth === month && currentTab === division) {
        generateOKRCards(division);
        generateWBSTracking(division);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const addModal = document.getElementById('addOKRModal');
    const updateModal = document.getElementById('updateTaskModal');
    
    if (event.target == addModal) {
        closeAddOKRModal();
    }
    if (event.target == updateModal) {
        closeUpdateTaskModal();
    }
}

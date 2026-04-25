// Cursor Glow
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Data 
let departments = [
    { name: "MISD", desc: "Management Information System", status: "Active", operator: "Admin", time: "2026-04-25 08:30" }
];

const deptForm = document.getElementById('deptForm');
const deptTableBody = document.getElementById('deptTableBody');
const submitBtn = document.getElementById('submitBtn');
const editIndexInput = document.getElementById('editIndex');

function getFormattedDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${min}`;
}

function renderTable() {
    deptTableBody.innerHTML = '';
    departments.forEach((dept, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td style="color: white; font-weight: 600;">${dept.name}</td>
                <td>${dept.desc}</td>
                <td><span class="status-pill ${dept.status.toLowerCase()}">${dept.status}</span></td>
                <td>${dept.operator}</td>
                <td style="font-family: monospace;">${dept.time}</td>
                <td>
                    <div class="action-btns">
                        <button onclick="editDept(${index})" class="edit-btn">Edit</button>
                        <button onclick="deleteDept(${index})" class="delete-btn">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        deptTableBody.innerHTML += row;
    });
}

deptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('deptName').value,
        desc: document.getElementById('deptDesc').value,
        operator: document.getElementById('modifiedBy').value,
        status: document.getElementById('activeStatus').value,
        time: getFormattedDate()
    };

    const index = parseInt(editIndexInput.value);
    if (index === -1) {
        departments.push(data);
    } else {
        departments[index] = data;
        resetSubmitButton();
    }
    clearForm();
    renderTable();
});

function editDept(index) {
    const dept = departments[index];
    document.getElementById('deptName').value = dept.name;
    document.getElementById('deptDesc').value = dept.desc;
    document.getElementById('modifiedBy').value = dept.operator;
    document.getElementById('activeStatus').value = dept.status;
    editIndexInput.value = index;
    submitBtn.innerText = "Update Record";
    submitBtn.className = "btn-update";
}

function deleteDept(index) {
    if(confirm("Confirm deletion?")) {
        departments.splice(index, 1);
        renderTable();
    }
}

function resetSubmitButton() {
    submitBtn.innerText = "Add Record";
    submitBtn.className = "btn-primary";
    editIndexInput.value = "-1";
}

function clearForm() {
    deptForm.reset();
    resetSubmitButton();
}

renderTable();

let indexToDelete = -1; // Temporary storage for the index

const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// 1. Trigger Modal instead of native confirm
function deleteDept(index) {
    indexToDelete = index; // Store which one we want to kill
    deleteModal.style.display = 'flex'; // Show modal
}

// 2. The Actual Deletion Logic
confirmDeleteBtn.onclick = function() {
    if (indexToDelete > -1) {
        departments.splice(indexToDelete, 1);
        renderTable();
        closeModal();
    }
};

// 3. Helper to close modal
function closeModal() {
    deleteModal.style.display = 'none';
    indexToDelete = -1;
}

// Close modal if user clicks outside the box
window.onclick = function(event) {
    if (event.target == deleteModal) {
        closeModal();
    }
};
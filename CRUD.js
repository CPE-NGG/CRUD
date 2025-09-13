$(document).ready(function() {
    let departmentId = 2; 
    
    function getTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    $('#addDepartmentForm').on('submit', function(e) {
        e.preventDefault(); 

        const departmentName = $('#add-dept-name').val();
        const shortDescription = $('#add-short-desc').val();
        const activeStatus = $('#add-active-status').val() === 'true' ? 'Active' : 'Inactive';
        const modifiedBy = $('#add-modified-by').val();
        const lastModified = getTimestamp();

        const newDepartmentHtml = `
            <div class="crud-item" data-id="${departmentId}">
                <div class="item-content display-mode">
                    <div class="section">${departmentId}</div>
                    <div class="section department-name">${departmentName}</div>
                    <div class="section short-desc">${shortDescription}</div>
                    <div class="section active-status">${activeStatus}</div>
                    <div class="section modified-by">${modifiedBy}</div>
                    <div class="section last-modified">${lastModified}</div>
                    <div class="action-buttons">
                        <button type="button" class="edit-btn">Edit</button>
                        <button type="button" class="delete-btn red-button">Delete</button>
                    </div>
                </div>
                <div class="edit-mode">
                    <div class="section">${departmentId}</div>
                    <input type="text" class="edit-dept-name" value="${departmentName}" required />
                    <input type="text" class="edit-short-desc" value="${shortDescription}" />
                    <select class="edit-active-status" required>
                        <option value="true" ${activeStatus === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="false" ${activeStatus === 'Inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                    <input type="text" class="edit-modified-by" value="${modifiedBy}" required />
                    <div class="section last-modified-edit">${lastModified}</div>
                    <div class="action-buttons">
                        <button type="button" class="save-btn">Save</button>
                        <button type="button" class="cancel-btn red-button">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        $('.crud-list').append(newDepartmentHtml);
        $('#action-log').text(`Department "${departmentName}" added successfully.`);

        $('#addDepartmentForm')[0].reset();
        $('#add-active-status').val('true');

        departmentId++;
    });

    $('.crud-list').on('click', '.edit-btn', function() {
        const crudItem = $(this).closest('.crud-item');
        crudItem.addClass('edit-mode');
        $('#action-log').text('Editing department...');
    });

    $('.crud-list').on('click', '.save-btn', function() {
        const crudItem = $(this).closest('.crud-item');
        const departmentName = crudItem.find('.edit-dept-name').val();
        const shortDescription = crudItem.find('.edit-short-desc').val();
        const activeStatusValue = crudItem.find('.edit-active-status').val();
        const modifiedBy = crudItem.find('.edit-modified-by').val();
        const lastModified = getTimestamp();

        if (!departmentName || !modifiedBy) {
            $('#action-log').text('Please fill in all required fields.');
            return;
        }

        crudItem.find('.department-name').text(departmentName);
        crudItem.find('.short-desc').text(shortDescription);
        crudItem.find('.active-status').text(activeStatusValue === 'true' ? 'Active' : 'Inactive');
        crudItem.find('.modified-by').text(modifiedBy);
        crudItem.find('.last-modified').text(lastModified);

        crudItem.find('.edit-dept-name').val(departmentName);
        crudItem.find('.edit-short-desc').val(shortDescription);
        crudItem.find('.edit-active-status').val(activeStatusValue);
        crudItem.find('.edit-modified-by').val(modifiedBy);
        crudItem.find('.last-modified-edit').text(lastModified);

        crudItem.removeClass('edit-mode');
        $('#action-log').text(`Department "${departmentName}" updated successfully.`);
    });

    $('.crud-list').on('click', '.cancel-btn', function() {
        const crudItem = $(this).closest('.crud-item');
        const originalName = crudItem.find('.department-name').text();
        const originalShortDesc = crudItem.find('.short-desc').text();
        const originalActiveStatus = crudItem.find('.active-status').text() === 'Active' ? 'true' : 'false';
        const originalModifiedBy = crudItem.find('.modified-by').text();

        crudItem.find('.edit-dept-name').val(originalName);
        crudItem.find('.edit-short-desc').val(originalShortDesc);
        crudItem.find('.edit-active-status').val(originalActiveStatus);
        crudItem.find('.edit-modified-by').val(originalModifiedBy);

        crudItem.removeClass('edit-mode');
        $('#action-log').text('Edit canceled.');
    });

    $('.crud-list').on('click', '.delete-btn', function() {
        if (confirm("Are you sure you want to delete this department?")) {
            const crudItem = $(this).closest('.crud-item');
            const departmentName = crudItem.find('.department-name').text();
            crudItem.remove(); 
            $('#action-log').text(`Department "${departmentName}" deleted successfully.`);
        }
    });

    $('#action-log').text('Ready to add new departments or edit existing ones.');
});
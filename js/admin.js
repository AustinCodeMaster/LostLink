// Simple admin dashboard JS for showing/hiding the add item form
window.onload = function() {
    var addItemBtn = document.getElementById('addItemBtn');
    var addItemForm = document.getElementById('addItemForm');
    var cancelItemBtn = document.getElementById('cancelItemBtn');

    addItemBtn.onclick = function() {
        addItemForm.style.display = 'block';
        addItemBtn.style.display = 'none';
    };
    cancelItemBtn.onclick = function() {
        addItemForm.style.display = 'none';
        addItemBtn.style.display = 'inline-block';
    };

    // Demo stats (replace with real data in future)
    document.getElementById('statTotal').textContent = '9';
    document.getElementById('statVerified').textContent = '5';
    document.getElementById('statClaimed').textContent = '2';
};

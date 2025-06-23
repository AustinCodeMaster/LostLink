// Demo login logic (replace with real backend logic)
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var errorDiv = document.getElementById('loginError');

    // Demo: admin/admin123 for admin, user/user123 for user
    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'admin.html';
    } else if (username === 'user' && password === 'user123') {
        window.location.href = 'home.html';
    } else {
        errorDiv.style.display = 'block';
    }
};

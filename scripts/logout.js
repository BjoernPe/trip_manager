function logoutAndRedirect() {
    try {
        localStorage.setItem('isLoggedIn', false);
        console.log('Logout successful');
    } catch (error) {
        console.error('Error during logout:', error.message);
    } finally {
        window.location.href = 'login.html';
    }
}
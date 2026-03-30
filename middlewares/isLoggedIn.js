
// Authentication middleware
export function isLoggedIn(request, response, next) {
    if (!request.session.username) {
        return response.redirect('/login');
    }
    next();
}
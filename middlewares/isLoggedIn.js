
// Authentication middleware
// NB: Used ChatGPT to figure out how to create this middleware
export function isLoggedIn(request, response, next) {
    if (!request.session.username) {
        return response.redirect('/login');
    }
    next();
}
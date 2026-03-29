
import bcrypt from 'bcrypt';

export default class AuthService {
    static USERS = [];
    static SALT_ROUNDS = 12;

    async login(username, password) {
        const user = AuthService.USERS.find(u => u.username === username);
        if (!user) {
            return undefined;
        }
        const verified = await bcrypt.compare(password, user.password);
        if (!verified) {
            return undefined;
        }
        return user;
    }

    async signup(username, password) {
        if (AuthService.USERS.find(u => u.username === username)) {
            return undefined;
        }
        const salt = await bcrypt.genSalt(AuthService.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {username, password: hashedPassword};
        AuthService.USERS.push(user); // Push to USERS []
        return user;
    } // If user exists, undefined -- if not exist, generate a salt, hash pword using bcrypt
}

// About salting: Pwords need to be stored so even if someone hack, it is difficult to understand them
// so a hash of a password, instead of the full password is stored in the DB
// hash = input passed through a hash function - they cannot be turned back to original form
// salt = unique randomly generated string, added to each password, increase secturity
// + The higher the salt rounds, the more secure the password is
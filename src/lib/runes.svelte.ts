export const subTitle = $state({ text: "" });

// Initialize loggedInUser from localStorage if available
const storedUser = typeof window !== 'undefined' ? localStorage.getItem('loggedInUser') : null;
const initialUser = storedUser ? JSON.parse(storedUser) : { 
    email: "",
    name: "",
    token: "",
    _id: ""
};

export const loggedInUser = $state(initialUser);

// Helper function to save user to localStorage
export function saveUserToStorage() {
    if (typeof window !== 'undefined') {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }
}

// Helper function to clear user from localStorage
export function clearUserFromStorage() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('loggedInUser');
    }
}

// Helper function to check if user is authenticated
export function isAuthenticated(): boolean {
    return !!(loggedInUser.token && loggedInUser.email);
}
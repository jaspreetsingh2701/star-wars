export function getItem(key: string) {
    const item = localStorage.getItem(key) || null;
    if (key && item) {
        return JSON.parse(item);
    }
}

export function setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function authenticateUser() {
    return new Promise((resolve, reject) => {
        if (getItem('user')) {
            resolve(true);
        }
        else reject(false);
    })
}

export function signOut() {
    localStorage.removeItem('user');
}
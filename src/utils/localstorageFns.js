export const setLocalStorage = (key, value) => {
    try {
        if (key != null && value != null) {

            localStorage.setItem(key, JSON.stringify(value))
        } else {
            throw new Error("Error in seting token")

        }

    } catch (error) {
        throw new Error(error.message)
    }
}


export const getLocalStorage = (key) => {
    try {
        if (key != null) {

            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } else {
            return null;

        }

    } catch (error) {
        return null;
    }
}
async function login(username, password) {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        console.log("LOGIN RESPONSE:", data);
        return data;

    } catch (err) {
        console.error("LOGIN ERROR:", err);
        return { error: "network error" };
    }
}


async function register(username, password) {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        console.log("REGISTER RESPONSE:", data);
        return data;

    } catch (err) {
        console.error("REGISTER ERROR:", err);
        return { error: "network error" };
    }
}
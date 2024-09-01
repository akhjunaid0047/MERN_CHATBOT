import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post("/user/login", { email, password });
    if (response.status !== 200)
        throw new Error("Unable to Login");
    const data = await response.data;
    return data;
}

export const checkAuthStatus = async () => {
    const response = await axios.get("/user/authenticate");
    if (response.status !== 200)
        throw new Error("Authentication Failed");
    const data = await response.data;
    return data;
}

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
        throw new Error("Unable to logout");
    }
    const data = await res.data;
    return data;
};
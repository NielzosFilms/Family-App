import Cookies from "js-cookie";

//localStorage.setItem("authUser", 4);
//localStorage.clear();

export const isAuthenticated = () => !!localStorage.getItem("authUser");

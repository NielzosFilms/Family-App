import { isAuthenticated } from "./components/auth/auth.js";

isAuthenticated().then((res) => console.log(res));

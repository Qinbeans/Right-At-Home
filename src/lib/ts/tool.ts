import { nav_state, NavState } from "./store";

export const get_state = () => {
    let suffix = window.location.pathname.split("/").pop();
    switch (suffix) {
        case "":
            nav_state.set(NavState.Home);
            break;
        case "about":
            nav_state.set(NavState.About);
            break;
        case "contact":
            nav_state.set(NavState.Contact);
            break;
        default:
            break;
    }
};


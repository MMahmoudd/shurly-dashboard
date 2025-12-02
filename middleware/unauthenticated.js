export default function({ redirect, app }) {
    if (app.$cookies.get("token") && app.$cookies.get("token") != false) {
        return redirect("/");
    }
}

console.log("hello world"), $(document).ready(() => {
    function a(a, c, d) {
        $.post("/api/signup", {
            name: a,
            email: c,
            password: d
        }).then(() => {
            window.location.replace("/members")
        }).catch(b)
    }

    function b(a) {
        $("#alert .msg").text(a.responseJSON), $("#alert").fadeIn(500)
    }
    const c = $("form.signup"),
        d = $("input#name"),
        e = $("input#email-input"),
        f = $("input#password-input");
    c.on("submit", b => {
        console.log("test"), b.preventDefault();
        const c = {
            name: d.val().trim(),
            email: e.val().trim(),
            password: f.val().trim()
        };
        c.email && c.password && (a(c.name, c.email, c.password), d.val(""), e.val(""), f.val(""))
    })
});
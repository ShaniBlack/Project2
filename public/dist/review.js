$(document).ready(() => {
    function a(a) {
        a = a || "", a && (a = "/?traveler_id=" + a), $.get("/api/posts" + a, function(b) {
            console.log("Posts", b), h = b, h && h.length ? c() : e(a)
        })
    }

    function b(b) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + b
        }).then(function() {
            a(g.val())
        })
    }

    function c() {
        f.empty();
        const a = [];
        for (let b = 0; b < h.length; b++) a.push(d(h[b]));
        f.append(a)
    }

    function d(a) {
        const b = new Date(a.createdAt).toLocaleDateString(),
            c = $("<div>");
        c.css({
            width: "200px",
            height: "100px",
            overflow: "scroll"
        }), c.addClass("card");
        const d = $("<div>");
        d.css({
            fontSize: "x-small"
        }), d.addClass("card-header");
        const e = $("<button>");
        e.addClass("delete btn btn-link").text("delete");
        const f = $("<button>");
        f.addClass("edit btn btn-link");
        const g = $("<h5>"),
            h = $("<small>"),
            i = $("<h6>"),
            j = $("<div>");
        j.addClass("card-Footer"), i.text(`Acom:  ${a.lodging}`), j.css({
            float: "right",
            color: "blue",
            "margin-top": "-10px",
            fontSize: "x-small"
        });
        const k = $("<div>");
        k.addClass("card-body");
        const l = $("<h6>");
        return g.text(a.title + " "), l.text(a.body), h.text(b), g.append(h), j.append(e), d.append(f), d.append(g), d.append(i), k.append(l), j.append(`${a.city}`), c.append(d), c.append(k), c.append(j), c.data("post", a), c
    }

    function e(a) {
        const b = window.location.search;
        a, f.empty();
        const c = $("<h2>");
        c.css({
            "text-align": "center",
            "margin-top": "50px"
        }), c.html("What are you waiting for, start telling everyone about your travels in  <a href='/review" + b + "'>your littleTravelBook</a>."), f.append(c)
    }
    $.get("/api/user_data").then(a => {
        console.log("user data", a.name), $("#member-name").text(a.name)
    });
    const f = $(".blog-container"),
        g = $("#category");
    $(document).on("click", "button.delete", function() {
        const a = $(this).parent().parent().data("post");
        b(a.id)
    }), $(document).on("click", "button.edit", function() {
        const a = $(this).parent().parent().data("post");
        window.location.href = "/review?post_id=" + a.id
    });
    let h;
    const i = window.location.search;
    let j; - 1 === i.indexOf("?traveler_id=") ? (console.log(), a()) : (j = i.split("=")[1], a(j))
});
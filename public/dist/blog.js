$(document).ready(function() {
    function a(a) {
        g = a || "", g && (g = "/?traveler_id=" + g), $.get("/api/posts" + g, function(a) {
            console.log("Posts", a), e = a, e && e.length && b()
        })
    }

    function b() {
        d.empty();
        const a = [];
        for (let b = 0; b < e.length; b++) a.push(c(e[b]));
        d.append(a)
    }

    function c(a) {
        const b = new Date(a.createdAt).toLocaleDateString(),
            c = $("<div>");
        c.addClass("card"), c.css({
            margin: "10px"
        });
        const d = $("<h4 class=\"post-title has-text-weight-bold is-size-5 is-centered\">"),
            e = $("<div>");
        e.addClass("blog-header has-text-black");
        const f = $("<h6 class=\"has-text-weight-semibold is-size-6\">"),
            g = $("<div>"),
            h = $("<button>");
        h.text("journal"), h.addClass("journal btn btn-info"), d.text(`${a.title}`), f.text(`Country:  ${a.country}  City:  ${a.city} Trip Rating:  ${a.ratings}`), g.addClass("blog-footer has-text-black");
        const i = $("<div>");
        i.addClass("card-content");
        const j = $("<p>");
        j.text(a.body);
        const k = $("<br>"),
            l = $("<br>");
        j.text(`${a.body}`);
        const m = $(`<img src="${a.imageURL}" alt="" srcset="">`);
        return e.append(d), e.append(f), c.append(m), i.append(k), i.append(l), i.append(j), g.append(`<div><a href='/blog?traveler_id=${a.Traveler.id}''Written by: '>${a.Traveler.name} </a> ${b}</div>`), c.append(e), c.append(i), c.append(g), c.data("post", a), c
    }
    const d = $(".blog-container");
    let e;
    const f = window.location.search;
    let g; - 1 === f.indexOf("?traveler_id=") ? a() : (g = f.split("=")[1], a(g))
});
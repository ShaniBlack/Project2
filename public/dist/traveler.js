$(document).ready(function() {
    function a(a) {
        $.post("/api/travelers", a).then(c)
    }

    function b(a) {
        console.log(a);
        const b = $("<tr>");
        return 0 < a.Posts.length && (b.data("traveler", a), b.append("<td>" + a.name + "</td>"), b.append("<td> " + a.Posts.length + "</td>"), b.append("<td><a href='/blog?traveler_id=" + a.id + "'>Go to Posts</a></td>")), b
    }

    function c() {
        $.get("/api/travelers", function(a) {
            const c = [];
            for (let d = 0; d < a.length; d++) c.push(b(a[d]));
            d(c)
        })
    }

    function d(a) {
        g.children().not(":last").remove(), h.children(".alert").remove(), a.length ? (console.log(a), g.prepend(a)) : e()
    }

    function e() {
        const a = $("<div>");
        a.addClass("alert alert-danger"), a.text("You must create an traveler before you can create a Post."), h.append(a)
    }
    const f = $("#traveler-name"),
        g = $("tbody"),
        h = $(".traveler-container");
    $(document).on("submit", "#traveler-form", function(b) {
        b.preventDefault();
        f.val().trim().trim() && a({
            name: f.val().trim()
        })
    }), $(document).on("click", ".delete-traveler", function() {
        const a = $(this).parent("td").parent("tr").data("traveler"),
            b = a.id;
        $.ajax({
            method: "DELETE",
            url: "/api/travelers/" + b
        }).then(c)
    }), c()
});
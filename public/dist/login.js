$(document).ready(()=>{function a(a,b){console.log(a,b),$.post("/api/login",{email:a,password:b}).then(()=>{window.location.href="/members"}).catch(a=>{console.log(a)})}const b=$("form.login"),c=$("input#email-input"),d=$("input#password-input");b.on("submit",b=>{b.preventDefault();const e={email:c.val().trim(),password:d.val().trim()};e.email&&e.password&&(a(e.email,e.password),c.val(""),d.val(""))})});
$(document).ready(function(){$.get("/api/user_data").then(a=>{console.log("user data",a.name),console.log("user id",a.id),$("#travelerId").val(a.id),$("#travelerName").val(a.name)});const a=document.querySelector("#fileUpload input[type=file]");a.onchange=()=>{if(0<a.files.length){const b=document.querySelector("#fileUpload .file-name");b.textContent=a.files[0].name}}});
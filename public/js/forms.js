$(document).ready(function(){
    $('#form_login').submit(function(e){
        e.preventDefault()
        let login = {
            email: $("#email").val(),
            password: $("#password").val()
        };
        $.ajax({
            url:'https://storynogan.herokuapp.com/api/login',
            method: 'POST',
            async: true,
            headers: { 'Content-type':'application/json' },
            data: JSON.stringify(login)
        }).then(data => {
            Swal.fire({
                title: data,
                icon:'success' 
            });
            $('#submitBtn').attr('disabled', true);
            setTimeout(() => {
                if(data === "Success!"){
                    window.location.href = "/mystory/account"
                }
            }, 1500)
        }).catch(err => {
            if(!err.responseText){
                Swal.fire({ text: 'Please upgrade your browser or use PC for better experience. Sorry.', icon: 'error' })
                return;
            }
            Swal.fire({
                title: err.responseText,
                icon:'error' 
            })
            $("#password").val("");
        });
    });
    $('#form_register').submit(function(e){
        e.preventDefault()
        if($("#password").val() !== $("#password2").val()){
            $("#password2").val("");
            return Swal.fire({
                        title: 'Passwords did not matched!',
                        icon:'error' 
                    });
        }
        if($("#password").val().length < 6){
            $("#password2").val("");
            console.log($("#password").val().length)
            return Swal.fire({
                        title: 'Password too short!',
                        icon:'warning' 
                    });
        }
        let registerAccount = {
            email: $("#email").val(),
            password: $("#password").val()
        };
        $.ajax({
            url:'https://storynogan.herokuapp.com/api/register',
            method: 'POST',
            async: true,
            headers: { 'Content-type':'application/json' },
            data: JSON.stringify(registerAccount)
        }).then(data => {
            Swal.fire({
                title: data,
                icon:'success' 
            });
            $('#registerBtn').attr('disabled', true);
            setTimeout(() => {
                if(data === "Success!"){
                    window.location.href = "/mystory/login"
                }
            }, 1500)
        }).catch(err => {
            if(!err.responseText){
                return Swal.fire({ text: 'Please upgrade your browser or use PC for better experience. Sorry.', icon: 'error' })
            }
            Swal.fire({
                title: err.responseText,
                icon:'error' 
            })
            $("#password2").val("");
        });
    });
});
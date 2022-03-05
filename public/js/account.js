$(document).ready(function(){

    function toggleError(){
        // console.log("called")
        $('#error_password').toggle();

        setTimeout(() => {
            $('#error_password').toggle();
        }, 2000)
    }

    $('#account_form').submit(function(e){
        e.preventDefault()

        let final_password = $("#final_password").val();
        let old_password = $("#old_password").val();
        let new_password = $('#new_password').val();
        let email = $("#email").val();

        console.log(old_password, "" , new_password)

        if(final_password !== new_password){
            //setTimeout(toggleError, 1000)
            toggleError()
        } else if(new_password.length < 6){
            Swal.fire({
                title: 'Password too short!',
                icon: 'error'
            });
            $("#final_password").val("");
            $("#new_password").val("");
            return;
        } else {
            let newChanges = {
                oldPassword: old_password,
                newPassword: new_password,
                email
            }

            sendDataToCRUD('change-password', newChanges);
        }
    });
});
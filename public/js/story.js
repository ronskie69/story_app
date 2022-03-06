$(document).ready(function(){

    if($('#_nickname').val() === ""){
        $('#_nickname').removeAttr('disabled')
    } else {
        $('#_nickname').attr('disabled', true)
    }

    $('#toggle_cards').click(function(){
        $('.card').toggleClass('hide');
        if($('#toggle_cards').hasClass('fa-arrow-up')){
            $('#toggle_cards').addClass('fa-arrow-down').removeClass('fa-arrow-up');
        } else {
            $('#toggle_cards').addClass('fa-arrow-up').removeClass('fa-arrow-down');
        }
    });

    $('#form_storu').submit(function(e){
        e.preventDefault();
        
        if($('#_nickname').val().length > 18){
            //$('#form_storu').trigger('reset')
            $('#_nickname').val("");
            return Swal.fire({ 
                title: 'Nickname too long!',
                text: 'Nickname length should be below 18 characters.',
                icon: 'warning'
            })
        }

        localStorage.setItem("nickname", $('#_nickname').val());

        let newStory = {
            title: $('#_title').val(),
            nickname: $('#_nickname').val(),
            story: $('#_story').val(),
            senderEmail: $('#_email').val()

        };
        sendDataToCRUD('create-story', newStory)
    });
    $('.deleteStory').each(function(i){
        $(`.deleteStory:eq(${i})`).click(function(){
            console.log($(`.card:eq(${i})`).attr('data-id'));
            const senderEmail = $(`.card:eq(${i})`).attr('data-sender');
            const id = $(`.card:eq(${i})`).attr('data-id');

            let newStory = { senderEmail, id };
            Swal.fire({
                title: 'Are you sure to delete this story?',
                text: 'You are delecting it permanently.',
                icon: 'warning',
                showCancelButton: true,
                reverseButtons: true
            }).then(result => {
                if(result.isConfirmed){
                    sendDataToCRUD('delete-story',newStory)
                }
            })
        })
    })
    // $('#edit').click(function(){
    //     if($(this).text() ==="Edit"){
    //         $(this).text("Save");
    //     } else {
    //         $(this).text("Edit")
    //     }
    // });
});

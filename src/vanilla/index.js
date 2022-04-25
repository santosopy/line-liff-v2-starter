import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        if (liff.isLoggedIn()) {
            console.log("get line data")

            $.ajax({
                type : "GET",    
                url : "http://127.0.0.1:8000/api/plans",    
                success : function(response){

                    response["data"].forEach(element => {
                    $(".list-group").append(
                            `
                            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" style="text-align:left">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">${element.title}</h5>
                                    <small>${element.created_at}</small>
                                </div>
                                <p class="mb-1">${element.description}</p>
                                <small>${element.price}</small>
                            </a>
                            `
                        )
                    });
                    

                },
                error : function(error, textStatus){
                    console.log(textStatus)
                }
            })
            
        } else {
            let result = window.confirm("LINE Loginしますか？");
            if(result) {
                liff.login();
            }
        }
        
    })
    .catch((error) => {
        console.log(error)
    })
});


// document.addEventListener("DOMContentLoaded", function() {
//   liff
//     .init({ liffId: process.env.LIFF_ID })
//     .then(() => {
//         if (liff.isLoggedIn()) {
//             console.log("get line data")

//             const idToken = liff.getProfile()
//             console.log(idToken)

//             // get token
//             var formData = new FormData()
//             // formData.append('email', 'user2@user.com')
//             // formData.append('password', '123456')
//             formData.append('email', 'matsuoka@tsart.jp')
//             formData.append('password', 'pass')
//             $.ajax({
//                 type : "POST",    
//                 url : "http://127.0.0.1:8000/api/login",    
//                 data : formData,
//                 processData: false,
//                 contentType: false,
//                 success : function(response){
//                     $("#token").val(response["token"])

//                     // id
//                     $.ajax({
//                         headers: {
//                             "Authorization": "Bearer "+$("#token").val()
//                         },
//                         type: "GET",
//                         url: "http://127.0.0.1:8000/api/reserve",
//                         success: function(response){
//                             let num = 0,
//                             date = new Date()
                            
//                             response.forEach(function(el){
//                                 num = ( el["id"] > num ) ? el["id"] : num
//                             })
//                             $("#id").val( parseInt(num)+1 )
//                             $("#created_at").val( Math.round(date) )
//                         }
//                     })

//                 },
//                 error : function(error, textStatus){
//                     console.log(textStatus)
//                 }
//             })
            
//             // post reserve
//             $("#send").click(function(event){
//                 event.preventDefault()

//                 $.ajax({
//                     headers: {
//                         "Authorization": "Bearer "+$("input[name=token]").val()
//                     },
//                     type: "POST",
//                     data : {
//                         name : $("input[name=name]").val(),
//                         price : $("input[name=price]").val()
//                     },
//                     url: "http://127.0.0.1:8000/api/reserve",
//                     success: function(response){
//                         console.log("success")
//                     },
//                     error : function(error, textStatus){
//                         console.log(textStatus)
//                     }
//                 })
//             })

//         } else {
//             let result = window.confirm("LINE Loginしますか？");
//             if(result) {
//                 liff.login();
//             }
//         }
        
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// });

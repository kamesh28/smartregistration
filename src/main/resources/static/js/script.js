console.log("this is script file")


const toggleSidebar = () => {
    if ($('.sidebar').is(':visible'))
     {

        $('.sidebar').css('display','none');
        $('.content').css('margin-left', '20%');
    }
     else 
     {
        $('.sidebar').css('display','block');
        $('.content').css('margin-left','20%');
    }
};


const search =()=> {
    let query = $("#search-input").val();
    
    if (query == "") {
        $(".search-result").hide();
    } else {
        
        //sending request to server

     let url = `http://localhost:8181/search/${query}`; // bactick

        fetch(url).then((response) => {
            return response.json();
        })
            .then((data) => {
                //data accessing...
                console.log(data);

                let text = `<div class='list-group'>`;
                data.forEach((contact) => {
                    text = + `<a href='#' class='list-group-item list-group-action'> ${contact.name} </a>`;
                });

                text += `</div>`;

                $(".search-result").html(text);
                $(".search-result").show();

            });
       
    }
};

// first request- to server to create order
const paymentStart = () => {
    console.log('payment started...');

    let amount = $("#payment_field").val();
    console.log(amount);
    if (amount == '' || amount == null) {
      //  alert("amount is required !!");
        swal("Failed !!", "Amount is reuired !!", "error");
        return;
    }

    // code..
    //we will use ajax to send request to server to create order

    $.ajax(
        {
            url :'/user/create_order',
            data: JSON.stringify({ amount:amount, info: 'order_request' }),
            contentType: 'application/json',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                //invoker when success
                console.log(response);
                if (response.status == 'created') {
                    //open payment form
                    let options = {
                        key: 'rzp_test_4FCWvdLC7kmLtV',
                        amount: response.amount,
                        currency: 'INR',
                        name: 'NADD',
                        description: 'Donation',
                        image: 'https://img1.digitallocker.gov.in/nad/theme/assets/img/nad-logo-new.png',
                        order_id: response.id,
                        handler: function (response) {
                            console.log(response.razorpay_payment_id);
                            console.log(response.razorpay_order_id);
                            console.log(response.razorpay_signature);
                            console.log("payment successful !!");
                           // alert("congrats !! Payment successful !!");

                            updatePaymentOnServer(
                                response.razorpay_payment_id,
                                response.razorpay_order_id,
                                'paid'
                            );

                            
                        },
                        "prefill": {
                            "name": "",
                            "email": "",
                            "contact": "",
                        },
                        "notes": {
                            "address": "NAD Government Office"
                        },
                        "theme": {
                            "color": "#3399cc"
                        },
                    };
                    let rzp = new Razorpay(options);

                    rzp.on('payment.failed', function (response) {
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        alert("Oops payment failed");
                        swal("Failed !!", "Oops payment failed!", "error");
                    });
                    rzp.open();
                }
            },
            error: function (error) {
                //invoker when error
                console.log(error);
                alert("something went wrong !!");
            }
        })
};

function updatePaymentOnServer(payment_id, order_id, status)
{
    $.ajax({
        url: '/user/update_order',
        data: JSON.stringify({
            payment_id: payment_id,
            order_id: order_id,
            status: status,
        }),
        contentType: 'application/json',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            swal("Good job!", "congrats !! Payment successful !!", "success");
        },
        error: function (error) {
            swal("Failed !!", "Your payment is successful, but we did not get on server, we will contact you as soon as possible", "error");
        },
    });
}
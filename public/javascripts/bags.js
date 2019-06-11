function checkIndex(array, type){
  var poke = [], listPoke = [], check = 0;
  $.ajax({
    type: "post",
    url: "/bags/allPoke/",
    dataType: "json",
    data: { idtype : type },
    async:false,
    success: function (response) {
        //console.log(response);
        //res.push(response.items);
        poke= response;
    }
  });
 // console.log(array);
  for(let value of poke){
    for(let po of array){
      if(value._id == po._id._id){
        check = 1;
        var content = `<div class="box row" value="${po._id._id}">
                    <div class="col-md-3">
                      <img src="${po._id.imagePokemon}">
                    </div>
                    <div class="col-md-4">
                      <p>${po._id.namePokemon} x ${po.amount} </p>
                    </div>
                    <div class="col-md-3">
                      <p>CP : ${po._id.CP}</>
                    </div> 
                    <div class="col-md-2" >
                      <i class="fa fa-angle-double-up upgradePoke" value="${po._id._id}" style="cursor: pointer;"></i>
                      <i class="fa fa-trash deletePoke" value="${po._id._id}" style="cursor: pointer;"></i>
                    </div> 
                  </div>`;
      }
     
    }
   // console.log(check);
    if(check == 0){
        var content = `<div class="box row" value="${value._id}" style="opacity: 0.3;">
                    <div class="col-md-3">
                      <img src="${value.imagePokemon}">
                    </div>
                    <div class="col-md-3">
                      <p>CP : ${value.CP}</>
                    </div> 
                  </div>`
    }
    listPoke += content;
    check = 0;
  }
 return listPoke;
}
function showPokemon(){
  var user;
   $.ajax({
      type: "get",
      url: "/users",
      dataType: "json",
      async:false,
      success: function (response) {
          //console.log(response);
          //res.push(response.items);
          user= response;
      }
  });
  // list all pokemon
  var pokemons = [];
  var kanto = [];
  var johto = [];
  var sinnoh = [];
  var hoenn = [];
  console.log(user.bag.pokemons);
  for(let value of user.bag.pokemons){
      var content = `<div class="box row" value="${value._id._id}">
                      <div class="col-md-3">
                        <img src="${value._id.imagePokemon}">
                      </div>
                      <div class="col-md-3">
                        <p>${value._id.namePokemon} x ${value.amount} </p>
                      </div>
                      <div class="col-md-3">
                        <p>CP : ${value._id.CP}</>
                      </div> 
                      <div class="col-md-3" >
                        <i class="fa fa-angle-double-up upgradePoke" value="${value._id._id}" style="cursor: pointer;"></i>
                        <i class="fa fa-trash deletePoke" value="${value._id._id}" style="cursor: pointer;"></i>
                      </div> 
                    </div>`
      if(value._id.typePokemons == "5c967763df6b630b8cf2f815")
      {

       johto.push(value);
      }
      else if(value._id.typePokemons == "5c967763df6b630b8cf2f816"){
        hoenn.push(value);
      }
      else if(value._id.typePokemons == "5c967763df6b630b8cf2f817"){
        sinnoh.push(value);
      }
      else if(value._id.typePokemons == "5c967763df6b630b8cf2f818"){
        kanto.push(value);
      }
      pokemons += content;
  }
  $('#list-pokemon').empty();
  $('#list-pokemon').append(pokemons);

  // list kanto
  
  $('#list-kanto').empty();
  $('#list-kanto').append(checkIndex(kanto,'5c967763df6b630b8cf2f818'));
  // list johto4
  
  $('#list-johto').empty();
  $('#list-johto').append(checkIndex(johto,'5c967763df6b630b8cf2f815'));
  // list hoenn
  $('#list-hoenn').empty();
  $('#list-hoenn').append(checkIndex(hoenn,'5c967763df6b630b8cf2f816'));
  // list sinnoh
  $('#list-sinnoh').empty();
  $('#list-sinnoh').append(checkIndex(sinnoh,'5c967763df6b630b8cf2f817'));
}
$( document ).ready(function() {

    
      var pinterestShare = $("#pinterest")
          pinterestShare.empty()
          pinterestShare.append(`<a class="social pinterest"` +
                        `data-media="` + window.location.origin + "image" + `"` +
                        `data-description="Đây là game Pokebiz` + "Name" + `. Hãy vào đây để chơi cùng mình nhé !"><img style="width: 60px;" src="data:image/png;base64,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", alt=""/></a>`)
      $('#pinterest').click(function(){
        PinUtils.pinOne({
          url: "pokebiz.tk",
          media: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiY0LG8jtriAhUKPo8KHWhYABgQjRx6BAgBEAU&url=https%3A%2F%2Fyoutubepoop.fandom.com%2Fwiki%2FPikachu&psig=AOvVaw23DMLZNGtQBkDGU1IfhusK&ust=1560091118125846",
            description: $(".pinterest").attr('data-description')
        });
    });
    $('#submit1').click(function(){
        var coin = $('#coin').val();
        $.ajax({
            type: 'post',
            url: '/bags/card/',
            dataType: "json",
            data: { coin : coin},
            success: function(res){
                console.log(res.success);
                $('#messCard').empty();
                $('#messCard').append(res.success);
                  $('#messCard').addClass('d-block animated');
                  setTimeout(function(){
                    $('#messCard').removeClass('d-block animated');
                  }, 2000);
                 
            }
        })
    })
   
    $('.poke-index').click(function(){
      showPokemon();
    })
    
    
    $('.bag-index').click(function(){
        var user;
        $.ajax({
            type: "get",
            url: "/users",
            dataType: "json",
            async:false,
            success: function (response) {
                //console.log(response);
                //res.push(response.items);
                user= response;
            }
        });

        // user name, level, image
        var contact = [];
        if(user.sex){
            contact1 = `<img src="images/User1.png", alt="user image" >`;
        }
        else{
            contact1 = `<img src="images/user2.png", alt="user image">`;
        };

        var contact2 = `<h4>${user.username}</h4>
                        <p>Level : ${user.level}</p>`;

        contact = contact1 + contact2;    
        $('#contact').empty();
        $('#contact').append(contact);
        // list pokemon
        var pokemons = [];
        for(let value of user.bag.pokemons){
            var content = `<div class="col-md-4">
                              <div class="box">
                                <p>${value._id.namePokemon}</p>
                                <img src="${value._id.imagePokemon}">
                                <p>CP : ${value._id.CP}</>
                                </div>
                            </div>`
            pokemons += content;
        }
        $('#list-pokemon').empty();
        $('#list-pokemon').append(pokemons);
        
        // list item
        var items=[];
        for(let value of user.bag.items){
            var content = `<div class="col-md-4">
                              <div class="box">
                                <p>${value._id.nameItem}</p>
                                <img src="${value._id.imageItem}">
                                <p>Số luợng : ${value.amount}</>
                               </div>
                            </div>`
            items += content;
        }
        $('#list-item').empty();
         $('#list-item').append(items);

         // list friend
         var friends =[];
         for(let value of user.friends){
             var content = `<div class="col-md-4">
                                <div class="box">
                                 <p>${value.username}</p>
                                 <p>Level : ${value.level}</>
                                </div>
                             </div>`
            friends += content;
         }
         $('#list-friend').empty();
          $('#list-friend').append(friends);
 
    });



    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    $('#btnAddFr').click(function(){
        $.ajax({
            type: "post",
            url: "/users/addfriend",
            dataType: "text",
            data: { namefriend :ipFr.value},
            dataType: "json",
            success: function(result){
                console.log(result);
                $('#messAddFr').empty();
                $('#messAddFr').append(result.mess);
                  $('#messAddFr').addClass('d-block animated');
                  setTimeout(function(){
                    $('#messAddFr').removeClass('d-block animated');
                  }, 2000);
                 
                 
            },
        })
    });
    var myCustomScrollbar = document.querySelector('.my-custom-scrollbar');
    Ps.initialize(myCustomScrollbar);
    var scrollbarY = myCustomScrollbar.querySelector('.ps.ps--active-y>.ps__scrollbar-y-rail');

    myCustomScrollbar.onscroll = function() {
        scrollbarY.style.cssText = `top: ${this.scrollTop}px!important; height: 400px; right: ${-this.scrollLeft}px`;
    }

        
})
// const swalWithBootstrapButtons = swal.mixin({
//     customClass: {
//       confirmButton: 'btn btn-success',
//       cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false,
//   })
$(document).on('click','.upgradePoke',function(){
  var id = $(this).attr('value');
  console.log(id);
  $.ajax({
    type: "post",
    url: "/bags/upgradePoke/",
    data: { _idPoke : id},
    dataType: "json",
    success: function(response){
        showPokemon();
        alert(response.messenger);
    }
});
})
$(document).on('click','.deletePoke',function(){
    var id = $(this).attr('value');
    console.log(id);

    $.ajax({
      type: "delete",
      url: "/bags/deletePokemon/",
      data: { _idPoke : id},
      dataType: "json",
      success: function(result){
        showPokemon();
        alert('Delete success!!');
      }
    });
      // swalWithBootstrapButtons.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Delete ?!',
      //   cancelButtonText: 'Upgrade ?!',
      //   reverseButtons: true
      // }).then(async(result) => {
      //   if (result.value) {
      //     console.log('delete');
      //       $.ajax({
      //           type: "delete",
      //           url: "/bags/deletePokemon/",
      //           data: { _idPoke : id},
      //           dataType: "json",
      //           success: function(result){
      //             showPokemon();
      //           }
      //       });
      //       swalWithBootstrapButtons.fire(
      //           'Deleted!',
      //           'Pokemon has been deleted.',
      //           'success'
      //       )
      //   } else 
      //   if (result.dismiss === Swal.DismissReason.cancel
      //   ) {
      //     console.log('upgrade');
      //     var mess;
            // $.ajax({
            //     type: "post",
            //     url: "/bags/upgradePoke/",
            //     data: { _idPoke : id},
            //     dataType: "json",
            //     success: function(response){
            //         showPokemon();
            //         alert(response.messenger);
            //     }
            // });
      //       console.log(mess);
      //     swalWithBootstrapButtons.fire(
      //       'Cancelled',
      //       'Your imaginary file is safe :)',
      //       'error'
      //     )
      //   }
      // })
})


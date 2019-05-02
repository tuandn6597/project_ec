var express=require('express');
var router =express.Router();
var Bag=require('../models/bag');
var User=require('../models/user');
var Card = require('../models/card');

router.get('/',function(req,res,next){
    res.send('this is page pags');
})
router.post('/saveItemToBag',function(req,res,next){
       var idUser=req.user._id;
        var idItem=req.body._idItem;
        var number=parseFloat(req.body.number);
        var item={_id:idItem,amount:number};
        var price=parseFloat(req.body.price);
    User.findOne({_id:idUser},function(err,user){
        if(err) throw err;
       
        var idBag=user.bag;
        // Bag.findByIdAndUpdate(idBag,{$addToSet:{items:item}},{new:true},function(err,doc){
        //     if(err) throw err;
        //     console.log(doc);
        // })
        if(user.money>=price)
        {

        
        Bag.findById(idBag,function(err,bag){
            if(err) throw err
            else
            {
                let tag=0;
                (bag.items).forEach(function(ele,index){
                  
                    if(ele._id==item._id)
                    {
                        bag.items[index].amount=ele.amount+item.amount;
                        console.log(index);
                        console.log(bag.items[index].amount);
                       tag=1;
                    }
                  
                })
                if(tag==0)
                {
                bag.items.push(item);
                }
                bag.save(function(err,b){
                    if(err) throw err;
                    console.log('bag is save '+b);
                   
                })
                
            }
        })

        user.money=user.money-price;
        user.save(function(err,u){
            if(err) throw err;
            console.log('user is save'+u);
            res.json({done:true})
        })
        }//end if(money)
        else
        res.json({done:false});
    })
})

router.post('/savePokemon',function(req, res, next){
    var poke = { _id : req.body._idPoke, amount : 1};
    var tag = 1;
    User.findOne({ _id : req.user._id}, function(err, usr){
        Bag.findOne({ _id : usr.bag}, function(err, bg){
        
            if(bg.items[0].amount === 0){
                res.json({error: "Hết bóng rồi. Vui lòng vào shop mua !!?"});
            }
            else{
                bg.items[0].amount -=1;
                if(req.body.random %2 == 0){
                    bg.pokemons.forEach(function(element,index){
                        if(element._id == req.body._idPoke){
                            bg.pokemons[index].amount = element.amount + 1;
                            tag = 0;
                        }
                    })
                    if(tag == 1){
                        bg.pokemons.push(poke);
                    }
                };
            
                console.log(bg.items[0].amount);
                bg.save(function(err){
                    if(err)  res.json({error: err});
                    if(req.body.random %2 == 0){
                        res.json({success: "Giam nó rồi !!"});
                    }
                })
                if(req.body.random %2 == 1){
                    res.json({error: "Run away !!"});
                    }
            }
            
        })
    })
})
router.post('/card', function(req, res){
    console.log( req.body);
    Card.find({ code : req.body.coin })
        .exec(function(err, doc){
            if(err) return res.json({ success : 'Mã không đúng !!'});
            if(doc.length > 0) {
                if(doc[0].status === false){
                    return res.json({ success : 'Mã đã được sử dụng !!'});
                }
                else{
                    User.findOne({ _id : req.user._id})
                        .exec(function( err, usr){
                            console.log(usr);
                            let coin = usr.money + doc[0].type;
                            usr.money = coin;
                            
                            usr.save();
                        });
                        
                    doc[0].status = 'false';
                    doc[0].save();
                    return res.json({success:'Bạn đã nạp thành công'});
                } 
            }
            res.json({ success : 'Mã không đúng !!'});
        })
})
module.exports=router;
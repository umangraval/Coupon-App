/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('restaurant/create');
        
        var restaurant = await Restaurant.create(req.body).fetch();
    
        return res.status(201).json({ id: restaurant.id });
    },
    
    // json function
    json: async function (req, res) {

    var everyones = await Restaurant.find();

    return res.json(everyones);
    },

    malls: async function (req, res) {

        var rmalls = await Restaurant.find({ mall: req.params.mall });
        console.log(rmalls);
        return res.json(rmalls);
    },


     // action - admin
    admin: async function (req, res) {

    var everyones = await Restaurant.find();
    
    return res.view('restaurant/admin', { restaurants: everyones });
    },
    redeemed: async function (req, res){

        // var ids = [];
        // for (var i=0; i < thatUser.clients.length; i++) {
        //     ids.push(thatUser.clients[i].id);
        // }
        var restaurents = await Restaurant.findOne(req.params.id).populate("consultants");
        // console.log(restaurents);
        return res.view("restaurant/redeemed", {members: restaurents.consultants})
        // return res.send(restaurents);

    },
    // action - read
    read: async function (req, res) {

    var thatRestaurant = await Restaurant.findOne(req.params.id);

    if (!thatRestaurant) return res.notFound();
    console.log(thatRestaurant);
    return res.json(thatRestaurant);
    // return res.view('restaurant/read', { restaurant: thatRestaurant });
    },

    // action - update
    update: async function (req, res) {

    if (req.method == "GET") {

        var thatRestaurant = await Restaurant.findOne(req.params.id);

        if (!thatRestaurant) return res.notFound();

        return res.view('restaurant/update', { restaurant: thatRestaurant });
        
    } else {
    
        var updatedRestaurant = await Restaurant.updateOne(req.params.id).set(req.body);

        if (!updatedRestaurant) return res.notFound();

        if (req.wantsJSON){
            return res.status(204).send();	    // for ajax request
        } else {
            return res.redirect('/');			// for normal request
        }
    }
    },

    // action - delete 
    delete: async function (req, res) {

    var deletedRestaurant = await Restaurant.destroyOne(req.params.id);

    if (!deletedRestaurant) return res.notFound();

    if (req.wantsJSON){
        return res.status(204).send();	    // for ajax request
    } else {
        return res.redirect('/');			// for normal request
    }

    },

    // search function
    search: async function (req, res) {
        
        var thoseRestaurants = await Restaurant.find({
            sort: 'coin'
        });
        
        return res.view('restaurant/admin', { restaurants: thoseRestaurants });
    },

    // action - paginate
    searchp: async function (req, res) {
        return res.view('restaurant/paginate');
    },
    paginate: async function (req, res) {
        // var limit = Math.max(req.query.limit, 2) || 2;
        // var offset = Math.max(req.query.offset, 0) || 0;
        var whereClause = {};
        var minCoin = Math.max(parseInt(req.query.minCoin), 0) || 0;
        var maxCoin = Math.max(parseInt(req.query.maxCoin), 0) || 100000000;
    
        if (!isNaN(minCoin) && !isNaN(maxCoin)) {
            whereClause.coin = {'>=': minCoin, '<=': maxCoin}  
        }     
        // if (req.query.region) whereClause.region = { contains: req.query.region };
    
        var someRestaurants = await Restaurant.find({
            where: whereClause,
            // limit: limit,
            // skip: offset
        });
        console.log(someRestaurants);

        // if (req.query.validity) {
            // var sd = new Date(req.query.validity);
            // console.log(someRestaurants);
            // var result = someRestaurants.filter(d => {var time = new Date(d.validity);
                // return (time > sd);
            // });    
            // return res.json({ restaurants: result });
            // return res.view('restaurant/p', { restaurants: result, numOfRecords: result.length });    
        // }
        
        // var count = await Restaurant.count(whereClause);
        // return res.view('restaurant/paginate', { restaurants: someRestaurants, numOfRecords: count });
        // console.log(someRestaurants);
        return res.json(someRestaurants);
    },

    // action - home
    home: async function (req, res) {
    
        var limit = Math.max(req.query.limit, 10) || 10;
        var offset = Math.max(req.query.offset, 0) || 0;
       
        var someHKIsland = await Restaurant.find({
            where: {region: "HKIsland"},
            limit: limit,
            skip: offset
        });

        var someKowloon = await Restaurant.find({
            where: {region: "Kowloon"},
            limit: limit,
            skip: offset
        });
        
        var someNew = await Restaurant.find({
            where: {region: "New_Territories"},
            limit: limit,
            skip: offset
        });
    
        return res.view('restaurant/home', { restaurantsone: someHKIsland ,restaurantstwo: someKowloon, restaurantsthree: someNew});
    },

    // action - populate
    populate: async function (req, res) {
        
        var restaurant = await Restaurant.findOne(req.params.id).populate("consultants");
        
        if (!restaurant) return res.notFound();
        return res.json(restaurant);
    },
    checkredeem: async function (req, res) {
        var thatUser = await User.findOne(req.session.uid).populate("clients", {id: req.params.id});
        if (thatUser.clients.length > 0)
            return res.status(409).json("User already exists.");   // conflict
        
        return res.ok();
    },

    // action - add association
    redeem: async function (req, res) {
        // console.log(req.session);
        var thatRestaurant = await Restaurant.findOne(req.params.id);
        console.log("here");
        console.log(thatRestaurant);
        if (!thatRestaurant) return res.status(404).json("Coupon not found.");
        
        var thatUser = await User.findOne(req.session.uid).populate("clients", {id: req.params.id});
        if(thatRestaurant.quota <= 0) return res.status(498).json("No Quota left!");

        if (!thatUser) return res.status(404).json("User not found.");
        // console.log(thatUser);
        if (thatUser.clients.length > 0)
            return res.status(409).json("User already exists.");   // conflict
        
        if(thatUser.coins < thatRestaurant.coin) return res.status(499).json("Coins are less");

        // console.log(thatUser);
        // if(thatUser.coupons.length != 0) return res.status(409).json("Already redeemed!");

        thatRestaurant.quota--;
        await Restaurant.updateOne(req.params.id).set({quota: thatRestaurant.quota });
        
        var finalCoins = thatUser.coins - thatRestaurant.coin;
       
        await User.updateOne(req.session.uid).set({ coins: finalCoins })
        // await Restaurant.addToCollection(req.params.id, "consultants").members(req.session.uid);
        
        // var thatUser = await User.findOne(req.session.uid).populate("clients", {id: req.params.id});
        // console.log(thatUser);
        // if (!thatUser) return res.status(404).json("User not found.");
            
        // if (thatUser.clients.length > 0)
        //     return res.status(409).json("User already exists.");   // conflict
        
        await Restaurant.addToCollection(req.params.id, "consultants").members(req.session.uid);
    
        return res.status(200).json("success");
        },

    // action - list
    list: async function (req, res){
        var thatUser = await User.findOne(req.session.uid).populate("clients");

        if(!thatUser) return res.status(404).json("No User found");
        var ids = [];
        for (var i=0; i < thatUser.clients.length; i++) {
            ids.push(thatUser.clients[i].id);
        }
        var restaurents = await Restaurant.find({
            where: { id: {in: ids}}
        });
        console.log(restaurents);
        return res.json({restaurants: restaurents, coins: thatUser.coins});
        // return res.view("restaurant/redeem", {restaurants: restaurents, coins: thatUser.coins})
    },

    //owners

    owners: async function (req, res){
        var thatRestaurant = await Restaurant.findOne(req.params.qid).populate("consultants");
        if (!thatRestaurant) return res.status(404).json("Coupon not found");
        return res.view ("restaurant/consultants", {restaurant: thatRestaurant});
    },

    // action - remove association 
    remove: async function (req, res) {

        if (!await Restaurant.findOne(req.params.id)) return res.status(404).json("Coupon not found.");
        
        var thatUser = await User.findOne(req.params.fk).populate("clients", {id: req.params.id});
        
        if (!thatUser) return res.status(404).json("User not found.");
    
        if (thatUser.clients.length == 0)
            return res.status(409).json("There is nothing to delete");    // conflict
    
        await Restaurant.removeFromCollection(req.params.id, "consultants").members(req.params.fk);
    
        return res.ok();
    },
};


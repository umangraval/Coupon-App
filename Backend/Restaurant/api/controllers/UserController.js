/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
    
        if (!req.body.username || !req.body.password) return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) return res.status(401).json("User not found");
        if (user.role == 'admin') return res.status(402).json("Admin Not Allowed");
        var match = await sails.bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).json("Wrong Password");
    
        console.log(user);
        // Reuse existing session 
        if (!req.session.username) {
            req.session.uid = user.id;
            req.session.username = user.username; 
            req.session.role = user.role;
            return res.json(user);
        }
        
        // Start a new session for the new login user
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
            req.session.uid = user.id;
            req.session.username = user.username;
            req.session.role = user.role;   
            return res.json(user);
        });
    },

    logout: async function (req, res) {
        console.log("logout");
        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
        
        if (req.wantsJSON){
            return res.status(204).send();	    // for ajax request
        } else {
            return res.redirect('/');			// for normal request
        }

        });
    },

    populate: async function (req, res) {

        var user = await User.findOne(req.params.id).populate("clients");
    
        if (!user) return res.notFound();
    
        return res.json(user);
    },

    add: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
        
        var thatRestaurant = await Restaurant.findOne(req.params.fk).populate("consultants", {id: req.params.id});
    
        if (!thatRestaurant) return res.status(404).json("Coupon not found.");
            
        if (thatRestaurant.consultants.length > 0)
            return res.status(409).json("Coupon already exists.");   // conflict
        
        await User.addToCollection(req.params.id, "clients").members(req.params.fk);
    
        return res.ok();
    },
        //change rwdeem, make list and admin
    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
        
        var thatRestaurant = await Restaurant.findOne(req.params.fk).populate("consultants", {id: req.params.id});
        
        if (!thatRestaurant) return res.status(404).json("Coupon not found.");
    
        if (thatRestaurant.consultants.length == 0)
            return res.status(409).json("There is nothing to delete");    // conflict
    
        await User.removeFromCollection(req.params.id, "clients").members(req.params.fk);
    
        return res.ok();
    },

};


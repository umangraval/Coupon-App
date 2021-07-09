/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);
  
  if (await Restaurant.count() > 0) {
    return generateUsers();
}

await Restaurant.createEach([
    {
        imageurl: "https://i.ibb.co/287MkXj/WBC-0319.jpg",
        title: "Coupon on Indian food because I am Indian",
        restaurantname: "By Dhawan",
        region: "HKIsland",
        mall: "Times Square",
        image: "",
        quota: 120,
        coin: 120,
        validity: "2020-11-12",
        details: "PLEASE READ README || Updated real image URL || Indian cuz I am an Indian"
      },
      {
        imageurl: "https://i.ibb.co/F40GjRV/WBC-7095.jpg",
        title: "Ask any coupon you want. LOL",
        restaurantname: "By Anmol",
        region: "New_Territories",
        mall: "Tsuen Wan Plaza",
        image: "",
        quota: 400,
        coin: 400,
        validity: "2020-12-12",
        details: "Anmol || Another trial to be here"
      },
      {
        imageurl: "https://i.ibb.co/12gh0h8/Greyhound.png",
        title: "Simply receive a complimentary drink",
        restaurantname: "Greyhound Cafe",
        region: "HKIsland",
        mall: "IFC Mall",
        image: "",
        quota: 120,
        coin: 500,
        validity: "2021-03-31",
        details: "Offer is valid after 6pm for dine-in only"
      },
      {
        imageurl: "https://i.ibb.co/2dPc8zx/Mango-Tree.png",
        title: "50% discount on Supreme Seafood Feast",
        restaurantname: "Mango Tree",
        region: "Kowloon",
        mall: "Elements",
        image: "",
        quota: 500,
        coin: 750,
        validity: "2021-06-16",
        details: "Original Price: HK$ 790 per person"
      },
      {
        imageurl: "https://i.ibb.co/tC2pW8K/Yogane.png",
        title: "50% off Yoogane's Chicken Galbi",
        restaurantname: "Yoogane",
        region: "New_Territories",
        mall: "Tsuen Wan Plaza",
        image: "",
        quota: 400,
        coin: 500,
        validity: "2021-02-09",
        details: "Only applicable on Monday to Thursday (except Public Holiday and Eve)"
      },
      {
        imageurl: "https://i.ibb.co/6yqvJSJ/Ana-Gura.png",
        title: "15% Off on Whole Bill",
        restaurantname: "Ana Gura",
        region: "Kowloon",
        mall: "Festival Walk",
        image: "",
        quota: 800,
        coin: 500,
        validity: "2021-11-07",
        details: "Ana Gura is the best!"
      }
]);

return generateUsers();

async function generateUsers() {

	if (await User.count() > 0) {
	  return;
	}
	
var hash = await sails.bcrypt.hash('123456', salt);

await User.createEach([
    { username: "admin", password: hash, role: "admin", coins: 2000},
    { username: "boss", password: hash, role:"member", coins: 2000 },
    { username: "anmol", password: hash, role: "member", coins: 2000} 
    // etc.
]);
const By_Dhawan = await Restaurant.findOne({restaurantname: "By Dhawan"});
const Greyhound_Cafe = await Restaurant.findOne({restaurantname: "Greyhound Cafe"});
const admin = await User.findOne({username: "admin"});
const boss = await User.findOne({username: "boss"});
}

};

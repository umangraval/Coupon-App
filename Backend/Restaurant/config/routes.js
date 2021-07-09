/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
 'GET /restaurant/create': 'RestaurantController.create',
 'POST /restaurant/create': 'RestaurantController.create',
 'GET /': 'RestaurantController.home',
 'GET /restaurant': 'RestaurantController.home',
 'GET /restaurant/home': 'RestaurantController.home',
 'GET /restaurant/admin': 'RestaurantController.admin',
 'GET /restaurant/json': 'RestaurantController.json',
 'GET /restaurant/malls/:mall': 'RestaurantController.malls',
 'GET /restaurants/redeemed/:id': 'RestaurantController.redeemed',
 'GET /restaurants/redeem/:id' : 'RestaurantController.redeem',
 'GET /restaurants/checkredeem/:id' : 'RestaurantController.checkredeem',
 'GET /restaurants/getcoupons' : 'RestaurantController.list',

 'GET /restaurant/update/:id': 'RestaurantController.update',
 'POST /restaurant/update/:id': 'RestaurantController.update',

//  'POST /restaurant/delete/:id': 'RestaurantController.delete',
 'DELETE /restaurant/:id': 'RestaurantController.delete',
 
 'GET /restaurant/paginate': 'RestaurantController.searchp',
 'GET /restaurant/search': 'RestaurantController.paginate',
 'GET /restaurant/read/:id': 'RestaurantController.read',
 
 'GET /user': 'UserController.login',
 'GET /user/login': 'UserController.login',
 'POST /user/login': 'UserController.login',
 'POST /user/logout': 'UserController.logout',

 'GET /restaurant/:id/consultants': 'RestaurantController.populate',
 'GET /user/:id/clients': 'UserController.populate',
//  'POST /user/:id/clients/redeem/:fk': 'UserController.redeem',
//  'POST /user/redeem/': 'UserController.redeem',
 'POST /user/:id/clients/remove/:fk': 'UserController.remove',

 'POST /restaurant/:id/consultants/add/:fk': 'RestaurantController.add',
 'POST /restaurant/:id/consultants/remove/:fk': 'RestaurantController.remove',

 };

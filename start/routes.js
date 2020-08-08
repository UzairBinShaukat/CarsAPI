"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.post("users", "UserController.index");

  Route.post("cars", "CarController.store");
  Route.get("cars", "CarController.index");
  Route.get("cars/:id", "CarController.show");
  Route.put("cars/:id", "CarController.update");
  Route.delete("cars/:id", "CarController.destroy");
}).prefix("api");

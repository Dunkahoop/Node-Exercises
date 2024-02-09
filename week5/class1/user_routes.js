import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import { Router } from "express";
import express from "express";

const user_router = Router();

//I declared these outside to reduce repetitive code
var db = await dbRtns.getDBInstance();//get database
var users = await dbRtns.findAll(db, cfg.collection);//get users from database

user_router.use(express.json());//parse json data

//get all users
user_router.get("/", async (req, res) => {
  try {
    users = await dbRtns.findAll(db, cfg.collection);

    res.status(200).send({ users: users });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send({msg: "get all users failed - internal server error"});
  }
});

//get user specified un URL
user_router.get("/:name", async (req, res) => {
  let name = req.params.name;

  try {
    let user = await dbRtns.findOne(db, cfg.collection, { name: name });

    if (user) res.status(200).send({ user });
    else res.status(200).send({msg: `cannot find user ${name}`});
  } catch (err) {
    console.log(err.stack);
    res.status(500).send({msg: "get user failed - internal server error"});
  }
});

//Add new user to database using HTTP
user_router.post("/", async (req, res) => {
  try {
    const user = req.body;

    await dbRtns.addOne(db, cfg.collection, user);

    res.status(200).send({ msg: "document added to users collection" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send({msg: "post user failed - internal server error"});
  }
});

//update existing user using HTTP
user_router.put("/", async (req, res) => {
  try {
    const user = req.body;

    let updateResults = await dbRtns.updateOne(db, cfg.collection, 
      { name: user.name }, 
      { age: user.age, email: user.email });

      //updateResults["value"] is null when user specified in put does not exist
    if(updateResults["value"] === null) res.status(200).send({ msg: `user ${user.name} was not updated` });
    else res.status(200).send({ msg: `user ${user.name} was updated` });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("put user failed - internal server error");
  }
});

//delete user specifed in URL using HTTP
user_router.delete("/:name", async (req, res) => {
  let name = req.params.name;

  try {
    let user = await dbRtns.deleteOne(db, cfg.collection, { name: name });

    if (user) res.status(200).send({msg: `${user.deletedCount} user was deleted`});
    else res.status(200).send({msg: `no users were deleted`});
  } catch (err) {
    console.log(err.stack);
    res.status(500).send({msg: "delete user failed - internal server error"});
  }
});

export default user_router;

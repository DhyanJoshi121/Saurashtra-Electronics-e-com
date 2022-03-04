import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    //dont't want to import anything with stuff already in database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    //cleared database

    //passed created users into UserModel
    // await User.insertMany(users);

    // we will create array of the created users
    const createdUsers = await User.insertMany(users);

    //getting admin from createdUsers array
    const adminUser = createdUsers[0]._id;
    console.log(adminUser);

    //adding admin to every product object
    const sampleProducts = products.map((product) => {
      console.log({ ...product, user: adminUser });
      return { ...product, user: adminUser };
    });

    //passing our new sampleProducts in product model
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //dont't want to import anything with stuff already in database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    //cleared database

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

//process.argv[2] will see the terminal command 3rd
//meaning if we right node backend/seeder -d
// that -d can be accessed through process.argv[2]

if (process.argv[2] === "-d") {
  destroyData();
  //   console.log("working");
} else {
  importData();
  //   console.log("working somehow");
}

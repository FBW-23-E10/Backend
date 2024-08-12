import fs from "fs";
import Listing from "../models/Listing.js";

export async function seedDatabase() {
  try {
    const listingsCount = await Listing.countDocuments();
    console.log(`There are ${listingsCount} listings in the database.`);

    if (listingsCount === 0) {
      console.log("No data found, seeding data...");
      const data = fs.readFileSync("data.json", {
        encoding: "utf8",
        flag: "r",
      });

      const json = JSON.parse(data);

      for (const listing of json) {
        await Listing.create(listing);
      }
      console.log("Database seeding complete!");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

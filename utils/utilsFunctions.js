"use server";
import { client } from "./dbFunctions";

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

export const getdatafromDb = async (query) => {
  try {
    const res = await client.query(query);
    return { status: 200, data: res.rows };
  } catch (error) {
    return { status: 404, msg: "error occurred" };
  }
};

export const getAllRealm = async () => {
  const res = await getdatafromDb(`select id ,name from realm`);
  return res;
};

export const getClientcredentials = async (realmId) => {
  try {
    const res = await client.query(
      `SELECT client_id, secret FROM client WHERE realm_id = $1 AND full_scope_allowed = $2`,
      [realmId, true]
    );
    return {status:200 , data : res.rows}
  } catch (err) {
    console.log("Error occured");
    return {status : 404 , data : "error occured"}
  }
};

import { ID } from "appwrite";
// import { createContext, useContext, useEffect, useState } from "react";
import { account } from "./config";

export async function createUserAccount({ email, password, name }) {
  try {
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    return newUserAccount;
  } catch (err) {
    console.log(err);
    return err;
  }

  //   await login(email, password);
}

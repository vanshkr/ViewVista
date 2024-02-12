import { ID } from "appwrite";
// import { createContext, useContext, useEffect, useState } from "react";
import { account, appwriteConfig, databases, avatars } from "./config";

export async function createUserAccount({ email, password, name, username }) {
  try {
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      name,
      username
    );
    if (!newUserAccount) throw new Error("User is not created");

    const avatarURL = avatars.getInitials(name);
    const response = await saveUserToDB({
      userId: newUserAccount.$id,
      name: name,
      email: email,
      username: username,
      imageURL: avatarURL,
    });
    console.log(response, "RES");
    return response;
  } catch (err) {
    return err;
  }

  //   await login(email, password);
}

export const saveUserToDB = async (newUser) => {
  try {
    const user = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      ID.unique(),
      newUser
    );
    return user;
  } catch (error) {
    return error;
  }
};

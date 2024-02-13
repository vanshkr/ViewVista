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

    const avatarURL = avatars.getInitials(name);
    const response = await saveUserToDB({
      userId: newUserAccount.$id,
      name: name,
      email: email,
      username: username,
      imageURL: avatarURL,
    });
    return response;
  } catch (err) {
    if (err.response.code === 429) {
      throw new Error(err.response.message);
    } else {
      throw new Error("Sign up failed. Please try again.");
    }
  }
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

export const signInAccount = async ({ email, password }) => {
  try {
    const userSession = await account.createEmailSession(email, password);
    console.log(userSession);
    return response;
  } catch (err) {
    if (err.response.code === 429) {
      throw new Error(err.response.message);
    } else {
      throw new Error("Sign in failed. Please try again.");
    }
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount);
  } catch (err) {
    console.log(err);
  }
};

import { ID, Query } from "appwrite";
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
    return userSession;
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
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      [Query.equal("userId", currentAccount.$id)]
    );
    return currentUser.documents[0];
  } catch (err) {
    return err;
  }
};

export const signOutAccount = async () => {
  try {
    const userSession = await account.deleteSession("current");
    return userSession;
  } catch (err) {
    if (err.response.code === 429) {
      throw new Error(err.response.message);
    } else {
      throw new Error("Sign out failed.");
    }
  }
};

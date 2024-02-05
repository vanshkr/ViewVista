import { Client, Account, Databases, Storage, Avatars } from "appwrite";

const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  userCollection: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  postColection: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  saveCollection: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

const client = new Client();
client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { appwriteConfig, client, account, databases, storage, avatars };

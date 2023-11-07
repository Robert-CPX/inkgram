import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const client = new Client();

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_MEDIA_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
  savesCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID_SAVES,
  postsCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID_POSTS,
};

client
  .setEndpoint(appwriteConfig.url) // Your API Endpoint
  .setProject(appwriteConfig.projectId); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export { ID } from 'appwrite';

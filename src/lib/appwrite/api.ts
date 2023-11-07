import { NewUser } from "@/types";
import { ID, account, appwriteConfig, avatars, databases } from "./config";
import { Query } from "appwrite";

export const createUserAccount = async (user: NewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(user.name);
    const userDocument = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
      email: newAccount.email
    });
    return userDocument
  } catch (error) {
    console.error(error);
    // return error;
  }
}

export const saveUserToDB = async (user: {
  accountId: string, name: string, username: string, imageUrl: URL, email: string
}) => {
  try {
    const userDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return userDocument;
  } catch (error) {
    console.error(error);
    // return error;
  }
}

export const signInWithEmail = async (user: { email: string, password: string }) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", currentAccount.$id)
      ]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];

  } catch (error) {
    console.error(error);
  }
}
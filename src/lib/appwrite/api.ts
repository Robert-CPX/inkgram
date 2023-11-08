import { NewPost, NewUser } from "@/types";
import { ID, account, appwriteConfig, avatars, databases, storage } from "./config";
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

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession("current");
    return session
  } catch (error) {
    console.error(error);
  }
}

export const createPost = async (post: NewPost) => {
  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;
    const filePreviewUrl = await getFilePreview(uploadedFile.$id);
    if (!filePreviewUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    };
    const tags = post.tags ? post.tags.replace(/ /g, '').split(',') : [];
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        tags,
        imageUrl: filePreviewUrl,
        imageId: uploadedFile.$id,
        location: post.location,
      }
    );
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file);
    return uploadedFile;
  } catch (error) {
    console.log(error)
  }
}

export const getFilePreview = async (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000, 2000, "top", 100);
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error)
  }
}

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: 'ok' }
  } catch (error) {
    console.log(error)
  }
}
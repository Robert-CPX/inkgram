import { NewPost, NewUser, UpdatePost } from "@/types";
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
    const filePreviewUrl = getFilePreview(uploadedFile.$id);
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

export const updatePost = async (post: UpdatePost) => {
  const hasNewFileUploaded = post.file.length > 0;
  try {
    let image = { imageId: post.imageId, imageUrl: post.imageUrl };

    if (hasNewFileUploaded) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;
      const filePreviewUrl = getFilePreview(uploadedFile.$id);
      if (!filePreviewUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      };
      image = { imageId: uploadedFile.$id, imageUrl: filePreviewUrl }
    }
    const tags = post.tags ? post.tags.replace(/ /g, '').split(',') : [];
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        tags,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
      }
    );
    if (!updatedPost) {
      await deleteFile(image.imageId);
      throw Error;
    }
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (postId: string, imageId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )
    if (imageId) await deleteFile(imageId);
    if (!statusCode) throw Error;
    return { status: 'ok' }
  } catch (error) {
    console.log(error)
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

export const getFilePreview = (fileId: string) => {
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

export const getPostById = async (postId: string) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );
    if (!post) throw Error;
    return post;
  } catch (error) {
    console.log(error)
  }
}

export const getRecentPosts = async () => {
  try {
    const recentPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(18)
      ]
    );
    if (!recentPosts) throw Error;
    return recentPosts;
  } catch (error) {
    console.log(error)
  }
}

export const likePost = async (postId: string, likesUsers: string[]) => {
  try {
    const likedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesUsers
      });
    return likedPost;
  } catch (error) {
    console.log(error)
  }
}

export const savePost = async (postId: string, userId: string) => {
  try {
    const savesPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      { post: postId, user: userId }
    )
    if (!savesPost) throw Error;

    const savedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        save: savesPost.$id
      });
    return savedPost;
  } catch (error) {
    console.log(error)
  }
}

export const deleteSavedPost = async (postId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      postId
    )
    if (!statusCode) throw Error;
    return { status: 'ok' }
  } catch (error) {
    console.log(error)
  }
}

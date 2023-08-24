import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; 
import Snackbar from 'react-native-snackbar';

type RegisterProps={
    petName: string,
    ownersName: string,
    email:string,
    address:string,
    password:string,
    // [key: string]: any,
    // [key: number]: any,
}

export const registerUser = async ({petName,ownersName,address, email,password}:RegisterProps)=>{

    try {
            const {user} = await auth().createUserWithEmailAndPassword(email,password);
            
            const userData ={
                uid: user.uid,
                petName,
                ownersName,
                email,
                address,
                password
            }
        
            {userData && 
                await firestore().collection('users').doc(user.uid).set(userData);
            }
      
    } catch (error:any) {
      
      if (error.code === 'auth/email-already-in-use') {
      return('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      return('That email address is invalid!');
    }
      console.error("registerUser:",error);
      
    }
}


export const fetchUserProfile = async (user:string) => {
  try {
    const snapShot = await firestore().collection('users').doc(user).get();
    return(snapShot.data())
  } catch (error) {
    console.error(error);
  }
}

type File ={
  uri:string | undefined,
  type:string | undefined,
}

export const savePost = async ({
  fileName,
  selectedFile,
  tagLine,
  user
}:{fileName:string,selectedFile:File,tagLine:string,user:string}) => {
  try {

    // {tagLine === "" ? tagLine="No TagLine Required!!!":tagLine}

    const postData = {
      fileName,
      type:selectedFile.type,
      uri:selectedFile.uri,
      tagLine,
      user,
    }
    
    const storageRef = storage().ref().child(`posts/${postData.fileName}`);

    if (postData.uri) {
      await storageRef.putFile(postData.uri)
      const downloadUrl = await storageRef.getDownloadURL();

      const userPostsDoc = firestore().collection('posts').doc(postData.user);
      await firestore().runTransaction(async(transaction)=>{
        const userDocSnap = await transaction.get(userPostsDoc);
        const userPosts = userDocSnap.data()?.posts || [];
        userPosts.push({
          fileName:postData.fileName,
          tagLine:postData.tagLine,
          user:postData.user,
          downloadUrl,
          fileType:postData.type,
          // createdAt: firestore.FieldValue.serverTimestamp(),
        });
        if (!userDocSnap.exists) {
          transaction.set(userPostsDoc, { posts: userPosts });
        } else {
          transaction.update(userPostsDoc, { posts: userPosts });
        }
      })
    }

  } catch (error) {
    Snackbar.show({text:`Error:${error}`,duration:Snackbar.LENGTH_LONG})
  }
}

export const getAllPosts = async () => {
    try {
      const snapshot = await firestore().collection('posts').limit(10).get();
      const posts = snapshot.docs.map((doc)=> doc.data());
      const extractedPosts = posts.flatMap((response) => response.posts);
        // console.log(extractedPosts);
      return extractedPosts;
      }
      catch (error) {
      Snackbar.show({text:`Error in getting all posts:${error}`,duration:Snackbar.LENGTH_LONG});
      return [];
    }
}
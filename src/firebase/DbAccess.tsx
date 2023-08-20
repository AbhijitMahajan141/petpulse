import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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

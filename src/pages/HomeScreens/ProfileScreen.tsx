import { Pressable, Text, TextInput, View, ScrollView,KeyboardAvoidingView,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import { Logo, constantStyles } from '../../constants';
import { useDispatch,useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setLoading } from '../../redux/reducers/loadingSlice';
import { setUser } from '../../redux/reducers/usersSlice';

const ProfileScreen = () => {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state:RootState) => state.user.user);
  const loading = useSelector((state:RootState) => state.loading.loading);
  const [userProfile, setUserProfile] = useState<FirebaseFirestoreTypes.DocumentData>();

  const handleLogout = async () =>{
    await auth().signOut();
    dispatch(setUser(null));
  }

  const handleUpdate = async () =>{
    console.log(userProfile);
  }

  useEffect(()=>{
    dispatch(setLoading(true));
    const getProfile = async () => {
      if(user){
        const snapShot = await firestore().collection('users').doc(user).get();
        setUserProfile(snapShot.data());
        dispatch(setLoading(false));
      }else{
        Snackbar.show({text:"User Not Found! Please Login.",duration:Snackbar.LENGTH_LONG});
        dispatch(setLoading(false));
      }
      
    }
    getProfile();
  },[])


  return (
    <KeyboardAvoidingView style={[constantStyles.container,{justifyContent:"space-evenly"}]} behavior="padding">
      <Logo/>
      <View style={[constantStyles.formContainer,constantStyles.formColor]}>
        {loading ? <ActivityIndicator size="large" /> : 
        <>
        <Text style={[constantStyles.pureWhite,{margin:5,fontSize:25}]} >Your Profile</Text>
        <Text style={constantStyles.text}>Pet's Name</Text>
        <TextInput value={userProfile && userProfile.petName} style={[constantStyles.textInput,{width:"80%"}]} />
        <Text style={constantStyles.text}>Owner's Name</Text>
        <TextInput value= {userProfile && userProfile.ownersName} style={[constantStyles.textInput,{width:"80%"}]}/>
        <Text style={constantStyles.text}>Email </Text>
        <TextInput value={userProfile && userProfile.email} style={[constantStyles.textInput,{width:"80%"}]} />
        <Text style={constantStyles.text}>Address </Text>
        <TextInput value={userProfile && userProfile.address} style={[constantStyles.textInput,{width:"80%"}]}/>
        {/* <Text style={constantStyles.text}>Password: {userProfile && userProfile.password}</Text> */}
        <Pressable disabled={true} onPress={handleUpdate} style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor,{marginBottom:10}]}>
          <Text style={constantStyles.brownColor}>Update</Text>
        </Pressable>
      </>
      }
      </View>
      <Pressable onPress={handleLogout} style={[constantStyles.buttonContainer,{backgroundColor:"tomato"}]}>
        <Text style={constantStyles.pureWhite}>Logout</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default ProfileScreen
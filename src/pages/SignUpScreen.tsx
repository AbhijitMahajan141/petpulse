import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Snackbar from 'react-native-snackbar';
import { registerUser } from '../firebase/DbAccess';
import { Validator } from '../components/Validator';
import { constantStyles } from '../constants';
import { useDispatch,useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setLoading } from '../redux/reducers/loadingSlice';

const SignUpScreen = ({navigation}:any) => {

  const loading = useSelector((state:RootState) => state.loading.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [petName,setPetName] = useState("");
  const [ownersName,setOwnersName] = useState("");
  const [address,setAddress] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [errorText,setErrorText] = useState("");

  const handleSigninPress = () =>{
    navigation.navigate("Signin");
  }

  const handleSignup = () =>{
    setErrorText("");
    dispatch(setLoading(true));
    if(petName && ownersName && address && email && password && confirmPassword){
      if(password === confirmPassword){
        const userData = {petName,ownersName,address,email,password}
        const valid = Validator(userData);
        if(valid === true){
          registerUser(userData).then((message)=>{
            message && setErrorText(message);
            dispatch(setLoading(false));
          })
        }else{
          dispatch(setLoading(false));
          setErrorText(valid);
        }
      }else{
        dispatch(setLoading(false));
        Snackbar.show({
          text: 'Password does not match.',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }else{
      dispatch(setLoading(false));
      Snackbar.show({
        text: 'Please Fill all Fields.',
        duration: Snackbar.LENGTH_LONG,
    });
    }
  }

  return (
    <View style={constantStyles.container}>
      <Text style={constantStyles.logo}>PetPulse</Text>
      <Image source={require('../assets/cat.png')} style={{width:150,height:150}} resizeMode="center" />
      <Text style={constantStyles.text}>Sign-up to get started...</Text>
      <View style={[constantStyles.formContainer,constantStyles.formColor]} >
        <Text style={[constantStyles.formText,{fontSize:30}]}>Signup</Text>
       
        <ScrollView style={styles.form}>
          <Text style={constantStyles.formText}>Pet's Name</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setPetName} value={petName} placeholder='Eg. Chubs' />
          <Text style={constantStyles.formText}>Owner's Name</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setOwnersName} value={ownersName} placeholder='Eg. John Doe' />
          <Text style={constantStyles.formText}>Address</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setAddress} value={address} placeholder='Eg. your address here.' />
          <Text style={constantStyles.formText}>Email</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setEmail} value={email} placeholder='Eg. johndoe@gmail.com' />
          <Text style={constantStyles.formText}>Password</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setPassword} value={password} placeholder='Eg. john@123' secureTextEntry />
          <Text style={constantStyles.formText}>Confirm Password</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setConfirmPassword} value={confirmPassword} placeholder='Eg. john@123' secureTextEntry />
        </ScrollView>
        {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        <Pressable style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor]} onPress={handleSignup}>
          {loading ? <ActivityIndicator size={'small'} /> : <Text style={[constantStyles.pureWhite,{fontWeight:"700"}]}>Sign me up</Text>}
        </Pressable>
        <Text style={{marginBottom:10}}>
          Already have an account?
          <Pressable onPress={handleSigninPress}> 
             <Text style={[constantStyles.pureWhite,{fontSize:15}]}> Sign-in</Text> 
           </Pressable> 
        </Text>
        
      </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  
  form:{
    width:"80%",
    height:"40%",
    display:"flex",
    marginTop:10
  },
  errorText:{
    color:"red",
    marginTop:10,
    marginHorizontal:20
  }
})
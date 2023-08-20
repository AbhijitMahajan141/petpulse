import { StyleSheet, Text, TextInput, View,KeyboardAvoidingView, Pressable,BackHandler, Image, Platform,ActivityIndicator,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar'
import auth from '@react-native-firebase/auth';
import { Logo, constantStyles } from '../constants';
import { useDispatch,useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setLoading } from '../redux/reducers/loadingSlice';

const SignInScreen = ({navigation}:any) => {
  
  const loading = useSelector((state:RootState) => state.loading.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  useFocusEffect(() => {
    const onBackPress = () => {
      // Navigate to a different screen instead of allowing the back action
      navigation.navigate('Signin'); // Replace 'Home' with the screen you want to navigate to
      return true; // Prevent default back behavior
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });

  const handleSignupPress = () =>{
    navigation.navigate("Signup")
  }

  const handleSignin = async () => {
    dispatch(setLoading(true));
    if(email && password){
      try {
        await auth().signInWithEmailAndPassword(email,password);
        dispatch(setLoading(false));
      } catch (error:any) {
        dispatch(setLoading(false));
        if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
          Snackbar.show({
          text: "Invalid Email or Password.",
          duration: Snackbar.LENGTH_SHORT,
        });  
        }else if(error.code === 'auth/user-not-found'){
          Snackbar.show({
          text: "User not found. Please Signup first.",
          duration: Snackbar.LENGTH_SHORT,
        });  
        }
        else{
          Snackbar.show({
            text: `Log-in Error: ${error}`,
            duration: Snackbar.LENGTH_SHORT,
          });  
        }
      }

    }else{
      dispatch(setLoading(false));
      Snackbar.show({
      text: 'Please enter email and password.',
      duration: Snackbar.LENGTH_SHORT,
    });
    }
    
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={constantStyles.container}>
      {/* <Text style={styles.logo}>PetPulse</Text> */}
      <Logo/>
      <Image source={require('../assets/puppy.png')} style={{width:150,height:150}} resizeMode="center" />
      <Text style={constantStyles.text}>Login for your daily dose of Serotonin...</Text>
      <View style={[constantStyles.formContainer,constantStyles.formColor]}>
        <Text style={[constantStyles.formText,{fontSize:30}]}>Login</Text>
        <ScrollView style={styles.form}>
          <Text style={constantStyles.formText}>Email</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setEmail} value={email} placeholder='Eg. johndoe@gmail.com' />
          <Text style={constantStyles.formText}>Password</Text>
          <TextInput style={constantStyles.textInput} onChangeText={setPassword} value={password} placeholder='Eg. john@123' secureTextEntry />
        </ScrollView>
        <Pressable style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor]} onPress={handleSignin}>
          {loading ? <ActivityIndicator size={"small"} /> :<Text style={[constantStyles.pureWhite,{fontWeight:"700"}]}>Log me In</Text>}
        </Pressable>
        <Text style={{margin:10}}>
          Don't have an account?
          <Pressable onPress={handleSignupPress}>
            <Text style={[constantStyles.pureWhite,{fontSize:15}]}> Sign-up</Text>
          </Pressable>
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({

  form:{
    width:"80%",
    height:"auto",
  },
  
})
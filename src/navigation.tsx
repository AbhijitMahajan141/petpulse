import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './pages/WelcomeScreen';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignUpScreen';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import BottomTabNavigator from './components/BottomTabNavigator';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from './redux/reducers/usersSlice';
import { RootState, AppDispatch } from './redux/store';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const user = useSelector((state:RootState) => state.user.user)
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const unSubscribe = auth().onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(setUser(authUser.uid));
      }else{
        dispatch(setUser(null));
      }
    })
    return () => unSubscribe();
  },[dispatch])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
         {user === null &&  
          <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }}/>}
         {!user ?
             <Stack.Group screenOptions={{ headerShown: false }}>  
                <Stack.Screen name="Signin" component={SignInScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }}/>
            </Stack.Group> 
            :
            <Stack.Group>
                <Stack.Screen name='Home' component={BottomTabNavigator} options={{headerShown: false}} />
            </Stack.Group>
         }
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation


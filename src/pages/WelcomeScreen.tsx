import { Image, Text, View } from 'react-native'
import React,{useEffect,useContext} from 'react'
import auth from '@react-native-firebase/auth'
import { Logo, constantStyles } from '../constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/usersSlice';


const WelcomeScreen = ({navigation}:any) => {
    const dispatch = useDispatch();
    const user = auth().currentUser;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user === null) {
                
                navigation.navigate('Signin');
                
            } else if (user) {
               dispatch(setUser(user.uid));
                navigation.navigate('Home');
            }
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
  }, [user, navigation]);

  return (
    <View style={constantStyles.container}>
        {/* <Text style={styles.logo}>PetPulse</Text> */}
        <Logo/>
        <Image source={require('../assets/pets.png')} style={{width:"90%",height:"50%"}} resizeMode="center" />
        <Text style={constantStyles.text}>With Great Cuteness comes Great Care.</Text>
    </View>
  )
}

export default WelcomeScreen

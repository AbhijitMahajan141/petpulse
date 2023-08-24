import { Image,StyleSheet } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../pages/HomeScreens/ProfileScreen';
import ViewScreen from '../pages/HomeScreens/ViewScreen';
import CareScreen from '../pages/HomeScreens/CareScreen';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {

    const theme = useTheme();
    theme.colors.secondaryContainer = "transperent";
    return (
    <Tab.Navigator 
        activeColor='#8D6E63'
        // inactiveColor='#fff'
        initialRouteName='View' 
        shifting={true} 
        barStyle={styles.tabBar}
        >
        <Tab.Screen 
            name='View' 
            component={ViewScreen} 
            options={{
                title:"Cerotonin",
                // tabBarLabel:"View",
                
                tabBarIcon:({focused})=>(
                    <Image source={require("../assets/dogicon.png")} alt='Dog Icon' style={focused?styles.tabIconFocused:styles.tabIcon} />
                ),
                
            }}  
        />

        <Tab.Screen 
            name='Care' 
            component={CareScreen} 
            options={{
                title:"Care",
                tabBarIcon:({focused})=>(
                    <Image source={require("../assets/care.png")} alt='Dog Icon' style={focused?styles.tabIconFocused:styles.tabIcon} />
                ),

            }} 
                
        />
       
        <Tab.Screen 
            name='Profile'
            component={ProfileScreen} 
            options={{
                title:"Profile",
                tabBarIcon:({focused})=>(
                    <Image source={require("../assets/profile.png")} alt='Dog Icon' style={focused?styles.tabIconFocused:styles.tabIcon} />
                ),
                
            }} 
            />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar:{
        alignSelf:"center",
        width:"100%",
        backgroundColor:"#FFF8E1"
    },
    tabIcon: {
        width: 30,
        height: 30,
    },
    tabIconFocused:{
        width: 35,
        height: 35,
        
  }
})
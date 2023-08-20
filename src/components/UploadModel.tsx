import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { Logo, constantStyles } from '../constants'

const UploadModel = () => {
  return (
    <View style={styles.container}>
      <Logo logoSize={30} />
      <View>
        <Text style={[constantStyles.text,{textAlign:"center",fontSize:15}]}>
          Share some wonderful moments of your pets with everyone.
        </Text>
      </View>
    </View>
  )
}

export default UploadModel

const styles = StyleSheet.create({
 container:{
    width:"100%",
    height:"auto",
    // backgroundColor:"#FFF8E1",
    display:'flex',
    alignItems:"center",
    justifyContent:"center"
  },
})
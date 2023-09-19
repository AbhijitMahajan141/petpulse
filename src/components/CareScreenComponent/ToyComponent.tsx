import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { toys } from '../../data'
import { constantStyles } from '../../constants'

const ToyComponent = ({imageHeight}:any) => {
  return (
    <ScrollView >
        {toys.map((toy) => (
          <View key={toy.id} style={styles.card}>
            <Text style={[{padding:5},constantStyles.pureWhite]}>{toy.name}</Text>
            <Image source={toy.image} alt={`${toy.name}`} style={{width:"100%",height:imageHeight,backgroundColor:"white"}} resizeMode='contain' />
            <View style={{alignSelf:"flex-start", paddingHorizontal:10,paddingVertical:5}}>
                <Text style={[constantStyles.primaryText,{fontWeight:"300"}]} >{toy.desc}</Text>
                <Text style={constantStyles.primaryText}>₹ {toy.price}</Text>
                <Text style={constantStyles.primaryText}>{toy.paws}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  )
}

export default ToyComponent

const styles = StyleSheet.create({
    card:{
        backgroundColor: "#2f2f2f",
        margin:4, 
        borderRadius:10,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        elevation:5
    }
})
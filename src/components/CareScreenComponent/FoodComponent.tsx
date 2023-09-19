import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { food } from '../../data'
import { constantStyles } from '../../constants'

const FoodComponent = ({imageHeight}:any) => {
  return (
    <ScrollView >
        {food.map((f) => (
          <View key={f.id} style={styles.card}>
            <Text style={[{padding:5},constantStyles.pureWhite]}>{f.name}</Text>
            <Image source={f.image} alt={`${f.name}`} style={{width:"100%",height:imageHeight,backgroundColor:"white"}} resizeMode='contain' />
            <View style={{alignSelf:"flex-start", paddingHorizontal:10,paddingVertical:5}}>
                <Text style={[constantStyles.primaryText,{fontWeight:"300"}]} >{f.desc}</Text>
                <Text style={constantStyles.primaryText}>₹ {f.price}</Text>
                <Text style={constantStyles.primaryText}>{f.paws}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  )
}

export default FoodComponent

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
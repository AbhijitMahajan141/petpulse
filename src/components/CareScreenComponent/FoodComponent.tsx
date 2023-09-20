import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { food } from '../../data'
import { constantStyles } from '../../constants'

const FoodComponent = ({imageHeight}:any) => {
  return (
    <ScrollView >
        {food.map((f) => (
          <View key={f.id} style={styles.card}>
            <Text style={[{padding:5,fontSize:18},constantStyles.pureWhite]}>{f.name}</Text>
            <Image source={f.image} alt={`${f.name}`} style={{width:"100%",height:imageHeight,backgroundColor:"white"}} resizeMode='contain' />
            <View style={{width:"100%",alignSelf:"flex-start", paddingHorizontal:10,paddingVertical:5}}>
              <Text style={[constantStyles.primaryText,{fontWeight:"300"}]} >{f.desc}</Text>
                <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                  <View>
                  <Text style={constantStyles.greenColor}>₹ {f.price}</Text>
                  <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <Text style={[constantStyles.goldenColor,{marginRight:5}]}>{f.paws}</Text>
                    <Image source={require('../../assets/star.png')} alt='Rating' style={{width:25,height:25}} />
                  </View>
                  </View>
                  <View>
                  <Pressable style={[constantStyles.greenBgColor,{paddingHorizontal:20,paddingVertical:10,borderRadius:5}]} >
                    <Text style={constantStyles.pureWhite}>Buy</Text>
                  </Pressable>
                  </View>
                </View>
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
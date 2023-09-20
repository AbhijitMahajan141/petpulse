import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { vets } from '../../data'
import { constantStyles } from '../../constants'

const VetComponent = () => {
  return (
    <ScrollView>
      {vets.map((vet) => (
          <View key={vet.id} style={styles.card}>
            <Image source={vet.img} alt={`${vet.name}`} style={styles.image} resizeMode='contain' />
            <View style={{width:"70%",margin:5,rowGap:5}}>
              <View style={styles.iconLayout}>
                <Image source={require('../../assets/clinic.png')} alt='Name' style={{width:20,height:20}} />
                <Text style={[constantStyles.pureWhite]}>{vet.name}</Text>
              </View>
              <View style={styles.iconLayout}>
                <Image source={require('../../assets/address.png')} alt='Name' style={{width:20,height:20}} />
                <Text style={[constantStyles.primaryText,{fontWeight:"300",fontSize:14}]} >{vet.address}</Text>
              </View>
              <View style={styles.iconLayout}>
                <Image source={require('../../assets/phone.png')} alt='Name' style={{width:20,height:20}} />
                <Text style={[constantStyles.primaryText,{fontWeight:"300",fontSize:12}]} >{vet.contact}</Text>
              </View>
              <Pressable style={[constantStyles.greenBgColor,{paddingHorizontal:20,paddingVertical:10,borderRadius:5}]} >
                <Text style={[constantStyles.pureWhite,{textAlign:"center"}]}>Book Appointment</Text>
              </Pressable>
            </View>
          </View>
        ))}
    </ScrollView>
  )
}

export default VetComponent

const styles = StyleSheet.create({
  card:{
        // width:"100%",
        backgroundColor: "#2f2f2f",
        margin:5,
        padding:5,
        borderRadius:10,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        elevation:5
    },
    image:{
      width:100,
      height:"95%",
      backgroundColor:"white",
      borderRadius:5
    },
    iconLayout:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      columnGap:5
    }
})
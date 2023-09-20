import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Logo, constantStyles } from '../../constants'
import ToyComponent from '../../components/CareScreenComponent/ToyComponent';
import FoodComponent from '../../components/CareScreenComponent/FoodComponent';
import VetComponent from '../../components/CareScreenComponent/VetComponent';

const SCREEN_HEIGHT = Dimensions.get('window').height - 200;
const imageHeight = (Dimensions.get('window').height /4);

enum Buttons {
  vet,
  toy,
  food,
  consultant
}

const CareScreen = () => {

  const [button,setButton] = useState(Buttons.toy);

  return (
    <View style={[constantStyles.container,{justifyContent:"flex-start"}]}>
      <View>
        <Logo logoSize={30}/>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          onPress={() => setButton(Buttons.vet)}
          style={[constantStyles.buttonContainer, constantStyles.goldenBackgroundColor,
            button === Buttons.vet && {backgroundColor:"#dbb702"}]}
        >
          <Text style={constantStyles.pureWhite}>Vets</Text>
        </Pressable>
        <Pressable
          onPress={() => setButton(Buttons.toy)}
          style={[constantStyles.buttonContainer, constantStyles.goldenBackgroundColor,
            button === Buttons.toy && {backgroundColor:"#dbb702"}]}
        >
          <Text style={constantStyles.pureWhite}>Toys</Text>
        </Pressable>
        <Pressable
          onPress={() => setButton(Buttons.food)}
          style={[constantStyles.buttonContainer, constantStyles.goldenBackgroundColor,
            button === Buttons.food && {backgroundColor:"#dbb702"}]}
        >
          <Text style={constantStyles.pureWhite}>Food</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => setButton(Buttons.consultant)}
          style={[constantStyles.buttonContainer, constantStyles.goldenBackgroundColor,
            button === Buttons.consultant && {backgroundColor:"#dbb702"}]}
        >
          <Text style={constantStyles.pureWhite}>Consultant</Text>
        </Pressable> */}
      </View>
      <View style={{margin:10,width:"95%",height:SCREEN_HEIGHT}}>
          {button === Buttons.vet && <VetComponent/>}
          {button === Buttons.toy && <ToyComponent imageHeight={imageHeight} />}
          {button === Buttons.food && <FoodComponent imageHeight={imageHeight} />}
      </View>
    </View>
  )
}

export default CareScreen

const styles = StyleSheet.create({
  btnContainer:{
    columnGap:10,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",

  }
})
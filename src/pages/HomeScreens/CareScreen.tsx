import { Pressable, StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Logo, constantStyles } from '../../constants'
import VetComponent from '../../components/CareScreenComponent/VetComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ProductsComponent from '../../components/CareScreenComponent/ProductsComponent';
import { food, toys } from '../../data';
import { ModalComponent } from '../../components/ModalComponent';
import Snackbar from 'react-native-snackbar';
import CartModal from '../../components/CareScreenComponent/CartModal';

const SCREEN_HEIGHT = Dimensions.get('window').height - 200;
const imageHeight = (Dimensions.get('window').height /4);

enum Buttons {
  vet,
  toy,
  food,
  consultant
}

const CareScreen = () => {

  // const cart = useSelector((state:RootState) => state.cart.items);
  const itemsInCart = useSelector((state:RootState) => state.cart.items.length);

  const [button,setButton] = useState(Buttons.toy);

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    Snackbar.show({text:"Order Has Been Placed!!!",duration:Snackbar.LENGTH_LONG});  
    setModalVisible(false);
  };

  return (
    <View style={[constantStyles.container,{justifyContent:"flex-start"}]}>
      <View style={styles.topSection}>
        <Logo logoSize={30}/>
        <Pressable 
        onPress={()=>setModalVisible(true)}
        style={styles.cartContainer}
        >
          <Text style={styles.cartCount}>{itemsInCart}</Text>
          <Image source={require('../../assets/cart.png')} alt='Cart' style={{width:35,height:35}} />
        </Pressable>
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
          {button === Buttons.toy && <ProductsComponent imageHeight={imageHeight} data={toys} />}
          {button === Buttons.food && <ProductsComponent imageHeight={imageHeight} data={food}/>}
      </View>

      <ModalComponent
        children={<CartModal closeModal={closeModal} />} 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
      />

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
  },
  topSection:{
    width:"95%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    // marginTop:10,
  },
  cartContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    position:"relative"
  },
  cartCount:{
    alignSelf:"flex-end",
    backgroundColor:"#2f2f2f",
    color:"#f3f3f3",
    borderRadius:20,
    paddingHorizontal:5,
    position:"absolute",
    zIndex:1
  }
})
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { constantStyles } from '../../constants';
import { clearCart } from '../../redux/reducers/cartSlice';

interface UploadModelProps {
  closeModal: () => void;
}

const CartModal = ({closeModal}:UploadModelProps) => {

    const cart = useSelector((state:RootState) => state.cart.items);
    const cartCount = useSelector((state:RootState) => state.cart.items.length);
    const loading = useSelector((state:RootState) => state.loading.loading);
    const dispatch = useDispatch<AppDispatch>();

    const handleCheckout = () => {}

    const handleClearCart = () => {
        dispatch(clearCart());
    }

  return (
    <View style={styles.container}>
        <Text style={[constantStyles.goldenColor,{fontSize:25}]}>Your Cart</Text>
        <View 
            style={[styles.itemsContainer,
                {flexDirection:"column",backgroundColor:"#fff8e1",padding:10,borderRadius:10}]}>
        
        {
            cartCount > 0 ?
            (
                <>
                <View style={styles.itemsContainer}>
                    <Text style={[styles.headerText,constantStyles.brownColor]}>Name</Text>
                    <Text style={[styles.headerText,constantStyles.brownColor]}>Amount</Text>
                    <Text style={[styles.headerText,constantStyles.brownColor]}>Quantity</Text>
                </View>
                <View style={[styles.itemsContainer,{flexDirection:"column"}]}>
                    {cart.map((item)=>(
                    <View key={item.id} style={styles.itemsContainer}>
                        <Text style={[constantStyles.brownColor,{width:"20%",maxWidth:"33%"}]}>{item.name}</Text>
                        <Text style={[{width:"25%"},constantStyles.brownColor]}>{item.price}</Text>
                        <Text style={[{width:"10%"},constantStyles.brownColor]}>{item.quantity}</Text>
                    </View>
                    ))}

                    <View style={styles.itemsContainer}>
                        <Text style={constantStyles.brownColor}>Total</Text>
                        <Text style={constantStyles.brownColor}>{}</Text>
                        <Text style={constantStyles.brownColor}>{}</Text>
                    </View>

                    <View style={{display:"flex",flexDirection:"row",columnGap:20}}>
                        <Pressable style={[constantStyles.buttonContainer,constantStyles.greenBgColor]} onPress={handleCheckout} >
                            {loading ? 
                                <ActivityIndicator size="small"/> 
                                : 
                                <Text 
                                    style={[constantStyles.pureWhite,{fontWeight:"600",alignSelf:"center"}]}
                                >Checkout</Text> }
                        </Pressable>
                        <Pressable style={[constantStyles.buttonContainer,constantStyles.tomatoBackgroundColor]} onPress={handleClearCart} >
                            <Text 
                                style={[constantStyles.pureWhite,{fontWeight:"600",alignSelf:"center"}]}
                            >Clear Cart</Text>
                        </Pressable>
                    </View>
                </View>
                </>
            )
            :
            (<Text style={[styles.headerText,constantStyles.brownColor,{textAlign:"center"}]}>Your Cart is Empty. Lets Buy Something!</Text>)
        }
        </View>
    </View>
  )
}

export default CartModal

const styles = StyleSheet.create({
    container:{
        width:"95%",
        height:"90%",
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
        // padding:10,
        rowGap:10
    },
    itemsContainer:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        rowGap:10
    },
    headerText:{
        fontSize:20,
        fontWeight:'500'
    }
})
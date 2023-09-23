import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { constantStyles } from '../../constants';
import { clearCart, updateCartItemQuantity } from '../../redux/reducers/cartSlice';
import { setLoading } from '../../redux/reducers/loadingSlice';
import Snackbar from 'react-native-snackbar';

interface UploadModelProps {
  closeModal: () => void;
}

const CartModal = ({closeModal}:UploadModelProps) => {

    const cart = useSelector((state:RootState) => state.cart.items);
    const cartCount = useSelector((state:RootState) => state.cart.items.length);
    const loading = useSelector((state:RootState) => state.loading.loading);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const totalQuantity = cart.reduce((totalQ, item) => totalQ + item.quantity, 0);
    // const totalQuantity = ;
    const dispatch = useDispatch<AppDispatch>();

    const handleCheckout = () => {
        dispatch(setLoading(true));
        setTimeout(()=>{
            
            dispatch(setLoading(false));
            dispatch(clearCart());
            closeModal();
        },3000)
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const handleQuantity = (itemId:number,quantity:number) =>{
        dispatch(updateCartItemQuantity({itemId,quantity}));
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
                        <Text style={[constantStyles.brownColor,{width:"25%",maxWidth:"33%"}]}>{item.name}</Text>
                        <Text style={[{width:"15%"},constantStyles.brownColor]}>{item.price}</Text>
                        <View style={styles.quantityUpdaters}>
                            <Pressable style={styles.updater} onPress={()=>handleQuantity(item.id,item.quantity-1)} >
                            <Text 
                                style={[constantStyles.pureBlack,{alignSelf:"center"}]}
                            >-</Text>
                            </Pressable>
                            <Text style={[{width:"10%",marginHorizontal:5},constantStyles.brownColor]}>{item.quantity}</Text>
                            <Pressable style={[styles.updater,{borderRightWidth:0,borderLeftWidth:1,}]} onPress={()=>handleQuantity(item.id,item.quantity+1)} >
                            <Text 
                                style={[constantStyles.pureBlack,{alignSelf:"center"}]}
                            >+</Text>
                        </Pressable>
                        </View>
                    </View>
                    ))}
                    <View style={{width:"99%",height:1, backgroundColor:"#000"}}/>
                    <View style={styles.itemsContainer}>
                        <Text style={[constantStyles.brownColor,{width:"20%",maxWidth:"33%"}]}>Total</Text>
                        <Text style={[{width:"25%"},constantStyles.brownColor]}>{totalPrice}</Text>
                        <Text style={[{width:"10%"},constantStyles.brownColor]}>{totalQuantity}</Text>
                    </View>

                    <View style={{display:"flex",flexDirection:"row",columnGap:20}}>
                        <Pressable style={[constantStyles.buttonContainer,constantStyles.greenBgColor]} onPress={handleCheckout} >
                            {loading ? 
                                <ActivityIndicator size="small"  /> 
                                : 
                                <Text 
                                    style={[constantStyles.pureWhite,{fontWeight:"600",alignSelf:"center"}]}
                                >Checkout</Text> 
                            }
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
    },
    quantityUpdaters:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    updater:{
        width:20,
        height:20,
        borderRightWidth:1,
        // marginRight:5
    },
})
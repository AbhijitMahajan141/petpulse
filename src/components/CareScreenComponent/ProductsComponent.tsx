import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { food } from '../../data'
import { constantStyles } from '../../constants'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { addToCart } from '../../redux/reducers/cartSlice'
import Snackbar from 'react-native-snackbar'

interface productType {
  id:number,
  name:string,
  price:number,
  quantity?:number,
}

interface dataType {
    
}

type ProductProps = {
    imageHeight:any,
    data:{id:number,name:string,image:any,desc:string,price:number,paws:number}[],
}

const ProductsComponent = ({imageHeight,data}:ProductProps) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleBuy = (f:productType) => {
    dispatch(addToCart({id:f.id,name:f.name,price:f.price,quantity:1}));
    Snackbar.show({
          text: 'Item Added to Cart!',
          duration: Snackbar.LENGTH_LONG,
        });
  }

  return (
    <ScrollView >
        {data.map((f) => (
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
                  <Pressable style={[constantStyles.greenBgColor,{paddingHorizontal:20,paddingVertical:10,borderRadius:5}]} 
                    onPress={()=>handleBuy(f)}>
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

export default ProductsComponent

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
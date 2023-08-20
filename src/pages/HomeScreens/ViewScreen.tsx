import { StyleSheet, Text, View,BackHandler, Pressable, Image, Modal } from 'react-native'
import React,{useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import PostsSection from '../../components/PostsSection';
import ShortsSection from '../../components/ShortsSection';
import UploadModel from '../../components/UploadModel';
import { Logo, constantStyles } from '../../constants';

const ViewScreen = ({navigation}:any) => {

    useFocusEffect(() => {
    const onBackPress = () => {
      // Navigate to a different screen instead of allowing the back action
      navigation.navigate('Home'); // Replace 'Home' with the screen you want to navigate to
      return true; // Prevent default back behavior
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [button,setButton] = useState("posts");

  return (
    <View style={[constantStyles.container,{justifyContent:"flex-start"}]}>
      <View style={styles.topSection}>
        <Logo logoSize={30}/>
        <Pressable onPress={()=>setModalVisible(true)}>
          <Image 
            source={require("../../assets/upload.png")} 
            style={{width:35,height:35}} />
        </Pressable>
      </View>
      
      <View style={[styles.topSection,styles.buttonSection]}>
        <Pressable
          onPress={()=>setButton("posts")} 
          style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor,
            button === "posts" && {elevation:5,shadowColor: '#000000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5,}]}>
              <Text style={constantStyles.secondaryText}>Posts</Text>
            {/* <Image source={require("../../assets/camera.png")} style={{width:50,height:50}}/> */}
        </Pressable>
        <Pressable 
          onPress={()=>setButton("shorts")}
          style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor,
            button === "shorts" && {elevation:5,shadowColor: '#000000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5,}]}
          >
            <Text style={constantStyles.secondaryText}>Shorts</Text>
            {/* <Image source={require("../../assets/reels.png")} style={{width:50,height:50}} /> */}
        </Pressable>
      </View>
      
      <View style={styles.mainSection}>
        { button === "posts" && <PostsSection/> }
        { button === "shorts" && <ShortsSection/> }
      </View>

      <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView,constantStyles.formColor]}>
              <UploadModel/>
              <Pressable
                style={[constantStyles.buttonContainer, constantStyles.tomatoBackgroundColor]}
                onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={constantStyles.pureWhite}>Close</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
      </View>
    </View>
  )
}

export default ViewScreen

const styles = StyleSheet.create({
  
  topSection:{
    width:"95%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginTop:10,
  },
  buttonSection:{
    justifyContent:"center",
    columnGap:10
  },
  mainSection:{
    height:"100%",
    marginTop:10,
    borderRadius:5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    display:"flex",
    justifyContent:"space-between",
    width:"90%",
    height:"95%",
    padding:10,
    borderRadius: 10,
    // padding: 35,
    alignItems: 'center',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },

})
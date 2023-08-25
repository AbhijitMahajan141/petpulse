import { StyleSheet, Text, View, Pressable, Image, Modal } from 'react-native'
import React,{useState} from 'react'
import PostsSection from '../../components/PostsSection';
import ShortsSection from '../../components/ShortsSection';
import UploadModel from '../../components/UploadModel';
import { Logo, constantStyles } from '../../constants';
import Snackbar from 'react-native-snackbar';
// import { BackHandle } from '../../components/BackHandler';

const ViewScreen: React.FC = () => {

  //  BackHandle({navigation});

  const [modalVisible, setModalVisible] = useState(false);
  const [button,setButton] = useState("posts");

  const closeModal = () => {
    setModalVisible(false);
    Snackbar.show({text:"Post Uploaded Successfully!",duration:Snackbar.LENGTH_LONG}); 
  };

  return (
    <View style={[constantStyles.container,{justifyContent:"flex-start"}]}>
      <View style={styles.topSection}>
        <Logo logoSize={30}/>
        <Pressable onPress={()=>setModalVisible(true)}>
          <Image 
            source={require("../../assets/upload.png")} 
            style={{width:40,height:40}} />
        </Pressable>
      </View>
      
      <View style={[styles.topSection,styles.buttonSection]}>
        <Pressable
          onPress={()=>setButton("posts")} 
          style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor,{borderBottomEndRadius:0,borderTopEndRadius:0},
            button === "posts" && {backgroundColor:"#dbb702"}]}> 
            {/* ,shadowColor: '#000000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, dbb702*/}
              <Text style={button === "posts" ? constantStyles.pureWhite : constantStyles.secondaryText}>Posts</Text>
            {/* <Image source={require("../../assets/camera.png")} style={{width:50,height:50}}/> */}
        </Pressable>
        <Pressable 
          onPress={()=>setButton("shorts")}
          style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor,{borderBottomStartRadius:0,borderTopStartRadius:0},
            button === "shorts" && {backgroundColor:"#dbb702"}]}
          >
            <Text style={button === "shorts" ? constantStyles.pureWhite : constantStyles.secondaryText}>Shorts</Text>
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
              <UploadModel closeModal={closeModal} />
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
    // marginTop:10,
  },
  buttonSection:{
    justifyContent:"center",
    columnGap:1
  },
  mainSection:{
    height:"85%",
    width:"95%",
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
    width:"95%",
    height:"98%",
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
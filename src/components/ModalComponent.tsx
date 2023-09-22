// import { Children } from "react";
import React, { useState } from "react";
import { Modal, StyleSheet, View,Pressable, Text } from "react-native";
import Snackbar from "react-native-snackbar";
import { constantStyles } from "../constants";

export const ModalComponent = ({children,modalVisible,setModalVisible}:any) =>{

    // const [modalVisible, setModalVisible] = useState(false);

    // const closeModal = () => {
    //     setModalVisible(false);
    //     Snackbar.show({text:"Post Uploaded Successfully!",duration:Snackbar.LENGTH_LONG}); 
    // };
return(
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
              {children}
              <Pressable
                style={[constantStyles.buttonContainer, constantStyles.tomatoBackgroundColor]}
                onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={constantStyles.pureWhite}>Close</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
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
    }
})

import { StyleSheet, Text, View } from 'react-native'

type logoProps = {
    logoSize?:number,
}

export const Logo = ({logoSize}:logoProps) =>(
    <Text style={logoSize ? [constantStyles.logo,{fontSize:logoSize}]:constantStyles.logo}>PetPulse</Text>
)

export const constantStyles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FFF8E1",
    },
    logo:{
        color:"#8D6E63",
        fontSize:60,
        fontWeight:"500",
        fontFamily:"serif"
    },
    text:{
        fontSize:20,
        color:"#8D6E63",
        margin:5
  },

  textInput:{
    // backgroundColor:"#fff",
    width:"100%",
    borderWidth: 1,
    borderBottomColor:"#fff",
    borderTopColor:"#2f2f2f",
    borderRightColor:"#2f2f2f",
    borderLeftColor:"#2f2f2f",
    marginBottom:10,
    color:"#fff"
  },
  buttonContainer:{
    padding:10,
    borderRadius:5,
    marginTop:10
  },
  formText:{
    fontSize:20,
    color:"#e6e6e6",
  },
  formContainer:{
    width:"90%",
    height:"auto",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    borderRadius:20,
    elevation:10,
  },
  formColor:{
    backgroundColor:"#2f2f2f",
  },
  goldenBackgroundColor:{
    backgroundColor:"#FCD202"
  },
  tomatoBackgroundColor:{
    backgroundColor:"tomato"
  },


  primaryText:{
    color: "#e6e6e6",
  },
  pureWhite:{
    color:"#ffffff",
  },
  secondaryText:{
    color:"#8D6E63",
  },
  brownColor:{
    color:"#2f2f2f"
  },
  goldenColor:{
    color:"#FCD202"
  },
  pureBlack:{
    color:"#000000"
  },

  greenColor:{backgroundColor: "#3CB371"}
  // secondaryColor:{color:"#87CEEB"}
})
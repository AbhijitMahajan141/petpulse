import React,{useState} from 'react'
import { StyleSheet, Text, View,Pressable,Image,ScrollView,TextInput,ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/reducers/loadingSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { savePost } from '../../firebase/DbAccess';
import { Logo, constantStyles } from '../../constants'
import { Capture, Upload } from './UploadSelection';
import Snackbar from 'react-native-snackbar';
import Video from 'react-native-video';

type File ={
  uri:string | undefined,
  type:string | undefined,
  width:number | undefined,
  height:number | undefined,
  // name:string | undefined,
}

interface UploadModelProps {
  closeModal: () => void;
}

const UploadModel = ({closeModal}:UploadModelProps) => {

  const user = useSelector((state:RootState) => state.user.user);
  const loading = useSelector((state:RootState) => state.loading.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>({uri:"",type:"",width:0,height:0});
  const [tagLine,setTagLine] = useState("");

  const handlePhotoSelection = async () => {
    try {
      const data = await Upload();
      if (data.assets && data.assets.length > 0) {
        const asset = data.assets[0];
        // console.log(asset);
        
        if( (asset.type === "image/jpeg" && (asset.fileSize && asset.fileSize > 5000000)) || (asset.type === "video/mp4" && (asset.fileSize && asset.fileSize > 10000000))  )
        {
          Snackbar.show({text:"Selected Image/Video is too Big.Select Photo < 5MB, Video < 10MB",duration:Snackbar.LENGTH_LONG});
        }else{
          setSelectedFile({uri:asset.uri,type:asset.type,width:asset.width,height:asset.height});
        }       
      }else{
        // console.log("Photo not Selected");
        Snackbar.show({text:"Photo not Selected",duration:Snackbar.LENGTH_LONG});
      }
      // data.assets?.map((f)=>{setSelectedFile({id:f.id,uri:f.uri,type:f.type,name:f.fileName})});
    } catch (error) {
      Snackbar.show({text:`Error uploading photo: ${error}`,duration:Snackbar.LENGTH_LONG});
      // console.error('Error uploading photo:', error);
    }
  }

  const handleCaptureSelection = async () => {
    try {
      const data = await Capture();
      if (data.assets && data.assets.length > 0) {
        const asset = data.assets[0];
        setSelectedFile({uri:asset.uri,type:asset.type,width:asset.width,height:asset.height});
      }else{
        Snackbar.show({text:"Photo not Selected",duration:Snackbar.LENGTH_LONG});
      }
    } catch (error) {
      Snackbar.show({text:`Error during Capture: ${error}`,duration:Snackbar.LENGTH_LONG});
    }
  }

  const handlePost = () => {
    dispatch(setLoading(true));
    
      if(fileName && selectedFile.uri && user){
        const data = {fileName,selectedFile,tagLine,user}
        // console.log(selectedFile);
        
        savePost(data).then(()=>{ 
          dispatch(setLoading(false));
          setFileName("");
          setSelectedFile({uri:"",type:"",width:0,height:0});
          setTagLine("");
          closeModal();
        })
      }
      else{
        dispatch(setLoading(false));
        Snackbar.show({text:"A file and File Name is required.",duration:Snackbar.LENGTH_LONG});
      }
  }

  return (
    <ScrollView style={{width:"100%"}}>
      <KeyboardAvoidingView style={styles.container} >

        <Logo logoSize={30} />

        <View>
          <Text style={[constantStyles.text,{textAlign:"center",fontSize:15}]}>
            Share some wonderful moments of your pets with everyone.
          </Text>
        </View>

        <View style={styles.uploadButtons}>
          <Pressable onPress={handlePhotoSelection} style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor]}>
            <Text style={constantStyles.secondaryText}>Upload</Text>
          </Pressable>
          
          <Pressable onPress={handleCaptureSelection} style={[constantStyles.buttonContainer,constantStyles.goldenBackgroundColor]}>
            <Text style={constantStyles.secondaryText}>Capture</Text>
          </Pressable> 
        </View>
        <View>
          {selectedFile.uri &&
            <View style={{width:"80%"}}>
              <View style={{marginTop:10}}>
                  <Text>File Name:</Text>
                  <TextInput style={constantStyles.textInput} onChangeText={setFileName} value={fileName} placeholder='Eg. Enter a Name for your file.' />
                </View>
              <View style={styles.fileContainer}>
                
              {selectedFile.type === "image/jpeg" &&
                <Image 
                  source={{uri: selectedFile.uri}} 
                  style={{width:300,height:400}} 
                  resizeMode="stretch" 
                  
                  />}
              {selectedFile.type === "video/mp4" &&
                <Video 
                  source={{uri: selectedFile.uri}} 
                  controls={true}
                  style={styles.vid} 
                  resizeMode={selectedFile.width && selectedFile.height && selectedFile.height > selectedFile.width?"cover":"contain"}
                  repeat={true} 
                  paused={false}
                  playInBackground={false}
                  playWhenInactive={false}
                  
                />
              }
              </View>
              <View>
                <Text>Tagline:</Text>
                <TextInput style={[constantStyles.textInput,{width:300}]} multiline={true} numberOfLines={2} onChangeText={setTagLine} value={tagLine} placeholder='Eg. Enter a Tagline here.' />
                <Pressable style={[constantStyles.buttonContainer,constantStyles.greenBgColor,{width:60,alignSelf:"center"}]} onPress={handlePost} >
                  {loading ? <ActivityIndicator size="small"/> : <Text style={[constantStyles.pureWhite,{fontWeight:"600",alignSelf:"center"}]}>Post</Text> }
                </Pressable>
              </View>
            </View>
          }
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default UploadModel

const styles = StyleSheet.create({
 container:{
    width:"100%",
    height:"auto",
    // backgroundColor:"#FFF8E1",
    display:'flex',
    alignItems:"center",
    justifyContent:"center"
  },
  uploadButtons:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    columnGap:10
  },
  fileContainer:{
    width:305,
    height:405,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    marginVertical:15,
    backgroundColor:"#fff",
    padding:2,
    borderRadius:5
  },
  vid:{
    width:300,
    height:400
  }
})
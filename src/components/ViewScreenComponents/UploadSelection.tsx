import { launchImageLibrary,launchCamera } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

export const Upload = () => (
    launchImageLibrary({
      mediaType:"mixed",
      selectionLimit:5,
      presentationStyle:"popover",
      videoQuality:"medium",
      
    },(response)=>{
      if (response.didCancel) {
        Snackbar.show({text:"User cancelled image/Video picker",duration:Snackbar.LENGTH_LONG});
      }
      else if (response.errorMessage) {
        Snackbar.show({text:`Error:${response.errorMessage}`,duration:Snackbar.LENGTH_LONG});
    }
      else if (response.errorCode) {
        Snackbar.show({text:`ImagePicker Error Code: ${response.errorCode}`,duration:Snackbar.LENGTH_LONG});
    }else{        
        if(response){
          return(response.assets);         
        }
        else{
            Snackbar.show({text:"Something went wrong",duration:Snackbar.LENGTH_LONG});
        }
    }
    })
)


export const Capture = () =>(
    launchCamera({
        mediaType:"mixed",
        videoQuality:"medium",
        durationLimit:5000,
        cameraType:"back",
        saveToPhotos:true,
        presentationStyle:"popover"
    },(res) => {
        if (res.didCancel) {
        Snackbar.show({text:"User cancelled image/Video Capture",duration:Snackbar.LENGTH_LONG});
      }
      else if (res.errorMessage) {
        Snackbar.show({text:`Error:${res.errorMessage}`,duration:Snackbar.LENGTH_LONG});
    }
      else if (res.errorCode) {
        Snackbar.show({text:`ImagePicker Error Code: ${res.errorCode}`,duration:Snackbar.LENGTH_LONG});
    }else{        
        if(res){
          return(res);         
        }
        else{
            Snackbar.show({text:"Something went wrong",duration:Snackbar.LENGTH_LONG});
        }
    }
    })
)
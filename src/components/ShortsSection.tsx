import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Dimensions, FlatList, InteractionManager } from 'react-native'
import React, { useState, useEffect,useCallback } from 'react'
import { constantStyles } from '../constants'
import Video from 'react-native-video'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { setLoading } from '../redux/reducers/loadingSlice'
import { getAllPosts } from '../firebase/DbAccess'

const SCREEN_HEIGHT = Dimensions.get('window').height - 200;
const SCREEN_WIDTH = Dimensions.get('window').width - 40;

interface Shorts{
  fileName:string,
  tagLine:string,
  user:string,
  downloadUrl:string,
  width:number,
  height:number,
}

const VideoItem = ({ short, loading }: { short: Shorts; loading: boolean }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const onVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);
  return(
  <View key={short.fileName} style={{width:"100%",height:SCREEN_HEIGHT}}>
  <View style={styles.individualVideo}>
    <Text>{short.user}</Text>
    {loading && !videoLoaded ? (
      <ActivityIndicator size="large" />
    ) : (
      <Video
        source={{ uri: short.downloadUrl }}
        style={styles.vid}
        repeat={true}
        paused={false}
        playInBackground={false}
        playWhenInactive={false}
        resizeMode={short.width && short.height && short.height > short.width?"cover":"contain"}
        onLoad={onVideoLoad}
      />
    )}
    <View style={styles.postText}>
      <Text>
        {short.fileName} : {short.tagLine}
      </Text>
    </View>
  </View>
  </View>
  )
}

const ShortsSection = () => {

  const loading = useSelector((state:RootState) => state.loading.loading);
  const dispatch = useDispatch<AppDispatch>();
  const [allShorts,setAllShorts] = useState<Shorts[]>([]);

  useEffect(()=>{
    const fetchPosts = async () =>{
      
      dispatch(setLoading(true));
      try {
        const section = "shorts";
        const shorts = await getAllPosts(section);
        // console.log(posts);
        if(shorts){
          setAllShorts(shorts);
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(setLoading(false));
    }
    InteractionManager.runAfterInteractions(() => {
      fetchPosts();
    });
  },[]);

  return (
    <View style={[constantStyles.container,styles.container]}>
      {/* <Text>ShortsSection</Text> */}

      <FlatList
        style={{ width: '100%', height: '100%', }}
        data={allShorts}
        keyExtractor={(item) => item.fileName}
        renderItem={({ item }) => <VideoItem short={item} loading={loading} />}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
      />
       
    </View>
  )
}

export default ShortsSection

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#2f2f2f",
    borderRadius:10,
    height:SCREEN_HEIGHT,
  },
  vid:{
    width:SCREEN_WIDTH,
    height:600,
    borderRadius:5
  },
  individualVideo:{
    width:"100%",
    height:650,
    display:"flex",
    alignItems:"center",
    // justifyContent:"space-evenly",
    rowGap:10,
    marginTop:10,
    // padding:10,
    // backgroundColor:"#d7d7d7",
    borderRadius:10
  },
  postText:{
    display:"flex",
    flexDirection:"row",
    marginHorizontal:10
  }
})
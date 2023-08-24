import { StyleSheet, Text,ScrollView, View, FlatList,Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { constantStyles } from '../constants'
import { getAllPosts } from '../firebase/DbAccess';
import FastImage from 'react-native-fast-image';
import { setLoading } from '../redux/reducers/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

// const NUM_COLUMNS = 3;
// const ITEM_MARGIN = 8;

interface Post{
  fileName:string,
  tagLine:string,
  user:string,
  downloadUrl:string,
}

const PostsSection = () => {

  const user = useSelector((state:RootState) => state.user.user);
  const loading = useSelector((state:RootState) => state.loading.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [posts, setPosts] = useState<Post[]>([]);
  // const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(()=>{
    const fetchPosts = async () =>{
      dispatch(setLoading(true));
      try {
        const posts = await getAllPosts();
        // console.log(posts);
        if(posts){
          setPosts(posts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts().then(()=>dispatch(setLoading(false)));
  },[]);

  return (
    <View style={[constantStyles.container,styles.container]}>
      <Text>All Posts</Text>
      {
        loading ? < ActivityIndicator size="large"/> 
        :
        <FlatList
        style={styles.flatlist}
        // horizontal={true}
        data={posts}
        keyExtractor={(post) => post.fileName} // Assuming each post has a unique ID
        renderItem={({ item: post }) => (
          <FastImage
            source={{ uri: post.downloadUrl }}
            style={{ width: 100, height: 100 }} 
            resizeMode={FastImage.resizeMode.cover}
            
        />
      )}
    />
    }
    </View>
  )
}

export default PostsSection

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#2f2f2f",
    borderRadius:10,
    justifyContent:"flex-start",
    padding:10
  },
  flatlist:{
    width:"100%",
    display:"flex",
  }
})
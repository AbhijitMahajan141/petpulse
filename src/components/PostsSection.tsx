import { StyleSheet, Text,ScrollView, View, FlatList,Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { constantStyles } from '../constants'
import { getAllPosts } from '../firebase/DbAccess';
import FastImage from 'react-native-fast-image';
import { setLoading } from '../redux/reducers/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

interface Post{
  fileName:string,
  tagLine:string,
  user:string,
  downloadUrl:string,
}

const PostsSection = () => {

  // const user = useSelector((state:RootState) => state.user.user);
  const loading = useSelector((state:RootState) => state.loading.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [posts, setPosts] = useState<Post[]>([]);
  // const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(()=>{
    const fetchPosts = async () =>{
      
      dispatch(setLoading(true));
      try {
        const section = "posts";
        const posts = await getAllPosts(section);
        // console.log(posts);
        if(posts){
          setPosts(posts);
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(setLoading(false));
    }
    fetchPosts();
  },[]);

  const NUM_COLUMNS = 3;
  const SCREEN_WIDTH = Dimensions.get('window').width - 55;
  const ITEM_MARGIN = 4;
  const itemWidth = (SCREEN_WIDTH - (NUM_COLUMNS - 1) * ITEM_MARGIN) / NUM_COLUMNS;

  const renderGridItem = ({ item }: { item: Post }) => (
    <FastImage
      source={{ uri: item.downloadUrl,priority: FastImage.priority.high, }}
      style={{ width: itemWidth, height: itemWidth, margin: ITEM_MARGIN, borderRadius: 5 }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );

  return (
    <View style={[constantStyles.container,styles.container]}>
      <Text style={constantStyles.pureWhite}>All Posts</Text>
      {
        loading ? < ActivityIndicator size="large"/> 
        :
        <FlatList
          style={styles.flatlist}
          data={chunkArray(posts, NUM_COLUMNS)}
          keyExtractor={(chunk) => chunk.map((post) => post.fileName).join('_')}
            renderItem={({ item }) => (
              <View style={styles.rowContainer}>
                {item.map((post) => (
                  <View key={post.fileName}>
                    {renderGridItem({ item: post })}
                  </View>
                ))}
              </View>
            )}
        />
    }
    </View>
  )
}

function chunkArray(array: any[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
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
  },
  rowContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
 
})
import { StyleSheet, Text,ScrollView, View, FlatList,Dimensions, ActivityIndicator, RefreshControl, Image, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { constantStyles } from '../../constants'
import { getAllPosts } from '../../firebase/DbAccess';
import FastImage from 'react-native-fast-image';
import { setLoading } from '../../redux/reducers/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

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

  const [refreshing, setRefreshing] = useState(false);
  const [switchView,setSwitchView] = useState(false);

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

  useEffect(()=>{
    fetchPosts();
  },[]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts().then(()=>setRefreshing(false));
  }, []);

  const NUM_COLUMNS = 3;
  const SCREEN_WIDTH = Dimensions.get('window').width - 55;
  const ITEM_MARGIN = 4;
  const itemWidth = (SCREEN_WIDTH - (NUM_COLUMNS - 1) * ITEM_MARGIN) / NUM_COLUMNS;

  const renderGridItem = ({ item }: { item: Post }) => (
    <>
    {/* {switchView && <View> <Text>{item.fileName}</Text> </View>} */}
    <FastImage
      source={{ uri: item.downloadUrl,priority: FastImage.priority.high, }}
      style={switchView 
              ? 
              {width:SCREEN_WIDTH,height:SCREEN_WIDTH,margin:ITEM_MARGIN+2.5,borderRadius:10} 
              :
              { width: itemWidth, height: itemWidth, margin: ITEM_MARGIN, borderRadius: 5 }
      }
      resizeMode={FastImage.resizeMode.cover}
    />
    </>
  );

  const handleViewChange = () => {
    setSwitchView(!switchView);
  }

  return (
    <View style={[constantStyles.container,styles.container]}>
      <View style={styles.switchViewContainer}>
        <Text style={constantStyles.pureWhite}>Posts</Text>
        <Pressable style={{alignSelf:"flex-end"}} onPress={handleViewChange}>
          {
            switchView ? 
            <Image source={require("../../assets/grid.png")} alt='grid' style={{width:30,height:30}}/>
            :
            <Image source={require("../../assets/list.png")} alt='List' style={{width:30,height:30}}/>
          }
        </Pressable>
      </View>
      {

        loading ? < ActivityIndicator size="large"/> 
        :
        <>
        
          <FlatList
            style={styles.flatlist}
            data={chunkArray(posts, NUM_COLUMNS)}
            keyExtractor={(chunk) => chunk.map((post) => post.fileName).join('_')}
            renderItem={({ item }) => (
              <View style={ switchView ? styles.colContainer :styles.rowContainer}>
                {item.map((post) => (
                  <View key={post.fileName}>
                    {renderGridItem({ item: post })}
                  </View>
                ))}
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

        </>
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
  colContainer:{
    flexDirection:"column",
    width:"100%",    
  },
  switchViewContainer:{
    width:"100%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:10
    // backgroundColor:"#fff"
  },
  
})
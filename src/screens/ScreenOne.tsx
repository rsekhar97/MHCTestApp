
import React, { useEffect,useState } from 'react';
import Background from '../components/Background'
import Tab from '../components/Tab'
import { Navigation } from '../types';
import { SearchBar as RNSearchBar } from 'react-native-elements'; 
import {Button} from 'react-native-elements';
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import PhotoListViewModel from '../viewmodels/PhotoListViewModel';
import PhotoItem from '../models/PhotoItem';
import Fontisto from 'react-native-vector-icons/Fontisto';



type Props = {
  navigation: Navigation;
};

const ScreenOne = ({ navigation }: Props) => {

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [FilteredData, setFilteredData] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = React.useState('');
  const [isRender,setisRender]=React.useState(false);




  useEffect(() => {
    fetchData();

    
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    await PhotoListViewModel.fetchPhotos();
    setPhotos(PhotoListViewModel.photos);
    setFilteredData(PhotoListViewModel.photos);
    setIsLoading(false);
  };



    const renderItem = ({ item }: { item: PhotoItem }) => {  

      let name;
      if(item.bookmarks === '0'){

         name  = 'bookmark'
      }else{
          name  = 'bookmark-alt'
      }
      
      return (

        // <TouchableOpacity onPress={() => getItem(item)}>
        //   <View style={styles.item}>
        //     <View style={styles.item2}>
        //      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
        //      <View style={styles.textContainer}>
        //       <Text style={styles.name}>{"Name: " +item.id}</Text>
        //       <Text style={styles.description}>{"Description: "+item.category_name}</Text>
        //     </View>

        //     <Fontisto style={{marginRight:10}} color="#34495E" name={name} size={25} onPress={() => getItem_bookmark(item)} />

        //     </View>           
        //   </View>
        // </TouchableOpacity>

        <View style={styles.item}>
          <TouchableOpacity  style={{flex: 1,flexDirection: 'row',alignItems: 'center'}} onPress={() => getItem(item)}>
            <View style={{ width: '15%'}}>
              <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />              
            </View>
            <View style={{ flex: 1,margin:10 }}>
              <Text style={styles.name}>{"Name: " +item.id}</Text>
              <Text style={styles.description}>{"Description: "+item.category_name}</Text>
            </View>    
          </TouchableOpacity>
                
          <Fontisto style={{margin:10}} color="#34495E" name={name} size={35} onPress={() => getItem_bookmark(item)} />
        </View>
      ); 
    };

    const getItem = (item: PhotoItem) => {
      console.log(JSON.stringify(item));
      navigation.navigate('ScreenTwo', { id: item.id,category: item.category,category_name: item.category_name,thumbnailUrl:item.thumbnailUrl,bookmarks:item.bookmarks }); // Pass relevant data to ScreenTwo
    };

    const getItem_bookmark = (items: PhotoItem) => {
     const updatedPhotos = photos.map(item => {
        if (item.id === items.id) {

          if( item.bookmarks === '1' || items.bookmarks === '1'){

            return {
              ...item,
              bookmarks: '0'
            };

          }else if(item.bookmarks === '0' || items.bookmarks === '0'){
            return {
              ...item,
              bookmarks: '1'
            };
          }
          
        }
        return item;
      });
    
      const updatedFilteredData = FilteredData.map(item => {
        if (item.id === items.id) {
          if( item.bookmarks === '1' || items.bookmarks === '1'){

            return {
              ...item,
              bookmarks: '0'
            };

          }else if(item.bookmarks === '0' || items.bookmarks === '0'){
            return {
              ...item,
              bookmarks: '1'
            };
          }
        }
        return item;
      });
    
      setPhotos(updatedPhotos);
      setFilteredData(updatedFilteredData);
      setisRender(!isRender);

      //console.log('else',JSON.stringify(newData1));
    };
  



    const searchFilterFunction = (text: string) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = photos.filter((item) => {
          const itemData = `${item.id}`;
    
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredData(photos);
        setSearch(text);
      }
    };

    const Button_select_list = (text: string) => {

      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource


        console.log(text)
        if(text ==='all'){
          setFilteredData(photos);
        }else{

          const newData = photos.filter((item) => {
            const itemData = `${item.category_name.toUpperCase()}`;
      
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

            
          });

          setFilteredData(newData);

        }
       
        
       
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredData(photos);
        
      }

    }
   

    const ItemSeparatorView: React.FC = () => {
      return (
        // Flat List Item Separator
        <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
      );
    };


  return (
    <Background>
      <Tab/>

        <View style={styles.card_view}>
        <Button
            title="All"
            titleStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold'}}
            onPress={() => Button_select_list('all')}
            buttonStyle={{ backgroundColor: '#8BC34A', borderRadius: 3}}
            containerStyle={{ flex: 1, marginHorizontal: 5}}
          />

          <Button
            title="Odd"
            titleStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold'}}
            onPress={() => Button_select_list('odd')}
            buttonStyle={{ backgroundColor: '#FF0000', borderRadius: 3}}
            containerStyle={{ flex: 1, marginHorizontal: 5}}
          />

          <Button
            title="Even"
            titleStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold'}}
            onPress={() => Button_select_list('even')}
            buttonStyle={{ backgroundColor: '#F4D03F', borderRadius: 3}}
            containerStyle={{ flex: 1, marginHorizontal: 5}}
          />
        </View>
      
      <RNSearchBar
        lightTheme
        round
        containerStyle={{ backgroundColor: '#fff' }}
        inputContainerStyle={{ backgroundColor: '#fff' }} 
        onChangeText={(text: string) => searchFilterFunction(text)} 
        onClear={() => searchFilterFunction('')}
        placeholder="Search here..."
        value={search}
      />

      <FlatList
          data={FilteredData}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
          extraData={isRender} 
      />
     
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    padding: 10,
    borderRadius: 10,
  },

  item2:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    
  },

  card_view: { 
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    paddingTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
   
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
   
  },
  text:{
    justifyContent: 'flex-start',
    color:'#000',
    marginLeft:10
    
  },
  view_5:{        
    flex: 1,
    backgroundColor:"#E5E7E9",
  },
  textContainer: {
    flex: 1,
    marginLeft:10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ScreenOne
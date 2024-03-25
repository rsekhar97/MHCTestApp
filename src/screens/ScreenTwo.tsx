

import React, { useEffect,useState } from 'react';
import Background from '../components/Background'
import Tab from '../components/Tab'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Navigation } from '../types';
import BackButton from '../components/BackButton';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Appbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

type Props = {
    navigation: Navigation;
};

type ImageData = {
    url: string;
    props: ImageProps;
  };

  
const ScreenTwo = ({ navigation, route }: Props) => {

    const [Visible, setVisible] = React.useState(false); 
    var type;
    
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    console.log('ID:  ' + route.params.id);
    console.log('URL:  ' + route.params.thumbnailUrl);
    console.log('category:  ' + route.params.category);
    console.log('category_name:  ' + route.params.category_name)
    console.log('category_name:  ' + route.params.bookmarks)

    if(route.params.bookmarks === '0'){

        type  = 'bookmark'
     }else{
        type  = 'bookmark-alt'
     }
     

  }

  const images: ImageData[] = [{
    url: route.params.thumbnailUrl,
    props: {
      // You can pass additional props to Image component here
    }
  }];

    return (
        <Background>
           <BackButton goBack={() => navigation.navigate('ScreenOne')} />

           <Modal 
            visible={Visible} 
            transparent={true}
            onRequestClose={() => {
                //Alert.alert('Closed');
                setVisible(!Visible);
               }}>

                <View style={{flex: 1}}>
                    <Appbar.Header style={{backgroundColor: '#000'}}>
                      <View style={{ flex: 1,alignItems:'flex-end'}}>
                        
                           <AntDesign style={{marginRight:20}} color="#fff" name={'close'} size={25} onPress={() => setVisible(!Visible) } />
                         
                      </View>
                    </Appbar.Header>

                    <ImageViewer imageUrls={images}/>

                </View>
                
            </Modal>

           <View style={styles.container}>
                <View style={styles.item2}>
                <Pressable onPress={()=>setVisible(true)}>
                    <Image source={{ uri: route.params.thumbnailUrl }} style={styles.thumbnail} />
                </Pressable>

                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{"Name: " +route.params.id}</Text>
                        <View style={{flexDirection: 'row',alignItems: 'center',}}>
                            <Text style={styles.description}>{"Description: "+route.params.category_name}</Text>
                            {
                                route.params.bookmarks === '0' ? <Fontisto style={{margin:10}} color="#34495E" name ='bookmark' size={25}/>:<Fontisto style={{margin:10}} color="#34495E" name ='bookmark-alt' size={25}/>
                            }
                            
                        </View>
                        
                        
                    </View>
                </View>           
            </View>

        </Background>
    
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item2:{
        flex: 1,
        alignItems: 'center',
        marginTop:20
    },
    thumbnail: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginTop:20
    },
        name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },

})

export default ScreenTwo
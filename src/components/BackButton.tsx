import React, { memo } from 'react';
import { Pressable, Image, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => (

  <SafeAreaView style={styles.view_01}>
      <View style={styles.view_02}>
        <Pressable onPress={goBack}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="angle-left" color="#fff" size={40} style={{marginLeft: 15, marginBottom: 5}} />
            <Text style={{ fontSize: 15, justifyContent: 'center', textAlign: 'center', color: '#fff', fontWeight: 'bold', marginLeft: 15, }}> {'MHC Test App Detail View'} </Text>
          </View>
        </Pressable>

      </View>
        
    </SafeAreaView>

  
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#42A5F5',
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
  view_01:{
    backgroundColor: '#42A5F5',
  },
  view_02:{
      margin:10,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  text_stytle_ta:{

      fontSize:15,
      fontWeight: "bold",
      marginTop:10,
      marginLeft:10,
      color:'#ffffffff'
  },
});

export default memo(BackButton);

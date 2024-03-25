import React, { memo } from 'react';
import { View, StyleSheet ,SafeAreaView,Text} from 'react-native';
import FilterButton from './FilterButton';

const Tab = () => (
 
    <SafeAreaView style={styles.view_01}>
      <View style={styles.view_02}>

        <Text style={styles.text_stytle_ta}>{'MHC Test App'}</Text>

      </View>
        
    </SafeAreaView>

);

const styles = StyleSheet.create({
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

export default memo(Tab);

import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TextInput, SearchBar, TouchableHighlight, Button } from 'react-native';
import axios from 'axios';
import importedData from './studentsData.json';

export default function MentorsPage({ navigation }) {

  const [fullData, setFullData] = useState(importedData.users);
  const [searchValue, setSearchValue] = useState();
  const [data, setData] = useState(importedData.users);
  
  const renderAdvice = ({item}) => {
    return (
        <View style={Styles.adviceContainer}>
          <Text style={Styles.adviceContainerItems}>{item}</Text>
        </View>
    )
  };
  const renderProfile = ({item}) => {
    return ( 
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress = {() => {
          navigation.navigate("Profile", item);
        }}
        >
      <View style={Styles.profileContainer}>
        <View style={{flex: 1, padding: 10}}>
          <Image
            style={Styles.imageProfilePicture}
            source={{uri:item.image}}
          />
          <View style={{flexDirection:"row", padding: 5,}}>
            <Image
              style={Styles.imageLocationIcon}
              source={{uri:'https://media.istockphoto.com/vectors/map-pin-vector-glyph-icon-vector-id1193451471?k=20&m=1193451471&s=612x612&w=0&h=ve7JRaMvw6L1HBiDOTVwfbhHALPPH-nCMCgG0Z_z5NY='}}
            />
            <Text style={{fontSize:10}}>{item.location}</Text>
          </View>
        </View>
        <View style={{flex: 2, padding: 10,}}>
        <Text style={{fontSize: 15}}><b>{item.firstName} {item.lastName}</b></Text>
        <Text style={{fontSize: 10}}>{item.major} @ Brandeis </Text>
        <Text style={{fontSize:10}}>{"\n"}<b>Advice I can give:</b></Text>
        <FlatList
          contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
          horizontal = {true}
          data={item.advice}
          renderItem = {renderAdvice}
        />
        </View>
      </View>
      </TouchableHighlight>
    );
  };

  const searchData = (text) => {
    const newData = fullData.filter((item) => {
      let temp = false;
      for (let i = 0; i < item.advice.length; i++){
        if (item.advice[i].toLowerCase().search(text) > -1){
          temp = true;
        }
      }
      return temp;
    });
    setData(newData);
    setSearchValue(text)
  };

  return (
    <View>
      <View>
        <TextInput
          style={{padding: 10, borderRadius: 10, borderColor: "grey", borderWidth: 2, margin: 10}}
          onChangeText={(text) => {searchData(text)}} 
          value = {searchValue}
          placeholder="Search Here..."
        />
        </View>
        <FlatList 
          data = {data}
          renderItem = {renderProfile}
        />
      </View>
  );
}

const Styles = StyleSheet.create ({
  adviceContainer:{
    backgroundColor:"#0072b1", 
    justifyContent:"center",
    alignItems:"center", 
    margin:5, 
    padding:3, 
    borderRadius:5
    },
  adviceContainerItems:{
    fontSize:8, 
    color:"white"
  },
  profileContainer: {
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    height: 150,
    flexDirection: "row",
  },
  imageProfilePicture: {
    width: 95,
    height: 90,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  imageLocationIcon: {
    width: 15,
    height: 15,
    overflow: "hidden",
  }
})
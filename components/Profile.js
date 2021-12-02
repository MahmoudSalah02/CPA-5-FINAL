import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TextInput, SearchBar, TouchableHighlight, Button } from 'react-native';
import {currentProfile} from './MentorsPage';

export default function Profile({ navigation, route }) {

  const [profileData, setProfileData] = useState(route.params);

  const renderAdvice = ({item}) => {
    return (
      <View style={Styles.adviceContainer}>
        <Text style={{color:"white"}}>{item}</Text>
      </View>
    )
  };

  return (
      <View>
        <View style={{justifyContent:"center", alignItems:"center", padding:20, margin:10}}>
          <Image
            style={Styles.imageProfilePicture}
            source={{uri:profileData.image}}
          />
          <Text style={{fontSize:20}}><b>{profileData.firstName} {profileData.lastName}</b></Text>
        </View>
        <View style={{justifyContent:"center", alignItems:"center",}}>
          <Text><b>Contact Information</b></Text>
            <View>
              <Text>Phone Number: {profileData.phoneNumber}</Text>
              <Text>Email Address: {profileData.emailAddress}</Text>
              <Text>Location: {profileData.location}</Text>
            </View>
        </View>
        <View style={{justifyContent:"center", alignItems:"center", margin: 10,}}>
          <Text><b>Advice I can give</b></Text>
          <FlatList
            data={profileData.advice}
            renderItem = {renderAdvice}
          />
        </View>
      </View>
  )
}
const Styles = StyleSheet.create ({
  imageProfilePicture: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor:"grey",
    margin:10,
  },
  adviceContainer:{
    backgroundColor:"#0072b1", 
    justifyContent:"center",
    alignItems:"center", 
    margin:5, 
    padding:3, 
    borderRadius:5
    },
})
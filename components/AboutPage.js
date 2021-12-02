import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TextInput, SearchBar, TouchableHighlight, Button, ScrollView } from 'react-native';
import axios from 'axios';
import MentorsPage from './MentorsPage';

export default function AboutPage({navigation}) {
  const [refresh, setRefresh] = useState(true);
  const [rate, setRating] = useState();
  const [dogImage, setDogImage] = useState();
  const ValueContext = React.createContext(0)
  const ValueProvider = ({value}) => {
    const [currentValue,setCurrentValue] = useState(value);
  }

  const getDogImage = () => {
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        setDogImage(response.data.message)
      });
  };

  useEffect(() => {
    getDogImage();
  }, [refresh]);

  return (
    <View style={{flex:1}}>
      <ScrollView>
      <View style={{justifyContent:"center", alignItems:"center"}}>
        <Image
          style={Styles.brandeisLogo}
          source={{uri:"https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Brandeis_University_seal.svg/1200px-Brandeis_University_seal.svg.png"}}
        />
      </View>
      <View style={{backgroundColor:"lightgrey", margin:10, padding: 10}}>
        <Text>Hello there! Are you a Brandeis Student looking for advice but can't find the right person to talk to? Whether it is fun places to go to or courses to choose, <b>MyMentor</b> is the right place for you. Click bellow to get started!</Text>
      </View>
      <Button
        title = "Find a Mentor" 
        onPress={() => navigation.navigate('Mentors')}
      />
      </ScrollView>
      <View style={{flexDirection:"row"}}>
      <Text>Rate your experience <TextInput
        placeholder="1 to 5"
        onChangeText={text => 
        {setRefresh(!refresh);
        setRating(text)}}
      /></Text>
      <View>
      <Image 
        style={Styles.dogPicture}
        source={{uri:dogImage}}
      />
      <Text>Thanks!</Text>
      </View>
      </View>
    </View>
  )
}
const Styles = StyleSheet.create ({
  brandeisLogo:{
    height:100,
    width:100,
    },
  dogPicture:{
    height:60,
    width:60,
  }
});
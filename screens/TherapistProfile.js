import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Realm from 'realm';
import { addTherapist ,getTherapist,deleteAllTheRapist} from '../database/patientSchema';
import {TextInput ,IconButton, MD3Colors} from 'react-native-paper';

const TherapistProfile = ({navigation}) => {
    //let _id = Date.now().toString();
    const [therapistName,setTherapistName] = useState(""); 
    const [therapistAddress,setTherapistAddress] = useState(' '); 
    const [therapistPan,setTherapistPan] = useState(' '); 
    const [therapistPhone,setTherapistPhone] = useState(' '); 
    const [therapistRate,setTherapistRate] = useState(' ');
    const [therapistEmail,setTherapistEmail] = useState(' ');

  return (
    <View style={{margin:30}}>
      <Text style={{fontSize:30,color:"black",margin: 10}}>Therapist Profile</Text> 
      <TextInput
              style={styles.textInputStyle}
              placeholder="Name"
              onChangeText={therapistName => setTherapistName(therapistName)}
            />
        <Text> </Text>
    
      <TextInput
              style={styles.textInputStyle}
              placeholder="Address"
              onChangeText={therapistAddress => setTherapistAddress(therapistAddress)}
            />
            <Text>{"\n"}</Text>
      <TextInput
              style={styles.textInputStyle}
              placeholder="PAN"
              onChangeText={therapistPan => setTherapistPan(therapistPan)}
            />
            <Text> </Text>
      <TextInput
              style={styles.textInputStyle}
              placeholder="Phone"
              onChangeText={therapistPhone => setTherapistPhone(therapistPhone)}
              keyboardType="numeric"
            />
            <Text> </Text>
            <Text style={{color:"black"}}>Rate</Text>
      <TextInput
              style={styles.textInputStyle}
              placeholder="Rate"
              onChangeText={therapistRate => setTherapistRate(therapistRate)}
              value={therapistRate}
              keyboardType="numeric"
            />
            <Text></Text>
      <TextInput
              style={styles.textInputStyle}
              placeholder="Email"
              onChangeText={therapistEmail => setTherapistEmail(therapistEmail)}
            />
     <Text></Text>
     
     <Button
        style={styles.button}
        onPress={  () =>{
          let rate  = parseInt(therapistRate)
           addTherapist
          (
            Date.now().toString(),
            therapistName,
            therapistAddress,
            therapistPan,
            therapistPhone,
            rate,
            therapistEmail
            ),
            setTherapistAddress(null),
            setTherapistEmail(null),
            setTherapistName(null),
            setTherapistPhone(null),
            setTherapistPan(null),
            setTherapistRate(null),
            navigation.navigate('Dashboard')          
        
        }
      }
        title = {"Save Therapist Profile"}
        />
      <View style={styles.icons}>
      <IconButton  icon="plus-box" iconColor={MD3Colors.error50} size={40}  onPress={() => {navigation.navigate('CreatePatient')}}  />
      <IconButton  icon="home" iconColor={MD3Colors.error50} size={40}  onPress={() => {navigation.navigate('Dashboard')}}  />
      </View>
    
    </View>

  )
}

export default TherapistProfile

const styles = StyleSheet.create({
  icons:{ 
    flex: 1,    
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:50,
    position:"relative",
    marginLeft: 160
    },
    headlineLarge: {
        color: 'grey',
      
        fontSize: 32,
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 40,
        marginLeft: 80,
        marginTop:80
      },
      textInputStyle:{
        backgroundColor: 'transparent',
        borderColor:"black",
        borderWidth:1
      },
      button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },

})
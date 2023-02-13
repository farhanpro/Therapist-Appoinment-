import React,{ useState} from 'react';
import { View, Text,StyleSheet,Button,Linking } from 'react-native'
import  {getpatient,completedSession,getMarkedSeessions,deleteDaytime} from "../database/patientSchema";
import {  TextInput,IconButton, MD3Colors} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';


   //Time Related 
  const data = 
  [
    { label: '09:00 - 10:00', value: ['09:00 - 10:00'] },
    { label: '10:00 - 11:00', value: ['10:00 - 11:00'] },
    { label: '11:00 - 12:00', value: ['11:00 - 12:00'] },
    { label: '12:00 - 01:00', value: ['12:00 - 01:00'] },
    { label: '01:00 - 02:00', value: ['01:00 - 02:00'] },
    { label: '02:00 - 03:00', value: ['02:00 - 03:00'] },
    { label: '03:00 - 04:00', value: ['03:00 - 04:00'] },
    { label: '04:00 - 05:00', value: ['04:00 - 05:00'] },
  ];

const CompletedSessions = ({navigation}) => {
  
   let patients = getpatient()
   let dayTimeObj = JSON.parse(patients.dayTime);
   let selectedTime = dayTimeObj[0].time;
   let today = new Date().toDateString();

  //WhatsApp related 
    const mobileNumber = patients.whatsAppNo;
    const whatsAppMessage = `Session is Completed for your child  : ${patients.name} on ${new Date()}`; 

    const initiateWhatsApp = () => {
      // Check for perfect 10 digit length
      if (mobileNumber.length != 10 ) {
        alert('Please insert correct WhatsApp number');
        return;
      }
      // Using 91 for India
      // You can change 91 with your country code
      let url = 'whatsapp://send?text=' + whatsAppMessage +'&phone=91' + mobileNumber;
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
    };

  //Session Details Related  
  const [MarkSession,setMarkSession] = useState([]);
  
  //Date Related
    const [open, setOpen] = useState(false);
    const [date,setdate] = useState(new Date());
    // var date2 = date.toDateString();
  //Time Related
    const [value, setValue] = useState(selectedTime);
    const [isFocus, setIsFocus] = useState(false);

  //Input Note Related 
    const [Notes,setNotes] = useState(' ');
   
  return (
    <View style={{margin:20}}>
      <Text style={{fontSize:25,color:"black"}}>Mark Session Completed</Text>
      <Text style={{fontSize:30,color:"blue",marginTop:40,marginLeft:60}}>{patients.name}</Text> 
      <Text style={{fontSize:20,color:"black",marginLeft:80}}>{date.toDateString()} 
      <IconButton icon="calendar-today" style={{marginTop:1}}size={35} onPress={() => setOpen(true)} />
    </Text>
    <Text style={{color:"black"}}>(Today will be seslected therapist can change)</Text>
      <DatePicker modal open={open} date={date} 
      onConfirm={ (date) => {setOpen(!true),setdate(date)}}
        onCancel={() => {setOpen(false)}}mode = "date"/>
      {/* <Text>Changed by therapist date is : {date}  </Text> */}
      <Text>{'\n'}</Text>

      <View>
      <Dropdown
          style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={{backgroundColor:"#87CEEB",fontSize:15,width:45,color:"black"}}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? selectedTime: '...'}
          value={data}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            placeholder=(item.value)
            setIsFocus(false);
          }}
        />
        <Text style={{color:"black"}}>(Last timeslot will be selected therapist can change it.) </Text>
      </View>
      <Text>{'\n'}</Text>
      
      <TextInput placeholder='Notes' 
      onChangeText={Notes => setNotes(Notes)}/>
      <Text>{'\n'}</Text>
         
      <Button 
      title ="Save"
      onPress ={()=> 
      {
        converted = date.toString(' ')
        completedSession(
          Date.now().toString(), 
          patients._id,
          new Date(converted),
          selectedTime,
          Notes,
          false        
      )
         deleteDaytime(patients._id),initiateWhatsApp(),getMarkedSeessions(),navigation.navigate('Dashboard')
    }}
      />
      <Text style={{color:"black"}}>(This will send notification to parents WhatsApp )</Text>
      <View style={styles.icons}>
      <IconButton  icon="plus-box" iconColor={MD3Colors.error50} size={40}  onPress={() => {navigation.navigate('CreatePatient')}}  />
      <IconButton  icon="home" iconColor={MD3Colors.error50} size={40}  onPress={() => {navigation.navigate('Dashboard')}}  />
      </View>
      
  
    </View>
  )
}

export default CompletedSessions
const styles = StyleSheet.create({
    dropdown: {
    height: 50,
    borderColor: 'Black',
    color:"Black",
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 8,
    backgroundColor: '#89C4F4',
    margin: 10,
  },
   
  icons:
  { 
      flex: 1,    
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop:135,
      position:"relative",
      marginLeft: 215
  },
  icon: {
          marginRight: 5,
        },
  label: {
          position: 'absolute',
          backgroundColor: 'white',
          left: 22,
          top: 8,
          zIndex: 999,
          paddingHorizontal: 8,
          fontSize: 14,
        },
    placeholderStyle: {
          fontSize: 16,
        },
    selectedTextStyle: {
          fontSize: 16,
        },
    iconStyle: {
          width: 20,
          height: 20,
        },
    inputSearchStyle: {
          height: 40,
          fontSize: 16,
        },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
      },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
    highlight: {
        fontWeight: '700',
      },
})
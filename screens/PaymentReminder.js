import {Text, View,FlatList,TouchableOpacity,Linking} from 'react-native';
import React,{useState} from 'react';
import  {getAllPatients,getUnpaidPatients,fetchPaymentInfo} from "../database/patientSchema";
import {Picker} from '@react-native-picker/picker';
import {TextInput,IconButton} from 'react-native-paper';

const PaymentReminder = ({navigation}) => {
  //Whatsapp related 
  const [comments,setcomments] = useState(' ');
  
  const onClick = () => {
    //console.log("User info ", userinfo);
    //console.log("Payment info ", paymentInfo);
    const whatsAppMessage = `Hello Unpaid Amount of your child ${selectedValue} is ${unpaidamount} please pay it as soon as possible.Note : ${comments}`;
    const mobileNumber = userinfo[0].whatsAppNo;
    const url = 'whatsapp://send?text='+whatsAppMessage+'&phone=91'+mobileNumber;
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } 
        else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));  
  };


//Fetching name in unpaid sessions related
  const nameList = getUnpaidPatients();
  console.log("Name List ",nameList);
  const [selectedValue,setSelectedValue] = useState(nameList[0]);
  const {paymentInfo} = fetchPaymentInfo(selectedValue);
  //console.log("Payment Info ",paymentInfo);
  const {userinfo} = fetchPaymentInfo(nameList [0]);
  const unpaidamount = paymentInfo.length * 1200;
  
  return (
    <View>
      <Text style={{fontSize:30,color:"black",margin:30}}>Payment Reminder</Text> 
      <Picker style={{color:"white",margin:30,backgroundColor: "skyblue"}} selectedValue={selectedValue}
          onValueChange={(itemValue) => {setSelectedValue(itemValue),fetchPaymentInfo(itemValue),console.log("Item value",itemValue)}}>
          {nameList.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>  
          
        <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Time</Text>
        </View>  
        <FlatList
        data={paymentInfo}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {//console.log(item.date.toDateString())
            }
           
            <Text style={styles.cell}>{item.date.toDateString()}</Text>
            <Text style={styles.cell}>{item.time}</Text>
          </View>
        )}
        keyExtractor={item => item.session_Id}
      />
      <Text style={{fontSize:20,color:"black",margin:20,marginLeft:80}} > Unpaid Amount : {unpaidamount}</Text>

      <TextInput  
              style={{width:300,height:100,marginLeft:30,backgroundColor:'transparent',borderColor:"black",borderWidth:2}}
              placeholder="Comments"
              onChangeText={comments => setcomments(comments)}
          
      />
          
    <TouchableOpacity style={styles.button} onPress={onClick}>
      {//console.log(selectedValue.whatsAppNo) 
      }
      <Text style={styles.buttonText}>Send Reminder </Text>
    </TouchableOpacity>
    <Text style={{color:"black",marginLeft:50}}>This will send WhatsApp message to Parent</Text>
    <View style={styles.icons}>
      <IconButton  icon="plus-box" iconColor={"#0096FF"} size={45}   onPress={() => {navigation.navigate('CreatePatient')}}/>
      <IconButton  icon="home"  iconColor={"#0096FF"} size={45}   onPress={() => {navigation.navigate('Dashboard')}}/>
                </View>
    </View>
)
}

export default PaymentReminder

const styles = {
  button: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
    marginTop : 15,
    marginLeft:120,
    width:150 ,
    height:50
  },
  
  icons:{ 
    flex: 1,    
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:570,
    position:"absolute",
    marginLeft: 210
    },

  buttonText:
   {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
   },


  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },

  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },

  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  cell: {
    flex: 1,
    color:'black',
    textAlign: 'center',
  },
}
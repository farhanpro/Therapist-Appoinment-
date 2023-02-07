import {  Text, View,FlatList,TouchableOpacity,Linking} from 'react-native';
import React,{useState} from 'react';
import { getAllPatients,fetchPaymentInfo} from "../database/patientSchema";
import {Picker} from '@react-native-picker/picker';
import { TextInput,IconButton, MD3Colors } from 'react-native-paper';


const PaymentReminder = ({navigation}) => {
  
  const [name,_id] = getAllPatients();
  const data =getAllPatients();
  const nameList = data.map(name => name.name );
  const [selectedValue,setSelectedValue] = useState(nameList[0]);
  const paymentInfo = fetchPaymentInfo(selectedValue);
  const unpaidamount = paymentInfo.length * 1200;


  const onClick = () => {
    const message = 'Hello, how are you?';
    const phoneNumber = '+917798286678';
    const url = `https://graph.facebook.com/v15.0/106662529010732/messages `;
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  
  return (
    <View>
      <Text style={{fontSize:30,color:"black",margin:30}}>Payment Reminder</Text> 
      
        <Picker style={{color:"white",margin:30,backgroundColor: "skyblue"}} selectedValue={selectedValue}
          onValueChange={(itemValue) => {setSelectedValue(itemValue),fetchPaymentInfo(itemValue)}}>
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
            {console.log(item.date.toDateString())}
            <Text style={styles.cell}>{item.date.toDateString()}</Text>
            <Text style={styles.cell}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(index) => index.toString()}
      />
      <Text style={{fontSize:20,color:"black",margin:20,marginLeft:80}} > Unpaid Amount : {unpaidamount}</Text>

      <TextInput  
              style={{width:300,height:100,marginLeft:30,backgroundColor:'transparent',borderColor:"black",borderWidth:2}}
              placeholder="Comments"
          
      />
          
    <TouchableOpacity style={styles.button} onPress={onClick }>
      <Text style={styles.buttonText}>Send Reminder </Text>
    </TouchableOpacity>
    <Text style={{color:"black",marginLeft:50}}>This will send WhatsApp message to Parent</Text>
    <View style={styles.icons}>
      <IconButton  icon="plus-box" iconColor={MD3Colors.error50} size={45}   onPress={() => {navigation.navigate('CreatePatient')}}/>
      <IconButton  icon="home"  iconColor={MD3Colors.error50} size={45}   onPress={() => {navigation.navigate('Dashboard')}}/>
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
    marginTop:110,
    position:"relative",
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
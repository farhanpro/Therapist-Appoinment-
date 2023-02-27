import {Text, View,FlatList} from 'react-native';
import React,{useState} from 'react';
import {getAllPatients,fetchPaymentInfo,patientHistory} from "../database/patientSchema";
import {Picker} from '@react-native-picker/picker';
import {IconButton,  } from 'react-native-paper';

const PatientHistory = ({navigation}) => {
  
  const [_id] = getAllPatients();
  const data =getAllPatients();
  const nameList = data.map(name => name.name);
  const [selectedValue,setSelectedValue] = useState(nameList[0]);
  const paymentInfo = patientHistory(selectedValue) ;
  //console.log("payment info",paymentInfo);
  //console.log("user info",userinfo);
  const {userinfo} = fetchPaymentInfo(selectedValue);
//const unpaidamount = paymentInfo.length * 1200;
  
  return (
    <View>
      <Text style={{fontSize:30,color:"black",margin:30}}>Patient History</Text> 
      
        <Picker style={{color:"white",margin:30,backgroundColor: "#0096FF"}} selectedValue={selectedValue}
          onValueChange={(itemValue) => {setSelectedValue(itemValue),fetchPaymentInfo(itemValue)//console.log("Item value",itemValue)
        }}>
          {nameList.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>  

        <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Bill Amount</Text>
        <Text style={styles.headerCell}>Paid</Text>
        </View>  
        <FlatList
        data={paymentInfo}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {//console.log(item.date.toDateString())
            }
            <Text style={styles.cell}>{item.date.toDateString()}</Text>
            <Text style={styles.cell}>1200</Text>
            <Text style={styles.cell}>{item.paid.toString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.session_Id}
      />
      

      
          

    
    <View style={styles.icons}>
      <IconButton  icon="plus-box" iconColor={"#0096FF"} size={45}   onPress={() => {navigation.navigate('CreatePatient')}}/>
      <IconButton  icon="home"  iconColor={"#0096FF"} size={45}   onPress={() => {navigation.navigate('Dashboard')}}/>
                </View>
    </View>
  )
}

export default PatientHistory

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
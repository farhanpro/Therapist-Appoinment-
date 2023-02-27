import React,{useState} from 'react';
import { Text, View,FlatList,Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { IconButton, Checkbox } from 'react-native-paper';
import {getAllPatients,fetchPaymentInfo,acknowledgePayment,getMarkedSeessions,getUnpaidPatients} from '../database/patientSchema';




const AcknowledgePayment = ({navigation}) => {
 
  const nameList = getUnpaidPatients();
  //const [nameList] = data.map( (name,index) => {[name,index]})
  let counter = 0;
  const [selectedValue,setSelectedValue] = useState(nameList[0]);
  const [checked,setchecked] = useState([false,false,false,false,false,false,false]);
  const [values,setvalues] = useState([])
  const {paymentInfo} = fetchPaymentInfo(selectedValue);
  const pendingPayment = paymentInfo.length * 1200;

  const handleCheckboxPress = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    values.push(counter++),
    setchecked(newChecked);
  };
  
  //console.log("Get Marked Sessions",getMarkedSeessions());
  //console.log("Get Payment Info",paymentInfo);
  
  return (
    <View>
       <Text style={{fontSize:25,color:"black",margin: 30}}>Acknowledge Payment.</Text>
       
       <Picker style={{color:"white",margin:30,backgroundColor: "skyblue"}} selectedValue={selectedValue}
          onValueChange={(itemValue) => {setSelectedValue(itemValue),fetchPaymentInfo(itemValue)}}>
          {nameList.map((item, index) => (<Picker.Item key={index} label={item} value={item} />))}
        </Picker>  

        <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Bill Amount</Text>
        <Text style={styles.headerCell}>Check box</Text>
        </View>  

        <FlatList
        data={paymentInfo}
        renderItem={({ item , index }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.date.toLocaleDateString()}</Text>
            <Text style={styles.cell}>1200</Text>
            <Checkbox
                 status={checked[index] ? 'checked' : 'unchecked'}
                  // onPress={()=>{handleCheckboxPress(index),acknowledgePayment(item)}}/>
                  onPress={()=>{handleCheckboxPress(index)//console.log(values)
                }}/> 
          </View>
        )}
        keyExtractor={(item,index) => index.toString()}
      />
      <Text style={{fontSize:20,color:"black",margin:20,marginLeft:80}}>Unpaid Amount :  {pendingPayment}</Text>
      <Button title="Save" onPress = {()=>{for(let i=0;i<values.length;i++)
      {
        acknowledgePayment(paymentInfo)} 
      navigation.navigate('PatientHistory')}}></Button>
          
      <View style={styles.icons}>
          <IconButton  icon="plus-box" iconColor={"#0096FF"} size={45}   onPress={() => {navigation.navigate('CreatePatient')}}  />
          <IconButton  icon="account-cash"  iconColor={"#0096FF"} size={45}   onPress={() => {navigation.navigate('PaymentReminder')}}  />
          <IconButton  icon="home" iconColor={"#0096FF"} size={45}  onPress={() => {navigation.navigate('Dashboard')}}  />
      </View>

    </View>
  )
}

export default AcknowledgePayment

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
    marginLeft: 140
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
    alingItems:"left"
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
    textAlign: 'left',
  },
}
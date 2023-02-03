import {  Text, View,FlatList,TouchableOpacity,StyleSheet} from 'react-native';
import React,{useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import { TextInput,IconButton, MD3Colors,Checkbox } from 'react-native-paper';
import {getAllPatients,fetchPaymentInfo,acknowledgePayment,getMarkedSeessions} from '../database/patientSchema';
 



const AcknowledgePayment = ({navigation}) => {
   const [name,_id] = getAllPatients();
  const data =getAllPatients();
  const nameList = data.map(name => name.name );
  const [selectedValue,setSelectedValue] = useState(nameList[0]);
  const [checked,setchecked] = useState(false);
  const paymentInfo = fetchPaymentInfo(selectedValue);
  console.log(getMarkedSeessions());
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
        renderItem={({ item }) => (
          <View style={styles.row}>
            {/* {console.log(item.date.toLocaleDateString())} */}
            <Text style={styles.cell}>{item.date.toLocaleDateString()}</Text>
            <Text style={styles.cell}>{item.patient_Id}</Text>
            <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                 onPress={()=>{setchecked(!checked),acknowledgePayment(item)}}
                />
            
          
          </View>
        )}
        keyExtractor={(item,index) => index.toString()}
      />


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
    textAlign: 'center',
  },
}
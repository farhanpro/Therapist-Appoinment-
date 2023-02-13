import { StyleSheet, Button, Text,View, FlatList } from 'react-native'
import { TextInput } from 'react-native-paper'
import React from 'react'
import {getAllPatients,fetchPaymentInfo,acknowledgePayment,getMarkedSeessions,exportDataEmail,unpaidSessions} from '../database/patientSchema';

const ExportData = ({navigation}) => {


 // console.log(exportDataEmail('Farhan'));
  const [name,_id] = getAllPatients();
  const paid = unpaidSessions();
 // console.log("Paid",paid);
  const data = getAllPatients();
  const nameList = data.map(name => name.name );
  const paidList = paid.map(paid => paid.paid);
  // console.log(exportdata);
   console.log("Paid List :-",paid);

  
  return (
    <View>
        
        <View>
        <TextInput  style={styles.textInputStyle} placeholder="Email address"/>
        <Button title="Export Data to Email"> </Button>
        </View>

        <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Last Billed</Text>
        <Text style={styles.headerCell}>Last Payed</Text>
        <Text style={styles.headerCell}>Unpaid Sessions</Text>
        </View>

        <FlatList 
        data={paid}
        renderItem={({ item,index }) => (
            <View style={styles.row}>
            <Text>{item.patient_Id}</Text>
            <Text style={{marginLeft:20}}>{item.date.toDateString()}</Text> 
            
            <Text style={{marginLeft:120}}>{item.paid.toString().length}</Text> 
            <Text></Text>
            
            </View>
        )}
        keyExtractor={(index)=>index.toString()}
        />

       
        

    </View>
  )
}

export default ExportData

const styles = StyleSheet.create({
    textInputStyle:{
        backgroundColor: 'transparent',
        borderColor:"black",
        width:300,
        height:50,
        marginLeft:50,
        margin:20,
        borderWidth:1
      },
      headerRow: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        alingItems:"left",
        marginTop:20
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
        color:'black'
      },
    
      cell: {
        flex: 1,
        color:'black',
        textAlign: 'left',
      },
})
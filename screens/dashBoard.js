import React ,{useState,useEffect}from "react";
import {Text,FlatList,TouchableOpacity, SafeAreaView,StyleSheet,View,Alert} from 'react-native';
import realm, { getAllPatients,deletePatient,fetchPatientById,getTodaysPatients,fetchPaymentInfo} from "../database/patientSchema";
import {  Title,Card,IconButton, MD3Colors} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Dashboard =({navigation})=>
{ 
    const [showConfirm, setShowConfirm] = useState(false);
    let temp = ' ';
    
    const handleConfirm = () => {
        Alert.alert(
          'Confirm','Are you sure you want to continue?',
          [
            {
              text: 'Cancel',
              onPress: () => setShowConfirm(false),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                deletePatient(temp),setIsFocused(isFocused +  1),
                setShowConfirm(false);
              },
            },
          ],
          { cancelable: false },
        );
      };


    const [isFocused,setIsFocused] = useState(0);
    const Focused = useIsFocused();
    useEffect(() => {<FlatList></FlatList> }, [isFocused],Focused);

    var date = moment() .utcOffset('+05:30') .format('llll');
    let patients = getTodaysPatients();
    console.log(getAllPatients())
   
    return(
        <SafeAreaProvider>
          <Text style={{fontSize:25,color:"black",margin:20}}>{date}</Text>    
            <FlatList 
                style={{marginTop:30}}
                data = {patients}
                keyExtractor={(item)=>item._id}
                renderItem={({item})=>(
                    <Card style={{margin:5,marginLeft:15}} mode='outlined'>
                    <Card.Content><Title>{item.name}</Title></Card.Content>
                    <Card.Actions style ={{marginRight:15}}>
                    <IconButton icon ="watch" size={15} onPress={()=>{navigation.navigate('PatientHistory')}} color="#0000FF"/>
                    {/* <IconButton icon="delete" iconColor={MD3Colors.error50} size={15} onPress={() => {handleConfirm(),temp = item}}/> */}
                    <IconButton icon="send"  size={15} onPress={() => {fetchPatientById(item),navigation.navigate('completedSession')}}/>
                    
                    {showConfirm && (
                      <View>
                        <Text>Are you sure?</Text>
                        <TouchableOpacity onPress={handleConfirm}>
                        <Text>Yes</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <IconButton icon="application-edit" mode='outlined' onPress={() => {navigation.navigate('TherapistProfile')}} size={15} />
                    </Card.Actions>
                    </Card>
                    )}
                    numColumns={2}
                />
                <View style={styles.icons}>
                <IconButton  icon="plus-box"  size={45} iconColor={"#0096FF"} onPress={() => {navigation.navigate('CreatePatient')}}  />
                <IconButton  icon="account-cash"  size={45} iconColor={"#0096FF"}  onPress={() => {navigation.navigate('PaymentReminder')}}  />
                <IconButton  icon="cash-marker"   size={40}  iconColor={"#0096FF"} onPress={() => {navigation.navigate('AcknowledgePayment')}}  />
                <IconButton icon ="watch" size={35} iconColor={"#0096FF"} onPress={()=>{navigation.navigate('PatientHistory')}}/>
                </View>
        {/* {console.log(data._id)} */}
    </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
icons:{ 
flex: 1,    
flexDirection: 'row',
flexWrap: 'wrap',
marginTop:600,
position:"absolute",
marginLeft: 70
}
})

export default Dashboard;
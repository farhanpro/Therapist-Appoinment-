import React ,{useState,useEffect}from "react";
import {Text,FlatList,NativeModules,TouchableOpacity, SafeAreaView,StyleSheet,View,Alert} from 'react-native';
import realm, { getAllPatients,deletePatient,fetchPatientById,getTodaysPatients} from "../database/patientSchema";
import {  Title,Card,IconButton, MD3Colors} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

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
        <SafeAreaView>
            <Text style={{fontSize:25,color:"blue",margin:20}}>{date}</Text>    
            <FlatList 
                style={{marginTop:30}}
                data = {patients}
                keyExtractor={(item)=>item._id}
                renderItem={({item})=>(
                    <Card style={{margin:5,marginLeft:15}} mode='outlined'>
                    <Card.Content><Title>{item.name}</Title></Card.Content>
                    <Card.Actions style ={{marginRight:15}}>
                    <IconButton icon ="watch" size={15} onPress={()=>{fetchPatientById(item),navigation.navigate('completedSession')}} color="#90"/>
                    <IconButton icon="delete" iconColor={MD3Colors.error50} size={15} onPress={() => {handleConfirm(),temp = item}}/>
                    
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
                <IconButton  icon="plus-box" iconColor={MD3Colors.error50} size={45}   onPress={() => {navigation.navigate('CreatePatient')}}  />
                <IconButton  icon="account-cash"  iconColor={MD3Colors.error50} size={45}   onPress={() => {navigation.navigate('PaymentReminder')}}  />
                <IconButton  icon="cash-marker"  iconColor={MD3Colors.error50} size={40}   onPress={() => {navigation.navigate('AcknowledgePayment')}}  />
                
                </View>
        {/* {console.log(data._id)} */}
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
icons:{ 
flex: 1,    
flexDirection: 'row',
flexWrap: 'wrap',
marginTop:600,
position:"absolute",
marginLeft: 180
}
})

export default Dashboard;
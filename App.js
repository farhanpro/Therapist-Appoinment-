import { View, Text } from 'react-native'
import React from 'react'
import CreatePatient from './screens/createPatient';
import DashBoard from './screens/dashBoard'
import TherapistProfile from './screens/TherapistProfile'
import CompletedSessions from './screens/MarkSessionCmplt'
import PaymentReminder from './screens/PaymentReminder'
import AcknowledgePayment from './screens/AcknowledgePayment';
import ExportData from './screens/exportData';
import PatientHistory from './screens/patientHistory';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
       screenOptions={{
        headerShown: false
      }}
      >
        
          <Stack.Screen name= "Dashboard" component={DashBoard}/>  
          <Stack.Screen name = "CreatePatient" component={CreatePatient}/>  
         <Stack.Screen name="TherapistProfile" component={TherapistProfile}/> 
        <Stack.Screen name="completedSession" component={CompletedSessions}/> 
        <Stack.Screen name= "PaymentReminder" component={PaymentReminder}/>
        <Stack.Screen name= "AcknowledgePayment" component={AcknowledgePayment}/> 
        <Stack.Screen name="ExportData" component={ExportData}/>
        <Stack.Screen name="PatientHistory" component={PatientHistory}/> 
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
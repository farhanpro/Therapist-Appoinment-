import React, {useState} from 'react';
import {Button,SafeAreaView,ScrollView,StyleSheet,View,Text,RefreshControl,FlatList}from 'react-native';
import {TextInput,Card} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox'   
import {Dropdown} from 'react-native-element-dropdown';
import realm from '../database/patientSchema';
import { CenterFocusStrong } from '@mui/icons-material';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import moment from 'moment';
//import { CenterFocusStrong } from '@mui/icons-material';

//Time Related

let nextTime = 0;
let dayTimVal = " ";
const data = [
  {label: '04:00 - 05:00', value: '04:00 - 05:00'},
  {label: '03:00 - 04:00', value: '03:00 - 04:00'},
  {label: '02:00 - 03:00', value: '02:00 - 03:00'},
  {label: '01:00 - 02:00', value: '01:00 - 02:00'},
  {label: '12:00 - 01:00', value:'12:00 - 01:00'},
  {label: '11:00 - 12:00', value: '11:00 - 12:00'},
  {label: '10:00 - 11:00', value: '10:00 - 11:00'},
  {label: '09:00 - 10:00', value: '09:00 - 10:00'},
];

const data2 = [
  {id:1,txt:'Monday',isChecked:false},
  {id:2,txt:'Tuesday',isChecked:false},
  {id:3,txt:'Wednesday',isChecked:false},
  {id:4,txt:'Thrusday',isChecked:false},
  {id:5,txt:'Friday',isChecked:false},
  {id:6,txt:'Saturday',isChecked:false},
]

const CreatePatient = ({navigation}) => {

  const [products, setProducts] = useState(data2);

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  let selected = products.filter((product) => product.isChecked);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChange(item.id);
                  }}
                />
                <Text>{item.txt}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

      //Refresh Related
      const [refreshing, setRefreshing] = useState(false);

      const onRefresh = () => {
          setRefreshing(true);
          setText(" ");
          setParntName(' ');
          setwhatsAppNo(' ');
          setSecondaryNo(' ');
          setRefreshing(false);
          setChecked(false),
          TuesetChecked(false),
          WedsetChecked(false),
          ThrussetChecked(false),
          FrisetChecked(false),
          SatursetChecked(false),
          setValue(),
          setvalname([])
         
      };

      
  //Date Picker
  
  const [Patientdate, PatientsetDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // React native paper date picker 
  const [Birthdate, BirthsetDate] = useState(new Date());
  const [open2, setOpen2] =useState(false);



  

  // // checkbox related
  // const [checked, setChecked] = React.useState(false);
  // const [Tuechecked, TuesetChecked] = React.useState(false);
  // const [Wedchecked, WedsetChecked] = React.useState(false);
  // const [Thruschecked, ThrussetChecked] = React.useState(false);
  // const [Frichecked, FrisetChecked] = React.useState(false);
  // const [Saturchecked, SatursetChecked] = React.useState(false);
  // const [day, setday] = React.useState([]);
  // const [name,setname]  = React.useState(' ');

//Day Related 



  //input fields data
  const [text, setText] = useState(' ');
  const [parentName, setParntName] = useState(' ');
  const [whatsAppNo, setwhatsAppNo] = useState(' ');
  const [secondaryNo, setSecondaryNo] =useState(' ');

  //Time Related
  const [value, setValue] = useState();
  const [valname,setvalname] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const addPatient = () => {
    let _id = Date.now().toString();
    let date2 = Birthdate.toDateString(' ');
    let Patientdate2 = Patientdate.toDateString(' ');
    realm.write(() => {
      const Patient1 = realm.create('PatientTable', {
        _id: _id,
        name: text,
        birthDate: new Date(date2),
        patientSince: new Date(Patientdate2),
        parentName: parentName,
        whatsAppNo: whatsAppNo,
        secondaryNo: secondaryNo,
        status: 'Open',
        dayTime: dayTimVal

      });
    });
  
  };

  

  return (
    <View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <SafeAreaView>
          <Text style={styles.headlineLarge}>Create Profile</Text>
          <Text style={styles.subHeading}>Patient Info</Text>

          <View style={{marginVertical: 10, marginHorizontal: 8, padding: 8}}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Name"
              onChangeText={text => setText(text)}
            />
            <Text></Text>

            <Button
              style={{color: 'blue'}}
              title="PatientSince"
              onPress={() => setOpen(true)}
            />

            <DatePicker
              modal
              open={open}
              date={Patientdate}
              onConfirm={  (Patientdate) => {
                  setOpen(false),
                  PatientsetDate(Patientdate)   
                }}
                
              onCancel={() => {
                setOpen(false);
              }}
              mode="date"
            />
          
            <Text style={{color:"black"}}>Selected Patient Since Date : {Patientdate.toDateString()}</Text>
            
            <Button 
            style={{color:"blue"}}
            title="Birth Date"
            onPress={() => setOpen2(true)}
            />

            <DatePicker
            modal 
            open = {open2}
            date ={ Birthdate}
            onConfirm={(Birthdate)=>{
              setOpen2(false), 
              BirthsetDate(Birthdate)
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode="date"
            />
            <Text style={{color:"black"}}>Selected Birth Date : {Birthdate.toDateString()}</Text>

            
            <Text style={styles.subHeading}>Patient Info</Text>
            <Text></Text>
            <TextInput  
              style={styles.textInputStyle}
              placeholder="Parent Name"
              onChangeText={parentName => setParntName(parentName)}
            />

            <Text></Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="WhatsApp No"
              onChangeText={whatsAppNo => setwhatsAppNo(whatsAppNo)}
              keyboardType="numeric"
            />
            <Text></Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Secondary No"
              onChangeText={secondaryNo => setSecondaryNo(secondaryNo)}
              keyboardType="numeric"
            />
            <Text></Text>
            
            <View>
              <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
              <Text style={styles.text}>Selected </Text>
              <View style={{ flex: 1 }}>{renderFlatList(selected)}</View>
            </View>
   
            
                           
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default CreatePatient;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    height: 50,
    marginTop: 10,
    borderColor: 'black',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'black',
    position:'absolute',
    left : 35,
    top:8
  },


  boxex: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#00203FFF',
  },
  commonStyle: {
    width: 120,
    height: 40,
    fontSize: 25,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius:10,

  },

  container: {
    borderColor: 'blue',
    backgroundColor: 'black',
    padding: 16,
  },

  dropdown: {
    height: 40,
    width: 150,
    color:"Black",
    borderColor: 'black',
    borderWidth: 3,
    borderRadius:10,
    paddingHorizontal: 8,
    
    margin: 10,
  },

  label: {
    // position: 'absolute',
    //backgroundColor: 'red',
    height: 10,
    width: 5,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    color : "black"
  },
  selectedTextStyle: {
    fontSize: 15,
    color : "black"

  },
  iconStyle: {
    width: 20,
    height: 20,
  },


  headlineLarge: {
    color: 'grey',
    fontFamily: 'FontFamily',
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
    marginLeft: 80,
  },

  subHeading: {
    color: 'blue',
    fontFamily: 'FontFamily',
    alignContent:"center",
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 40,
    marginLeft: 115,
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color : "blue"
  },
  sectionDescription: {
    color : "blue",
    marginTop: 8,
    fontSize: 18,
    color : "blue",
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

import React, {useState} from 'react';
import {Button,ScrollView,StyleSheet,View,Text}from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {TextInput, Checkbox,IconButton,MD3Colors} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';   
import {Dropdown} from 'react-native-element-dropdown';
import realm from '../database/patientSchema';



//Time Related
let nextTime = 0;
let dayTimVal = " ";
let upcommingDay = " ";
let mondaytime = 'Monday Time';
let tuestime = 'Tuesday Time';
let wednestime = 'WednesdayTime';
let thrustime = 'Thursday Time';
let fritime = 'Friday Time';
let saturdaytime = 'SaturdayTime';


const data = [
   {lable: 'Select Time', value: 'Select Time'},
  {label: '09:00 - 10:00', value: '09:00 - 10:00'},
  {label: '10:00 - 11:00', value: '10:00 - 11:00'},
  {label: '11:00 - 12:00', value: '11:00 - 12:00'},
  {label: '12:00 - 01:00', value:'12:00 - 01:00'},
  {label: '01:00 - 02:00', value: '01:00 - 02:00'},
  {label: '02:00 - 03:00', value: '02:00 - 03:00'},
  {label: '03:00 - 04:00', value: '03:00 - 04:00'},
  {label: '04:00 - 05:00', value: '04:00 - 05:00'},
];

const CreatePatient = ({navigation}) => {
           
  //Date Picker
  const [Patientdate, PatientsetDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // React native paper date picker 
  const [Birthdate, BirthsetDate] = useState(new Date());
  const [open2, setOpen2] =useState(false);

  // checkbox related
  const [checked, setChecked] = React.useState(false);
  const [Tuechecked, TuesetChecked] = React.useState(false);
  const [Wedchecked, WedsetChecked] = React.useState(false);
  const [Thruschecked, ThrussetChecked] = React.useState(false);
  const [Frichecked, FrisetChecked] = React.useState(false);
  const [Saturchecked, SatursetChecked] = React.useState(false);
  const [day, setday] = React.useState([]);
  const [name,setname]  = React.useState(' ');

  //input fields data
  const [text, setText] = useState(' ');
  const [parentName, setParntName] = useState(' ');
  const [whatsAppNo, setwhatsAppNo] = useState(' ');
  const [secondaryNo, setSecondaryNo] =useState(' ');

  //Time Related
  const [value, setValue] = useState();
  const [valname,setvalname] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  
  const resetDropdown = () =>{
     mondaytime = 'Monday Time';
     tuestime = 'Tuesday Time';
     wednestime = 'WednesdayTime';
     thrustime = 'Thursday Time';
     fritime = 'Friday Time';
     saturdaytime = 'SaturdayTime';

  }
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
        status: upcommingDay,
        dayTime: dayTimVal

      });
    });
  
  };


  return (
    <View>
      <ScrollView>
        <SafeAreaProvider>
        <IconButton  icon="home" style={{position:"absolute",marginLeft:-1}} iconColor={"#0096FF"} size={40}  onPress={() => {navigation.navigate('Dashboard')}}  />
        <IconButton icon="doctor" style={{marginLeft:300}} iconColor={"#0096FF"} size={40}  onPress={() => {navigation.navigate('TherapistProfile')}}/>
          <Text style={styles.headlineLarge}>Create Profile</Text>
          <Text style={styles.subHeading}>Patient Info</Text>

          <View style={{marginVertical: 10, marginHorizontal: 8, padding: 8}}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Name"
              onChangeText={text => setText(text)}
            />
            <Text></Text>
            <View>
            <Text style={{position:'absolute',color:"black"}}>Birth Date : </Text>
            <TextInput
              style={{width:170,height:40,marginLeft:90,color:"black",backgroundColor:"transparent"}}
              placeholder= {Birthdate.toDateString()}
              onChangeText={text => setText(text)}
            />
            <IconButton 
            style ={{position:'absolute',marginLeft:280,marginTop:-5}}
            size={35}
            icon = "calendar"
            iconColor={"#0096FF"}
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
            </View>

            <Text></Text>
            <View>
             <Text style={{position:'absolute',color:"black"}}>Patient Since : </Text>
           <TextInput
              style={{width:170,height:40,marginLeft:90,color:"black",backgroundColor:"transparent"}}
              placeholder= {Patientdate.toDateString()}
              onChangeText={text => setText(text)}
            />
            <IconButton
            style ={{position:'absolute',marginLeft:280,marginTop:-5}}
              size={35}
              icon="calendar"
              iconColor={"#0096FF"}
              title="Patient Since"
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
              onCancel={() => {setOpen(false);}}
              mode="date"
            />
             </View> 
           

            <Text>{'\n'}</Text>

            <Text style={styles.subHeading}>Parent Info</Text>
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
            
            <Text>{'\n'}</Text>
            <Text style={styles.subHeading}>Secheduling Info</Text>
            <Text></Text>
            <View style={styles.parentView}>
              <View style={styles.commonStyle}>
              <Checkbox
                  
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={ () => {
                   
                     day.push("Monday") 
                    setChecked(!checked)}}
                />
                <Text style={styles.innerText}>Monday</Text>
                
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                itemTextStyle={{fontSize:15,width:45,color:"black"}}
                maxHeight={200}
                labelField="label"
                valueField={!isFocus ? 'Select Time' : 'Select Time'}
                placeholder={!isFocus ? ' ' : 'Monday Time'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={  item => {
                    mondaytime = item.value,
                   
                    setValue(item.value);
                   valname.push({ 
                     day: day[nextTime],
                     id: nextTime++,
                     time:item.value
                   }),
                   setIsFocus(false);
                 }}
              />     
              <Text style={styles.timeSelector}>{mondaytime}</Text> 
                    
            </View>
                 <View style ={styles.parentView}>
                 <View style={styles.commonStyle}>
                <Text style={styles.innerText}>Tuesday</Text>
                <Checkbox 
                  
                  status={Tuechecked ? 'checked' : 'unchecked'}
                  onPress={ () => {
                   
                    day.push("Tuesday")  ,   
                    TuesetChecked(!Tuechecked);
                  }}
                />
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                itemTextStyle={{fontSize:15,width:45,color:"black"}}
                maxHeight={200}
                labelField="label"
                valueField={!isFocus ? ' ' : '...'}
                placeholder={!isFocus ? '   ' : 'Tuesday Time'}
                
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={ item => 
                  {
                     setValue(item.value);
                     tuestime = item.value
                    valname.push({
                      day: day[nextTime],
                      id: nextTime++,
                      time: item.value
                      
                    })
                  }
                }
              />
              <Text style={styles.timeSelector}>{tuestime}</Text>
                </View>
            <View style={styles.parentView}>
              <View style={styles.commonStyle}>
                <Text style={styles.innerText} >Wednesday</Text>
                <Checkbox
                  status={Wedchecked ? 'checked' : 'unchecked'}
                  onPress={ () => {
                    
                    day.push("Wednesday")
                     WedsetChecked(!Wedchecked);
                  }}
                />
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                itemTextStyle={{fontSize:15,width:45,color:"black"}}
                maxHeight={200}
                valueField={!isFocus ? '  ' : '...'}
                labelField="label"
                placeholder={!isFocus ? '  ' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={ item => 
                  {
                    setValue(item.value);
                    wednestime = item.value
                    valname.push({

                      day: day[nextTime],
                      id: nextTime++,
                      time: item.value
                      
                    })
                  }
              }
              />
              <Text style={styles.timeSelector}>{wednestime}</Text>
            </View>
            <View style={styles.parentView}>
            <View style={styles.commonStyle}>
                <Text style={styles.innerText}>Thursday</Text>
                <Checkbox
                  status={Thruschecked ? 'checked' : 'unchecked'}
                  onPress={ () => {
                     setname('Thursday');
                    day.push("Thursday") 
                    ThrussetChecked(!Thruschecked);
                  }}
                />
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                itemTextStyle={{fontSize:15,width:45,color:"black"}}
                maxHeight={300}
                valueField={!isFocus ? ' ' : '...'}
                labelField="label"
                placeholder={!isFocus ? ' ' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={ item => 
                  {
                    thrustime = item.value
                     setValue(item.value);
                    valname.push({
                      day: day[nextTime],
                      id: nextTime++,
                      time: item.value
                      
                    })
                  }
              }
              />
              <Text style={styles.timeSelector}>{thrustime}</Text>
            </View>
              <View style ={styles.parentView}>
              <View style={styles.commonStyle}>
                <Text style={styles.innerText} >Friday</Text>
                <Checkbox
                  status={Frichecked ? 'checked' : 'unchecked'}
                  onPress={ () => {
                            setname('Friday');
                    day.push("Friday")
                    
                    FrisetChecked(!Frichecked);
                  }}
                />
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                itemTextStyle={{fontSize:15,width:45,color:"black"}}
                maxHeight={300}
                valueField={!isFocus ? ' ' : '...'}
                labelField="label"
                placeholder={!isFocus ? ' ': '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => 
                  {
                    fritime = item.value
                      setValue(item.value);
                      valname.push({
                      day: day[nextTime],
                      id: nextTime++,
                      time: item.value,
                      
                    })
                  }
              }
              />
              <Text style={styles.timeSelector} >{fritime}</Text>
              </View>
            <View style={styles.parentView}>
              <View style={styles.commonStyle}>
                <Text style={styles.innerText}>Saturday</Text>
                <Checkbox
                  status={Saturchecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setname('Saturday');
                    day.push("Saturday"), 
                    SatursetChecked(!Saturchecked);
                  }}
                />
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                itemTextStyle={{backgroundColor:"#87CEEB",fontSize:15,width:45,color:"black"}}
                labelField="label"
                valueField={!isFocus ? "  ": '...'}
                value={value}
                placeholder={!isFocus ? ' ' : '...'}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}

                onChange={ item => 
                  {
                    saturdaytime = item.value
                    setValue(item.value);
                    valname.push({
                      day: day[nextTime],
                      id: nextTime++,
                      time: item.value,
                     
                    })
                  
                  }
              }
              />
              <Text style={styles.timeSelector} >{saturdaytime}</Text>
            </View>
          </View>
          <View></View>

          <View>
            <Button
              style={{fontSize: 20, color: 'green'}}
              styleDisabled={{color: 'red'}}
              onPress={ async () => {
                setday(day),
                dayTimVal = JSON.stringify(valname),
                upcommingDay = valname[0].day;
                setvalname(dayTimVal),
                addPatient(),
                resetDropdown(),
                navigation.navigate('Dashboard'),
                nextTime = 0;
                console.log(...valname);
              }}
              title="Save">
              Save
            </Button>
            
          </View>
        </SafeAreaProvider>
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
  timeSelector: 
  {
    position:'absolute',
    color:'black',
    marginLeft:180
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
textInputStyle:{
  backgroundColor: 'transparent',
  borderColor:"black",
  borderWidth:1
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
    width: 200,
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
    height: 10,
  },


  headlineLarge: {
    color: 'grey',
  
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
    marginLeft: 80,
  },

  subHeading: {
    color: "#0096FF",
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

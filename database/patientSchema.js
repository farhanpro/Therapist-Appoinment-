import Realm from 'realm';
import moment from 'moment';

export const daytime = {
  name: 'daytime',
  embedded: true,
  properties: {
    day: {type: 'list', objectType: 'string'},
    time: {type: 'list', objectType: 'string'},
  },
};

export const completedSessions = {
  name: 'completedSessionsd',
  properties: {
    session_Id: 'string',
    patient_Id: 'string',
    date: 'date',
    time: 'string', 
    notes: 'string',
    paid: 'bool',
  },
};
//timeslot id_  slot  will be used in  create patient marksessioncomplete

export const patientProfile = {
  name: 'PatientTable',
  properties: {
    _id: 'string',
    name: 'string',
    birthDate: 'date',
    patientSince: 'date',
    parentName: 'string',
    whatsAppNo: 'string',
    secondaryNo: 'string',
    dayTime: 'string',
    status: 'string',
    time: 'string',
  },
  primaryKey: '_id',
};

export const TherapistProfile = {
  name: 'TherapistProfile',
  properties: {
    _id: 'string',
    name: 'string',
    address: 'string',
    pan: 'string',
    phone: 'string',
    rate: 'int',
    email: 'string',
  },
  primaryKey: '_id',
};

//To Add therapist
export let addTherapist = (_id, name, address, pan, phone, rate, email) => {
  realm.write(() => {
    const therapist = realm.create('TherapistProfile', {
      _id: _id,
      name: name,
      address: address,
      pan: pan,
      phone: phone,
      rate: rate,
      email: email,
    });
  });
};

//Completed Session DB
export let completedSession = (session_Id,patient_Id,date,time,notes,paid,) => {
  realm.write(() => {
    const markedSession = realm.create('completedSessionsd', {
      session_Id: session_Id,
      patient_Id: patient_Id,
      date: date,
      time: time,
      notes: notes,
      paid: paid,
    });
  });
};

//function to handle undefined error from in payment reminder  
export const handleUndefinedErrors = () =>
{
  

}

// function fo fetch unpaid patients 
export const  getUnpaidPatients = () =>{
  let unpaidPatientsData = realm.objects('completedSessionsd').filtered(`paid == false`); 
  let data = unpaidPatientsData.map(item => item.patient_Id)  
  function removeDublicate(data) { return data.filter((item,index)=>data.indexOf(item)=== index)}
  console.log('unique data : ', removeDublicate(data));
  var MyData = [];
  for(let i=0;i<removeDublicate(data).length;i++)
  {  
  let  getDetail = realm.objects('PatientTable').filtered(` _id == '${removeDublicate(data)[i]}' `);
  MyData.push(  getDetail[0].name);
  }
  console.log("Get Details outside of loop :",MyData);
  return MyData;
}

//To get Appoinments for today's appoinments
export const getTodaysPatients = () => {
  let today = moment().format('dddd');
  let now = new Date();
  let hours = ((now.getHours()) % 12 || 12 )  ;
  let hours2 = ((now.getHours()+1)  % 12 || 12 ) ;
  //let hours2 = (now2.getHours() % 12 || 12 + 1);
  //console.log(today)
  //console.log(hours);
  //console.log(hours2);

  let todaysAppoinments = realm
  .objects('PatientTable')
  .filtered(`dayTime != '[]' && status == '${today}' && time => "${hours}:00-${hours2}:00"`);
   return todaysAppoinments;
};

//For Mark Session Complete to fetch patient data
var myTask = {};
export const fetchPatientById = item => {
  myTask = realm.objectForPrimaryKey('PatientTable', item._id);
};
export const getpatient = () => {
  return myTask;
};

//For fetching All Session info of an spefic paitent
export const fetchPaymentInfo = itemValue => {
  let userinfo = realm.objects('PatientTable').filtered(`name == '${itemValue}'`);
 // console.log("User Info : ",userinfo);
  let paymentInfo = realm.objects('completedSessionsd').filtered(`patient_Id == '${userinfo[0]._id}' && paid == false`);
  return {userinfo, paymentInfo};
};

// For fetching patient History
export const patientHistory = itemValue => {
  let userinfo = realm.objects('PatientTable').filtered(`name == '${itemValue}'`);
  let paymentInfo = realm.objects('completedSessionsd').filtered(`patient_Id == '${userinfo[0]._id}' `);
  return paymentInfo;
};

//For exporting data to
export const exportDataEmail = itemValue => {
  let userinfo = realm.objects('PatientTable').filtered(`name == '${itemValue}'`);
  let paymentInfo = realm.objects('completedSessionsd').filtered(`patient_Id == '${userinfo[0]._id}' `);
  let toExportData = [];
  toExportData.push(paymentInfo, toExportData);
  return toExportData;
};

//To get paymet not paid list in exporting data to email
export const unpaidSessions = () => {
  let unpaidSessions = realm.objects('completedSessionsd').filtered(`paid == false`);
  //console.log("Unpaid Sessions Comming from function := ",unpaidSessions);
  return unpaidSessions;
};

//for acknowledge payments
export const  acknowledgePayment = (paymentInfo)=>
{
  realm.write(()=>{
    if('session_Id'  == undefined)
    {
      console.log("Nothing to show")
    }
    else {
    paymentdone =  realm.objects('completedSessionsd').filtered(`session_Id == '${paymentInfo[0].session_Id}'`)[0];
    console.log(paymentdone);
    paymentdone.paid = true;
    console.log(paymentInfo);
    }
  })

}


//completedSessions
export let getMarkedSeessions = () => {
  return realm.objects('completedSessionsd');
};
export let deleteAllMrkCmplt = () => {
  realm.write(() => {
    realm.delete(getMarkedSeessions());
  });
};


//Therapist
export let getTherapist = () => {
  return realm.objects('TherapistProfile');
};


//To  delete all Therapist
export let deleteAllTherapist = () => {
  realm.write(() => {
    realm.delete(getTherapist());
  });
};


//To get all Patient
export const getAllPatients = () => {
  return realm.objects('PatientTable') ;
};


//Delete all patient data
export const deleteAllPatients = () => {
  realm.write(() => {
    realm.delete(getAllPatients());
  });
};

//Delete Single Patient
export const deletePatient = item => {
  realm.write(() => {
    try {
      let myPatient = realm.objectForPrimaryKey('PatientTable', item._id);
      realm.delete(myPatient);
      myPatient = null;
      realm.refresh();
    } 
    catch (error) {
      console.log('delete', error);
    }
  });
};

// Function to delete daytime 0th element after mark session complete
export const deleteDaytime = patient_Id => {

  const patient = realm.objectForPrimaryKey('PatientTable', patient_Id);
  var obj = JSON.parse(patient.dayTime);
  obj.shift();
  realm.write(() => {
      if (obj[0] == undefined  ||obj.length == 0) {
        patient.status = "done";
        patient.time = "done";
      } else {
        patient.status = obj[0].day;
        patient.time = obj[0].time;
      }});
      let obj2 = JSON.stringify(obj);
      realm.write(() => {
      patient.dayTime = obj2;
      });
      
  };

let realm = new Realm({
  path: 'PatientApp.realm',
  schema: [patientProfile, daytime, TherapistProfile, completedSessions],
  schemaVersion: 0,
});

export default realm;

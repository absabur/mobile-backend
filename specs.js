// const specs = [
//     {
//         name: "",
//         category: {
//             id: "",
//             value: ""
//         }
//     }
// ]

// General
//     BRAND
//     AVAILABILITY
//     YEAR
//     PRICE

// SIM
//     SIZE
//     MULTIPLE

// Body
//     FORM FACTOR
//     HEIGHT
//     THICKNESS
//     IP CERTIFICATE
//     BACK MATERIAL
//     KEYBOARD
//     WIDTH
//     WEIGHT
//     COLOR
//     FRAME MATERIAL

// Platform
//     OS
//     CHIPSET
//     MIN OS VERSION
//     CPU CORES

// Display
//     RESOLUTION
//     SIZE
//     TECHNOLOGY
//     REFRESH RATE
//     DENSITY
//     NOTCH
//     HDR

// Main camera
//     RESOLUTION
//     F-NUMBER
//     VIDEO
//     CAMERAS
//     TELEPHOTO
//     FLASH
//     OIS
//     ULTRAWIDE

// Selfie camera
//     RESOLUTION
//     FRONT FLASH
//     POP-UP CAMERA
//     DUAL CAMERA
//     UNDER DISPLAY CAMERA
//     OIS

// Audio
//     DUAL SPEAKERS
//     Sterio Speakers

// Sensors
//     ACCELEROMETER
//     BAROMETER
//     GYRO
//     HEART RATE
//     COMPASS
//     FINGERPRINT
//     PROXIMITY

// Connectivity
//     WLAN (WIFI)
//     GPS
//     USB
//     NFC
//     BLUETOOTH
//     INFRARED
//     FM RADIO

// Battery
//     CAPACITY
//     WIRED CHARGING
//     REMOVABLE
//     WIRELESS CHARGING

// make all them into array , for example

// [
//     {
//         name: "Brand",
//         category: {
//             id: "670d09257343984e7bed933f",
//             value: "Genneral"
//         }
//     },
//     {
//         name: "AVAILABILITY",
//         category: {
//             id: "670d09257343984e7bed933f",
//             value: "Genneral"
//         }
//     }
// ]

// you will get the id from your categories array, match the name with categoryValue and add categoryId

// const categories = [
//   { _id: "670d09257343984e7bed933f", name: "General" },
//   { _id: "670d09257343984e7bed9340", name: "Network" },
//   { _id: "670d09257343984e7bed9341", name: "SIM" },
//   { _id: "670d09257343984e7bed9342", name: "Body" },
//   { _id: "670d09257343984e7bed9343", name: "Platform" },
//   { _id: "670d09257343984e7bed9344", name: "Memory" },
//   { _id: "670d09257343984e7bed9345", name: "Display" },
//   { _id: "670d09257343984e7bed9346", name: "Main camera" },
//   { _id: "670d09257343984e7bed9347", name: "Selfie camera" },
//   { _id: "670d09257343984e7bed9348", name: "Audio" },
//   { _id: "670d09257343984e7bed9349", name: "Sensors" },
//   { _id: "670d09257343984e7bed934a", name: "Connectivity" },
//   { _id: "670d09257343984e7bed934b", name: "Battery" },
// ];

// const attributes = [
//   { name: "BRAND", category: "General" },
//   { name: "AVAILABILITY", category: "General" },
//   { name: "YEAR", category: "General" },
//   { name: "PRICE", category: "General" },
//   { name: "2G", category: "Network" },
//   { name: "3G", category: "Network" },
//   { name: "4G", category: "Network" },
//   { name: "5G", category: "Network" },
//   { name: "SIZE", category: "SIM" },
//   { name: "MULTIPLE", category: "SIM" },
//   { name: "FORM FACTOR", category: "Body" },
//   { name: "HEIGHT", category: "Body" },
//   { name: "THICKNESS", category: "Body" },
//   { name: "IP CERTIFICATE", category: "Body" },
//   { name: "BACK MATERIAL", category: "Body" },
//   { name: "KEYBOARD", category: "Body" },
//   { name: "WIDTH", category: "Body" },
//   { name: "WEIGHT", category: "Body" },
//   { name: "COLOR", category: "Body" },
//   { name: "FRAME MATERIAL", category: "Body" },
//   { name: "OS", category: "Platform" },
//   { name: "CHIPSET", category: "Platform" },
//   { name: "MIN OS VERSION", category: "Platform" },
//   { name: "CPU CORES", category: "Platform" },
//   { name: "RESOLUTION", category: "Display" },
//   { name: "SIZE", category: "Display" },
//   { name: "TECHNOLOGY", category: "Display" },
//   { name: "REFRESH RATE", category: "Display" },
//   { name: "DENSITY", category: "Display" },
//   { name: "NOTCH", category: "Display" },
//   { name: "HDR", category: "Display" },
//   { name: "RESOLUTION", category: "Main camera" },
//   { name: "F-NUMBER", category: "Main camera" },
//   { name: "VIDEO", category: "Main camera" },
//   { name: "CAMERAS", category: "Main camera" },
//   { name: "TELEPHOTO", category: "Main camera" },
//   { name: "FLASH", category: "Main camera" },
//   { name: "OIS", category: "Main camera" },
//   { name: "ULTRAWIDE", category: "Main camera" },
//   { name: "RESOLUTION", category: "Selfie camera" },
//   { name: "FRONT FLASH", category: "Selfie camera" },
//   { name: "POP-UP CAMERA", category: "Selfie camera" },
//   { name: "DUAL CAMERA", category: "Selfie camera" },
//   { name: "UNDER DISPLAY CAMERA", category: "Selfie camera" },
//   { name: "OIS", category: "Selfie camera" },
//   { name: "3.5MM JACK", category: "Audio" },
//   { name: "DUAL SPEAKERS", category: "Audio" },
//   { name: "Sterio Speakers", category: "Audio" },
//   { name: "ACCELEROMETER", category: "Sensors" },
//   { name: "BAROMETER", category: "Sensors" },
//   { name: "GYRO", category: "Sensors" },
//   { name: "HEART RATE", category: "Sensors" },
//   { name: "COMPASS", category: "Sensors" },
//   { name: "FINGERPRINT", category: "Sensors" },
//   { name: "PROXIMITY", category: "Sensors" },
//   { name: "WLAN (WIFI)", category: "Connectivity" },
//   { name: "GPS", category: "Connectivity" },
//   { name: "USB", category: "Connectivity" },
//   { name: "NFC", category: "Connectivity" },
//   { name: "BLUETOOTH", category: "Connectivity" },
//   { name: "INFRARED", category: "Connectivity" },
//   { name: "FM RADIO", category: "Connectivity" },
//   { name: "CAPACITY", category: "Battery" },
//   { name: "WIRED CHARGING", category: "Battery" },
//   { name: "REMOVABLE", category: "Battery" },
//   { name: "WIRELESS CHARGING", category: "Battery" },
// ];

// const result = attributes.map((attr) => {
//   const category = categories.find((cat) => cat.name === attr.category);
//   return {
//     name: attr.name,
//     category: {
//       id: category._id,
//       value: category.name,
//     },
//   };
// });

// console.log(result);

// {
//   "category": {
//     id: "670d09257343984e7bed9349",
//     value: "Sensors"
//   },
//   "specificationName": {
//     id: "670d37ae244831a7685dbc1e",
//     value: "FINGERPRINT"
//   },
//   "value": "",
// }

// let cate = [
//   {
//     _id: new ObjectId("670d09257343984e7bed933f"),
//     name: "General",
//   },
// ];
// let specs = [
//   {
//     category: {
//       id: new ObjectId("670d09257343984e7bed933f"),
//       value: "General",
//     },
//     _id: new ObjectId("670d0e2b7343984e7bf2f8cd"),
//     name: "BRAND",
//   },
// ];
// let filterValues = [
//   {
//     category: {
//       id: new ObjectId("670d09257343984e7bed933f"),
//       value: "General",
//     },
//     specificationName: {
//       id: new ObjectId("670d0e2b7343984e7bf2f8ce"),
//       value: "AVAILABILITY",
//     },
//     _id: new ObjectId("670d29047343984e7b1039b0"),
//     value: "Available",
//   },
// ];

// let specifications = [
//   {
//     categoryId: new ObjectId("670d09257343984e7bed933f"),
//     categoryValue: "General",
//     specs: [
//       {
//         specKeyId: new ObjectId("670d0e2b7343984e7bf2f8cd"),
//         specKey: "BRAND",
//         filterValues: [
//           {
//             filterId: new ObjectId("670d29047343984e7b1039b0"),
//             filterValue: "Available",
//           },
//         ],
//       },
//     ],
//   },
// ];

// let array1 = [
//   {
//     categoryId: "670d09257343984e7bed933f",
//     categoryValue: "General",
//     specId: "670d0e2b7343984e7bf2f8ce",
//     specValue: "AVAILABILITY",
//     updatedAt: "2024-10-16T04:20:18.246Z",
//     value: "Available",
//     _id: "670d29047343984e7b1039b0",
//   },
// ];
// let array2 = [
//   {
//     categoryId: "670d09257343984e7bed933f",
//     categoryValue: "General",
//     specId: "670d0e2b7343984e7bf2f8ce",
//     specValue: "AVAILABILITY",
//     value: "custom value",
//   },
// ];
// "i have this 2 array. from thoose array i want the bellow array. there are more than one object in both arrays can have same or different categories and specs, if no value in custom then the value is empty, if not data in filterValues, the array should empty"
// let specifications = [
//   {
//     categoryId: "670d09257343984e7bed933f",
//     categoryValue: "General",
//     specs: [
//       {
//         specId: "670d0e2b7343984e7bf2f8ce",
//         specValue: "AVAILABILITY",
//         value: "custom value",
//         filterValues: [
//           {
//             filterId: "670d29047343984e7b1039b0",
//             filterValue: "Available",
//           },
//         ],
//       },
//     ],
//   },
// ];

// const [specs, setSpecs] = useState([]);
// <div
//   style={{
//     padding: "5px",
//     backgroundColor: "#0000001f",
//     marginBottom: "5px",
//   }}
// >
//   <input type="checkbox" />
//   <span key={value.filterId} className={`searchable`}>
//     {value.filterValue}
//   </span>
// </div>;
// if the input box is checked, then add this   {
//     categoryId: "670d09257343984e7bed933f",
//     categoryValue: "General",
//     specId: "670d0e2b7343984e7bf2f8ce",
//     specValue: "AVAILABILITY",
//     value: "Available",
//     _id: "670d29047343984e7b1039b0",
//   } object to the spces state, if unchecked, then remove from state

// const [value, setValue] = useState([]);
// <input type="text" placeholder="custom value" />
// do the same thing for the input, if value is Empty, remove from state, else add to state , check the categroyId and specId both for unique identification{
//     categoryId: "670d09257343984e7bed933f",
//     categoryValue: "General",
//     specId: "670d0e2b7343984e7bf2f8ce",
//     specValue: "AVAILABILITY",
//     value: "custom value",
//   }

// const chipsets = [
//   2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
//   2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
// ];

// const jsonArray = chipsets.map((chipset) => ({
//   categoryId: { $oid: "649c8f2b10b7995c3f1a0e01" },
//   categoryValue: "General",
//   specId: { $oid: "671108966652f382c07fcc04" },
//   specValue: "Year",
//   value: chipset,
// }));

// console.log(JSON.stringify(jsonArray, null, 2));

import firebase from "../database/firebase";
const loadUserData = async () => {
    const auth = firebase.auth();
  try {
    // Get the currently authenticated user
    const user = auth.currentUser;
    if (user) {
      // Use the user's UID or email to retrieve data from Firestore
      const userId = user.uid; // Use UID to identify the user
      const clinicDoc = await firebase.firestore().collection('Clinic').doc(userId).get();
      const ownerDoc = await firebase.firestore().collection("Owner").doc(userId).get();
    
      if (clinicDoc.exists) {
        console.log("Clinic Exist")
        const clinicData = clinicDoc.data();
        return {
          user: {
            uid: user.uid,
            email: user.email,
            address:clinicData.address,
            certifictte:clinicData.certifictte,
            name:clinicData.name,
            startTime:clinicData.startTime,
            endTime:clinicData.endTime,
            tel:clinicData.tel,
            vetName:clinicData.vetName,
            clinicImage:clinicData.clinicImage,
            addressDescription:clinicData.addressDescription
            // Add more user data fields as needed
          },
          role: "Clinic" // Assuming you store the user's role in Firestore
        };
      }

     else if (ownerDoc.exists) {
        console.log("Owner Exist")
        const ownerData = ownerDoc.data();
        return {
          user: {
            uid: user.uid,
            email: user.email,
            birthDate:ownerData.birthDate,
            firstName:ownerData.firstName,
            lastName:ownerData.lastName,
            phone:ownerData.phone,
            // Add more user data fields as needed
          },
          role: "Owner" // Assuming you store the user's role in Firestore
        };
      }
      else{
        console.log("User not Exist");
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  return null; // Return null if no user is authenticated or data couldn't be loaded
};

export default loadUserData;

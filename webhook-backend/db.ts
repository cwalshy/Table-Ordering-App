import firebase from 'firebase';
const Firestore = require('@google-cloud/firestore');
// connect to firestore account
const serviceAccountPath = './service-accounts/' + process.env.SERVICE_ACCOUNT_FILE_NAME;
const admin = require('firebase-admin');

export const db = new Firestore({
    projectID: process.env.PROJECT_ID,
    keyFilename: serviceAccountPath
});



  export async function getDocData(docPath: any) {

    const snap = await db.doc(docPath).get();
    return snap.data();

}

export function CallPath() {
}
export async function postOrder(id: any, data: any) {
 

    const res = await db.collection('orders').doc(id).set(data).catch((err: any) => console.log(err))

}



import { getFirestore, getDocs, getDoc, doc, setDoc, collection, query, where } from 'firebase/firestore'

export const db = getFirestore()
export const useGetSingleDocument = async (firebaseCollection, id, specfic) => {
    const docRef = doc(db, firebaseCollection, id);
    const docSnap = await getDoc(docRef);
    
    if(!specfic) return docSnap.data()         
        
    // return specific record
    if(specfic) {       
        let getKey = ''
        Object.keys(docSnap.data()).map(key => {
            if(key === specfic) {       
                getKey = key
            }
        })                
       return docSnap.data()[getKey]
    }               
}

export const getQueryGroup = async (targetCollection, toGrab, type, id) => {
    const queryRef = collection(db, targetCollection)
    const tweetQuery = query(queryRef, where(toGrab, type, id));
    
    const snapShot = await getDocs(tweetQuery);
    const returnData = []
    snapShot.forEach(doc => {      
        const collectionObj = {
            id: null,
            data: null
        }
        collectionObj.id = doc.id
        collectionObj.data = doc.data()

        returnData.push(collectionObj)
    })

    return returnData
}

export const getFullCollection = async (targetCollection) => {
    const colRef = collection(db, targetCollection);
    const docsSnap = await getDocs(colRef);
    const returnData = []

    docsSnap.forEach(doc => {
        const collectionObj = {
            id: null,
            data: null
        }
        collectionObj.id = doc.id
        collectionObj.data = doc.data()

        returnData.push(collectionObj)
    })

    return returnData    
}
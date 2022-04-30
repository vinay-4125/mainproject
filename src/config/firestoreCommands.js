//! addData

function AddingData() {
    async function addData() {
        try {
            await addDoc(collection(DB,"collectionName"),{fields: "fields",fields: "fields"})
        } catch (error) {
            console.log(error)
        }
    }
}

//! getData

async function getData() {
   try {
       const users = await getDocs(collection(DB,"collectionName"),{
           fields:"fields",
           fields:"fields",
       })
       //? to add data to a array 
       const usersArray = [];
       users.forEach((doc)=>{
           const obj = {
               id: doc.id,
               ...doc.data(),
           };
           usersArray.push(obj);
       })
   } catch (error) {
       console.log(error)
   } 
}

//! to add data to firestore

function addProductsData(){
    filename.map(async(product)=>{
        try {
            await addDoc(collecction(DB,"collectionName"),product); 
        } catch (error) {
            console.log(error)
        }
    })
}


//! to get only one product/data at a time

async function getProduct(){
    try {
        const productinfo = await getDoc(doc(DB,"collectionName",params.productid))//params.productid is parameter pass to the url
        // to get the data use productinfo.data()
    } catch (error) {
        console.log(error)
    }
}
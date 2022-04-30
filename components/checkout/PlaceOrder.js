import Image from "next/image";
import React, { useState } from "react";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  List,
  ListItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../src/context/UserAuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../src/config/firebase.config";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);

  const user = useUserAuth();
  const router = useRouter();
  const [razorResponse, setRazorResponse] = useState();

  const persist = JSON.parse(localStorage.getItem("persist:cartStore"));
  const persistCartItems = JSON.parse(persist.cartItems);
  // console.log(JSON.parse(persist.cartItems))

  const previousData = JSON.parse(localStorage.getItem("shippingDetails"));
  const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

  const totalPrice = cart.cartTotalAmount + 70;
  console.log(totalPrice);

  //  const initializeRazorpay = () => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";

  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };

  //     document.body.appendChild(script);
  //   });
  // };

  // const makePayment = async () => {
  //   const res = await initializeRazorpay();

  //   if (!res) {
  //     alert("Razorpay SDK Failed to load");
  //     return;
  //   }

  //   // Make API call to the serverless API
  //   const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
  //     t.json()
  //   );
  //   console.log(data);
  //   var options = {
  //     key: "rzp_test_LPL0xs8wAB9gET", // Enter the Key ID generated from the Dashboard
  //     name: "Anna Purna.",
  //     currency: data.currency,
  //     amount: data.amount,
  //     order_id: data.id,
  //     description: "Thankyou for your test donation",
  //     image: "/medical.png",
  //     handler: function (response) {
  //       // Validate payment at server - using webhooks is a better idea.
  //       console.log(response.razorpay_payment_id);
  //       console.log(response.razorpay_order_id);
  //       console.log(response.razorpay_signature);
  //     },
  //     prefill: {
  //       name: "Vinay Chaudhari",
  //       email: "abc@gmail.com",
  //       contact: "9999999999",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_LPL0xs8wAB9gET",
      currency: "INR",
      amount: amount * 100,
      name: "Anna Purna.",
      description: "Thanks for purchasing",
      image: "",

      handler: function (response) {
        // toast.success(response.razorpay_payment_id);
        setRazorResponse(response.razor_payment_id)
        toast.success("Payment Successfully");
        router.push('/');
      },
      prefill: {
        name: previousData.fullname,
        email: user.user.email,
        contact: previousData.mobileno,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const placeOrderHandlerForCOD = async() =>{
    const userDetails = user.user;
    const { displayName, email, uid, photoURL } = userDetails;
    const { cartItems, cartTotalAmount, cartTotalQuantity } = cart;
    const orderObj = {
      user: {
        displayName,
        email,
        uid,
        photoURL,
      },
      shippingDetails: previousData,
      paymentMethod,
      cart: {
        cartItems,
        cartTotalAmount,
        cartTotalQuantity,
      },
      totalPrice,
    };
    toast.success("Order placed successfully")
    setTimeout(() => {
      router.push('/')
    },2000)

    //*  --------------Main function---------------

    const orderDocRef = await addDoc(collection(db, "orders"), {
      orderObj,
      uid,
      timestamp: serverTimestamp(),
    });
  }

  const placeOrderHandler = async () => {
    // console.log(user.user)
    // router.push("/paymentGateway");
    const userDetails = user.user;
    const { displayName, email, uid, photoURL } = userDetails;
    const { cartItems, cartTotalAmount, cartTotalQuantity } = cart;
    const orderObj = {
      user: {
        displayName,
        email,
        uid,
        photoURL,
      },
      shippingDetails: previousData,
      paymentMethod,
      cart: {
        cartItems,
        cartTotalAmount,
        cartTotalQuantity,
      },
      totalPrice,
    };
    displayRazorpay(totalPrice);

    // const sendingData = await axios.post("/api/razorpay", orderObj);
    // console.log(sendingData);
    // makePayment();

    //*  --------------Main function---------------

    const orderDocRef = await addDoc(collection(db, "orders"), {
      orderObj,
      uid,
      timestamp: serverTimestamp(),
    });
    // console.log(orderDocRef.id, uid);

    //   const updateTimestamp = await updateDoc(docRef, {
      //     timestamp: serverTimestamp()
      // });
      
      //* ----------------------------------------
    // try {
    //   const querySnapshot = await getDocs(collection(db, "orders"));
    //   const allOrdersData = [];
    //   querySnapshot.forEach((doc) => {
    //     const obj = {
    //       id: doc.id,
    //       ...doc.data(),
    //     };
    //     // console.log(obj.orderObj.user.uid)
    //     allOrdersData.push(obj);
    //   });
    //   // console.log(allOrdersData[0].orderObj.uid);
    //     const que = allOrdersData.some((u) => u.uid === `${uid}`);
    //     console.log(que);
    //     if(que){
    //       console.log("order array exist")
    //     }else{
    //       console.log("else code")
    //     }
    // } catch (error) {
    //   console.log(error);
    // }


    // let userDocID;
    // const userRef = collection(db, "users");
    // const userDoc = query(userRef, where("uid", "==", `${uid}`));
    // const querySnapshot = await getDocs(userDoc);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   userDocID = doc.id;
    //     console.log(userDocID)
    // });

    // const docRef = doc(db,"users",`${userDocID}`);
    // await setDoc(docRef,{
    //     orders: doc(db, "orders", orderDocRef.id),
    // },{merge: true})

    // const docRef = await addDoc(
    //   collection(db, "users"),
    //   where("id", "==", `${userDocID}`),
    //   {
    //     orders: doc(db, "orders", orderDocRef.id),
    //   }
    // );

    // const addOrderReference = await addDoc(doc(userRef, `${userDocID}`),{
    //   orders: doc(db, "orders", orderDocRef.id),
    // })

    // let orderArray = [];
    //   const queryOrder = query(collection(db,"users"),where("uid","==",`${uid}`))
    //   onSnapshot(queryOrder,(querySnapshot)=>{
    //     querySnapshot.forEach(async (orderDoc) => {
    //       if (orderDoc.data().orders) {
    //           const userRef = orderDoc.data().orders;
    //           getDoc(userRef)
    //               .then((res) => {
    //                   console.log(res.data());
    //               })
    //       }
    //       orderArray.push(orderDoc.data());
    //   });
    //   // console.log(orderArray);
    //   })
  };

  return (
    <>
      {" "}
      <Typography className="text-4xl mt-8">Place Order</Typography>
      <Grid container spacing={1} className="bg-indigo-100 mt-8">
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography className="text-2xl">Shipping Address</Typography>
              </ListItem>
              <ListItem className="text-lg">
                {previousData.microaddress}, {previousData.majoraddress},{" "}
                {previousData.city}, {previousData.pincode},{" "}
              </ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Typography className="text-2xl">Payment Method</Typography>
              </ListItem>
              <ListItem className="text-lg">{paymentMethod.name}</ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Typography className="text-2xl">Order Items</Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.cartItems?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Image
                              src={item.url}
                              alt={item.name}
                              width="50"
                              height="50"
                            ></Image>
                          </TableCell>

                          <TableCell>
                            <Typography>{item.name}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.cartQuantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography className="text-2xl">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Item&apos;s Price:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      {cart.cartTotalAmount}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">20</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">50</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>{totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
              {paymentMethod.name === "razorpay" ?(
                <Button
                  onClick={placeOrderHandler}
                  className="mb-10 sm:mb-0 bg-indigo-600 text-white hover:bg-indigo-500"
                  fullWidth
                >
                  Place Order
                </Button>
              ):(
                <Button
                  onClick={placeOrderHandlerForCOD}
                  className="mb-10 sm:mb-0 bg-indigo-600 text-white hover:bg-indigo-500"
                  fullWidth
                >
                  Place Order
                </Button>
              )}
                {/* <Button>
                    <Script
                      src="https://checkout.razorpay.com/v1/payment-button.js"
                      data-payment_button_id="pl_JOTvkN5N9nAuRQ"
                      async
                    />
                  </Button> */}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </>
  );
};

export default PlaceOrder;

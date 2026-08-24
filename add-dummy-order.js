import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuKjGfsOSkTNqWJvW4KStpivKSBh_rnK4",
  authDomain: "livora-b95eb.firebaseapp.com",
  projectId: "livora-b95eb",
  storageBucket: "livora-b95eb.firebasestorage.app",
  messagingSenderId: "240971806902",
  appId: "1:240971806902:web:68fa833d141e77ac574e17",
  measurementId: "G-219T5YKKZQ"
};

async function addDummyOrder() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const dummyOrderId = "LIV-" + Math.floor(100000 + Math.random() * 900000);
  
  const dummyOrder = {
    id: dummyOrderId,
    createdAt: new Date().toISOString(),
    updatedAt: serverTimestamp(),
    serverCreatedAt: serverTimestamp(),
    status: "PAID",
    trackingNumber: "LIV-EXP-" + Math.floor(10000000 + Math.random() * 90000000),
    totalAmount: 5880,
    customer: {
      userId: "guest",
      name: "Sahdev Sharma",
      email: "sahdev@example.com",
      phone: "+91 98765 43210",
      address: "Flat 402, Royal Palms, Bandra West, Mumbai, Maharashtra - 400050"
    },
    paymentDetails: {
      method: "RAZORPAY",
      paymentId: "pay_test_" + Math.random().toString(36).substring(7),
      orderId: "order_test_" + Math.random().toString(36).substring(7)
    },
    items: [
      {
        id: "wp-pichwai-01",
        title: "Royal Shrinathji Pichwai Heritage Mural",
        theme: "Pichwai & Traditional",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        roomMockup: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        paperType: "Canvas Textured (Seamless)",
        ratePerSqFt: 84,
        unit: "Inches",
        width: 120,
        height: 84,
        sqFt: 70,
        price: 5880,
        quantity: 1
      }
    ]
  };

  console.log(`Writing dummy order ${dummyOrderId} to Firestore 'orders' collection...`);
  await setDoc(doc(db, "orders", dummyOrderId), dummyOrder);
  console.log(`✓ Dummy order ${dummyOrderId} added successfully to Firestore!`);
  console.log(JSON.stringify(dummyOrder, null, 2));
}

addDummyOrder().catch(console.error);

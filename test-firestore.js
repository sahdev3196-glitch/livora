import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuKjGfsOSkTNqWJvW4KStpivKSBh_rnK4",
  authDomain: "livora-b95eb.firebaseapp.com",
  projectId: "livora-b95eb",
  storageBucket: "livora-b95eb.firebasestorage.app",
  messagingSenderId: "240971806902",
  appId: "1:240971806902:web:68fa833d141e77ac574e17",
  measurementId: "G-219T5YKKZQ"
};

async function testFirestore() {
  console.log("1. Initializing Firebase...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log("2. Connected to Firestore instance for project:", firebaseConfig.projectId);

  const testDocId = "test_connection_" + Date.now();
  const testRef = doc(db, "_diagnostics", testDocId);

  try {
    console.log("3. Writing test document to Firestore (_diagnostics/" + testDocId + ")...");
    await setDoc(testRef, {
      message: "LIVORA Firestore connection test successful!",
      timestamp: serverTimestamp(),
      testRunAt: new Date().toISOString()
    });
    console.log("✓ Successfully wrote document to Firestore!");

    console.log("4. Reading test document back from Firestore...");
    const snap = await getDoc(testRef);
    if (snap.exists()) {
      console.log("✓ Successfully read document:", snap.data());
    } else {
      console.error("✗ Document was not found after writing.");
    }

    console.log("5. Cleaning up test document...");
    await deleteDoc(testRef);
    console.log("✓ Successfully cleaned up test document!");

    console.log("\n========================================================");
    console.log("🎉 FIRESTORE DATABASE IS FULLY FUNCTIONAL AND WORKING! 🎉");
    console.log("========================================================\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Firestore Connection Error:", error);
    console.error("Code:", error.code);
    console.error("Message:", error.message);
    process.exit(1);
  }
}

testFirestore();

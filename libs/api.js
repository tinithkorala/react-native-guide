import { addDoc, collection, getDocs, doc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "./../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const signUpApi = async (username, email, password) => {
  try {
    // Create user in firebase authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    // Update user data in firebase FireStore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: username,
    });
    console.log(" ✅ User signed up successfully:", user.uid);
    return {
      status: true,
      message: "User signed up successfully",
    };
  } catch (error) {
    // Handle already used email error
    if (error.code === "auth/email-already-in-use") {
      return {
        status: false,
        message: "The email address is already in use by another account.",
      };
    } else {
      console.error(" 🔥 Error signing up:", error);
      return {
        status: false,
        message: error.message,
      };
    }
  }
};

const signInApi = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    console.log(" ✅ User signed in successfully:", user.uid);
    return {
      status: true,
      message: "User signed in successfully",
    };
  } catch (error) {
    // Handled invalid auth error
    if (error.code === "auth/invalid-credential") {
      return {
        status: false,
        message: "The provided credential is invalid.",
      };
    }
    console.error(" 🔥 Error signing in:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const signOutApi = async () => {
  try {
    await auth.signOut();
    console.log(" ✅ User signed out successfully");
    return {
      status: true,
      message: "User signed out successfully",
    };
  } catch (error) {
    console.error(" 🔥 Error signing out:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const fetchProducts = async (queryParams) => {
  console.log("Fil obj  🔍 ", queryParams);
  try {
    let productsRef = collection(db, "products");

    // Filter Category
    if (queryParams.category) {
      productsRef = query(productsRef, where("category", "==", queryParams.category));
    }

    // Search by Name
    if (queryParams.search) {
      // Convert searchText to lowercase for case-insensitive search
      const searchTextLower = queryParams.search.toLowerCase();
      productsRef = query(productsRef, where("slug", ">=", searchTextLower), where("name", "<=", searchTextLower + "\uf8ff"));
    }

    // Sort by selections
    if (queryParams.sort === "asc") {
      productsRef = query(productsRef, orderBy("price", "asc"));
    } else if (queryParams.sort === "desc") {
      productsRef = query(productsRef, orderBy("price", "desc"));
    } else if (queryParams.sort === "brand") {
      productsRef = query(productsRef, orderBy("brand", "asc"));
    }

    const querySnapshot = await getDocs(productsRef);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(" ✅ Products fetching successfully");
    return {
      status: true,
      data: data,
    };
  } catch (error) {
    console.error(" 🔥 Error fetching products:", error);
    return {
      status: false,
      message: error.message,
    };
  }
 
}

export { signUpApi, signInApi, signOutApi, fetchProducts };

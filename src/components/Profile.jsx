import { useEffect, useState } from "react";
import firebaseAppConfig from "../util/firebase-config";
import { onAuthStateChanged, getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import Layout from "./Layout";
import Swal from "sweetalert2";

const auth = getAuth(firebaseAppConfig);
const db = getFirestore(firebaseAppConfig);

const Profile = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [formValue, setFormValue] = useState({
    fullname: "",
    email: "",
    mobile: "",
  });
  const [isAddress, setIsAddress] = useState(false);

  const [addressForm, setAddressForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    userId: "",
  });

  // Monitor user authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(false);
        navigate("/login");
      }
    });
  }, []);

  // Fetch user details and address
  useEffect(() => {
    let isMounted = true; // To prevent memory leaks during async operations
    const fetchUserDetails = async () => {
      if (session) {
        try {
          setFormValue({
            fullname: session.displayName || "",
            email: session.email || "",
            mobile: session.phoneNumber || "",
          });

          setAddressForm((prev) => ({
            ...prev,
            userId: session.uid,
          }));

          // Fetch address from Firestore
          const col = collection(db, "addresses");
          const q = query(col, where("userId", "==", session.uid));
          const snapshot = await getDocs(q);

          if (isMounted) {
            setIsAddress(!snapshot.empty);
            snapshot.forEach((doc) => {
              const address = doc.data();
              setAddressForm((prev) => ({
                ...prev,
                ...address,
              }));
            });
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUserDetails();
    return () => (isMounted = false);
  }, [session]);

  // Handle form input changes
  const handleFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressForm = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile information
  const saveProfileInfo = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(session, {
        displayName: formValue.fullname,
        phoneNumber: formValue.mobile,
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: error.message,
      });
    }
  };

  // Add or update address
  const setAddress = async (e) => {
    e.preventDefault();
    try {
      const col = collection(db, "addresses");
      const q = query(col, where("userId", "==", session.uid));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Add new document if no address exists
        await addDoc(collection(db, "addresses"), addressForm);
      } else {
        // Update the existing document
        const docRef = snapshot.docs[0].ref;
        await updateDoc(docRef, addressForm);
      }

      Swal.fire({
        icon: "success",
        title: "Address Saved/Updated!",
      });
    } catch (error) {
      console.error("Error managing address:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.message,
      });
    }
  };

  // Show loading spinner if session is null
  if (session === null)
    return (
      <div className="bg-gray-100 h-full fixed top-0 left-0 w-full flex justify-center items-center">
        <span className="relative flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
        </span>
      </div>
    );

  return (
    <Layout>
      {/* Profile Section */}
      <div className="mx-auto md:my-16 shadow-lg rounded-md p-8 md:w-7/12 border">
        <div className="flex gap-3">
          <i className="ri-user-line text-4xl"></i>
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>

        <hr className="my-6" />
        <div className="w-24 h-24 mx-auto relative mb-6">
          <img src="/images/avt.avif" className="rounded-full w-24 h-24" />
        </div>

        <form className="grid grid-cols-2 gap-6" onSubmit={saveProfileInfo}>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Fullname</label>
            <input
              onChange={handleFormValue}
              required
              name="fullname"
              className="p-2 rounded border border-gray-300"
              value={formValue.fullname}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Email</label>
            <input
              disabled
              name="email"
              type="email"
              className="p-2 rounded border border-gray-300"
              value={formValue.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Mobile</label>
            <input
              onChange={handleFormValue}
              required
              name="mobile"
              type="number"
              className="p-2 rounded border border-gray-300"
              value={formValue.mobile}
            />
          </div>

          <div />

          <button className="px-4 py-2 bg-rose-600 text-white rounded w-fit hover:bg-green-600">
            <i className="ri-save-line mr-2"></i>
            Save
          </button>
        </form>
      </div>

      {/* Address Section */}
      <div className="mx-auto md:my-16 shadow-lg rounded-md p-8 md:w-7/12 border">
        <div className="flex gap-3">
          <i className="ri-link-unlink-m text-4xl"></i>
          <h1 className="text-3xl font-semibold">Delivery Address</h1>
        </div>

        <hr className="my-6" />

        <form className="grid grid-cols-2 gap-6" onSubmit={setAddress}>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-lg font-semibold">Area/Street/Village</label>
            <input
              onChange={handleAddressForm}
              required
              name="address"
              type="text"
              className="p-2 rounded border border-gray-300"
              value={addressForm.address}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">City</label>
            <input
              onChange={handleAddressForm}
              required
              name="city"
              type="text"
              className="p-2 rounded border border-gray-300"
              value={addressForm.city}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">State</label>
            <input
              onChange={handleAddressForm}
              required
              name="state"
              type="text"
              className="p-2 rounded border border-gray-300"
              value={addressForm.state}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Country</label>
            <input
              onChange={handleAddressForm}
              required
              name="country"
              type="text"
              className="p-2 rounded border border-gray-300"
              value={addressForm.country}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Pincode</label>
            <input
              onChange={handleAddressForm}
              required
              name="pincode"
              type="number"
              className="p-2 rounded border border-gray-300"
              value={addressForm.pincode}
            />
          </div>

          <button className="px-4 py-2 bg-rose-600 text-white rounded w-fit hover:bg-green-600">
            <i className="ri-save-line mr-2"></i>
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;

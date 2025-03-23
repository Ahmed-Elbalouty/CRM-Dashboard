import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Fetching customers from Firestore
export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addCustomer = createAsyncThunk(
  "customers/add",
  async (customer) => {
    let avatarUrl = "";
    if (customer.avatar) {
      const avatarRef = ref(storage, `avatars/${customer.avatar.name}`);
      await uploadBytes(avatarRef, customer.avatar);
      avatarUrl = await getDownloadURL(avatarRef);
    }
    const newCustomer = { ...customer, avatar: avatarUrl };
    const docRef = await addDoc(collection(db, "customers"), newCustomer);
    return { id: docRef.id, ...newCustomer };
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: { customers: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        const newCustomers = action.payload.filter(
          (customer) =>
            !state.customers.some(
              (existingCustomer) => existingCustomer.id === customer.id
            )
        );
        // Add only new customers to the state
        state.customers = [...state.customers, ...newCustomers];
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        if (
          !state.customers.some((customer) => customer.id === action.payload.id)
        ) {
          state.customers.push(action.payload);
        }
      });
  },
});

export default customersSlice.reducer;

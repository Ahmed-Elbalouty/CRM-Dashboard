import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

// Fetch deals from Firebase
export const fetchDeals = createAsyncThunk("deals/fetch", async () => {
  const querySnapshot = await getDocs(collection(db, "deals"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// Add a new deal to Firebase
export const addDeal = createAsyncThunk("deals/add", async (deal) => {
  const docRef = await addDoc(collection(db, "deals"), deal);
  return { id: docRef.id, ...deal };
});

// Clear all deals from Firebase and Redux state if there are any deals
export const clearDeals = createAsyncThunk(
  "deals/clear",
  async (_, { dispatch }) => {
    const querySnapshot = await getDocs(collection(db, "deals"));

    if (querySnapshot.empty) {
      return [];
    }

    // Delete all deals from Firebase
    const deletePromises = querySnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, "deals", docSnapshot.id))
    );
    await Promise.all(deletePromises);

    return [];
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: { deals: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.fulfilled, (state, action) => {
        const newDeals = action.payload.filter(
          (deal) =>
            !state.deals.some((existingDeal) => existingDeal.id === deal.id)
        );
        state.deals = [...state.deals, ...newDeals];
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        if (!state.deals.some((deal) => deal.id === action.payload.id)) {
          state.deals.push(action.payload);
        }
      })
      .addCase(clearDeals.fulfilled, (state, action) => {
        state.deals = action.payload;
      });
  },
});

export default dealsSlice.reducer;

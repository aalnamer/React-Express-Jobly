import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationsItems: [],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addToApplications(state, action) {
      const itemId = action.payload.id;
      const itemExists = state.applicationsItems.some(
        (item) => item.product_id === itemId
      );

      if (!itemExists) {
        state.applicationsItems.push(action.payload);
      }
    },
    removeFromApplications(state, action) {
      const itemId = action.payload;
      state.applicationsItems = state.applicationsItems.filter(
        (item) => item.product_id !== itemId && item.id !== itemId
      );
    },

    updateapplicationsItems(state, action) {
      state.applicationsItems = action.payload;
    },
  },
});

export const {
  addToapplications,
  removeFromapplications,
  updateapplicationsItems,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;

export const selectapplicationsItems = (state) =>
  state.applications.applicationsItems;

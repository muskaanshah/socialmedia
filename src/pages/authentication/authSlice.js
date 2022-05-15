import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const initialState = {
  currentUser: '',
};

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password, name, username }, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {
  //   increment: (state) => {
  //     state.value += 1
  //   },
  //   decrement: (state) => {
  //     state.value -= 1
  //   },
  //   incrementByAmount: (state, action) => {
  //     state.value += action.payload
  //   },
  // },
});

export default authSlice.reducer;

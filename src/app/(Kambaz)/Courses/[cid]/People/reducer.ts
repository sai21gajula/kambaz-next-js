import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;

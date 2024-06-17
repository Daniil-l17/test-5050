import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  liked: { id: number }[];
}

const initialState: State = {
  liked: JSON.parse(localStorage.getItem('liked') ?? '[]'),
};

export const liked = createSlice({
  name: ' liked',
  initialState,
  reducers: {
    addLiked: (state, { payload }: PayloadAction<{ id: number }>) => {
      if (state.liked.some(item => item.id === payload.id)) {
        state.liked = state.liked.filter(item => item.id !== payload.id);
        localStorage.setItem('liked',JSON.stringify(state.liked))
      } else {
        state.liked.push(payload);
        localStorage.setItem('liked',JSON.stringify(state.liked))
      }
    },
  },
});


export const {reducer:reducerLiked,actions} = liked
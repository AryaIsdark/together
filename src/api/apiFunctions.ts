import { api, apiDictionary } from "./client";

export const getPosts = (params: any = {}) => api.get<any>("/posts", params);

export const getPost = (id: string) => api.get<any>(`/posts/${id}`);
export const getUsers = (params: any = {}) => api.get<any>(`/users`);
export const getAttendees = (challengeId: string | undefined) =>
  api.get<any>(`/challenges/${challengeId}/attendees`);

export const getChallenges = (params: any = {}) => api.get<any>(`/challenges`);
export const getChallenge = (id: string = "") =>
  api.get<any>(`/challenges/${id}`);
export const updateChallenge = (id: string = "", params: any) =>
  api.put<any>(`/challenges/${id}`, params);

export const createChallenge = (params: any) =>
  api.post<any>(`/challenges`, params);

export const getComments = (entityType: string, entityId: string) =>
  api.get<any>(`/${entityType}/${entityId}/comments`);

export const postBooking = (params: any) => {
  api.post("/bookings", params);
};

export const getBookings = (params: any) => api.get<any>(`/bookings`, params);

export const getLoggedInUser = (userId: string) =>
  api.get<any>(`/users/${userId}`);

export const getCompany = (id: string) => api.get<any>(`/company/${id}`);

// Dictionary APP
const wordId = "hello";
const fields = "definitions";
const strictMatch = "false";

export const translate = (word: string) =>
  apiDictionary.get(
    `entries/en-gb/${wordId}?fields=${fields}&strictMatch=${strictMatch}`
  );

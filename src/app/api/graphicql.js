"use server"

import { apiinstance } from "./interceptor";



export async function fetchGraphQLDa (GET_POSTS_QUERY_LIST,varPos) {

  try {
    
    const entries = await apiinstance("",{
      method: 'POST',
      body: JSON.stringify({
        query: GET_POSTS_QUERY_LIST,
        variables: varPos
      }),
      cache: 'no-cache'
    });
    // console.log(entries.data,"juuuu")
   return entries?.data
   
  } catch (error) {
    throw error;
  }
}

export async function fetchGraphQLCatgoData(GET_POSTS_QUERY_CATEGORY,variable_category) {

  try {
    const entries = await apiinstance("",{
      method: 'POST',
      body: JSON.stringify({
        query: GET_POSTS_QUERY_CATEGORY,
        variables: variable_category
      })
    });
     return entries.data
  } catch (error) {
    throw error;
  }
};


































































// import axiosInstance from "./axios";

// export async function fetchGraphQLDa(GET_POSTS_QUERY_LIST,varPos) {
//   try {
//     // setCatLoader(false)
//     const response = await axiosInstance.post('', {
//       query: GET_POSTS_QUERY_LIST,
//       variables: varPos
//     });
// // console.log(response,'34343434');
//     return response.data; 
//   } catch (error) {
//     console.error('Error fetching GraphQL data:', error);
//     throw error; // Re-throw the error for handling elsewhere if needed
//   }
// }


// export async function fetchGraphQLCatgoData(GET_POSTS_QUERY_CATEGORY,variable_category) {
//   try {
//     // setCatLoader(false)
//     const response = await axiosInstance.post('', {
//       query: GET_POSTS_QUERY_CATEGORY,
//       variables: variable_category
//     });
// // console.log(response,'34343434');
//     return response.data; 
//   } catch (error) {
//     console.error('Error fetching GraphQL data:', error);
//     throw error; // Re-throw the error for handling elsewhere if needed
//   }
// }




























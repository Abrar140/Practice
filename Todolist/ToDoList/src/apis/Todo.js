import axios from "axios";

const url = "http://localhost:3001";

export const getAllTodo = async () => {
  try {
    const response = await axios.get(`${url}/`);
    return response.data; // Return the data received from the API
  } catch (error) {
    console.error("Error in GET todos API: ", error);
    throw error; // Throw the error so it can be handled by the caller
  }
};

export const posttodo = async (body) => {
  try {
    const response = await axios.post(`${url}/`, body);
    return response.data; // Return the data received from the API
  } catch (error) {
    console.error("Error in POST todo API: ", error);
    throw error; // Throw the error so it can be handled by the caller
  }
};
export const updatetodo = async (todoId) => {
  try {
    const response = await axios.put(`${url}/${todoId}`);
    return response.data; // Return the data received from the API
  } catch (error) {
    console.error("Error in PUT todo API: ", error);
    throw error; // Throw the error so it can be handled by the caller
  }
};
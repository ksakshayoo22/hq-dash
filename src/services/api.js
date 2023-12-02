const apiUrl =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const fetchUsers = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default fetchUsers;

import { useEffect, useState } from 'react';
import baseUrl from '../config';

function DisplayUsers() {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make the GET request to the backend API using fetch
        const response = await fetch(`${baseUrl}api/get-users`);

        // Check if the response is OK (status 200)
        if (response.ok) {
          const data = await response.json();

          // Update the state with the fetched user
          setUsers(data);
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('There was an error fetching the users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {users.length > 0 ? (
        <div>
          <div>User from database</div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name}
                {' '}
              </li> // Assuming the table has a column 'id' and 'name'
            ))}
          </ul>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default DisplayUsers;

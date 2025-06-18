import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserDetails = () => {
  const [emails, setEmails] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [role, setRole] = useState([]);
  const [isLoggedIn] = useState();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get('https://pro-backend-ahba.onrender.com/details')
      .then(response => {
        setUsers(response.data);
        const fetchedEmails = response.data.map(user => user.email.toLowerCase());
        const fetchedPasswords = response.data.map(user => user.password);
        const fetchedRole = response.data.map(user => user.role);
        setEmails(fetchedEmails);
        setPasswords(fetchedPasswords);
        setRole(fetchedRole)
      })
      .catch(error => {
        console.error('Error fetching details:', error);
      });
  }, []);

  return { emails, passwords, isLoggedIn, role ,users };
};

export default useUserDetails;

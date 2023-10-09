 const registerModel = async (firstName, lastName, userName, password) => {


     return new Promise(async (resolve) => {
         const userData = {
             firstName,
             lastName,
             userName,
             password
         }
         const response = await fetch('http://localhost:5000/auth/register', {
             method: 'POST',
             body: JSON.stringify(userData),
             credentials: 'include',
             headers: {
                 'content-type': 'application/json'
             },
         });

         const data = await response.json();
         resolve(
             data
         );
     })
 }

 const loginModel = async (userName, password) => {


     return new Promise(async (resolve) => {
         const userData = {
             userName,
             password
         };

         const response = await fetch('http://localhost:5000/auth/login', {
             method: 'POST',
             body: JSON.stringify(userData),
             credentials: 'include',
             headers: {
                 'content-type': 'application/json'
             },
         });

         const data = await response.json();
         resolve(
             data
         );
     })
 }

 const profileModel = async () => {

     return new Promise(async (resolve) => {
         const response = await fetch('http://localhost:5000/auth/profile', {
             credentials: 'include',
         });
         const data = await response.json();
         resolve(
             data
         );
     })
 }

 const miniProfileModel = async () => {
     return new Promise(async (resolve) => {
         const response = await fetch('http://localhost:5000/auth/miniProfile', {
             credentials: 'include',
         });
         const data = await response.json();
         resolve(
             data
         );
     })
 }

 const logoutModel = async () => {
     return new Promise(async (resolve) => {
         const response = await fetch('http://localhost:5000/auth/logout', {
             credentials: 'include',
         });
         const data = await response.json();
         resolve(
             data
         );
     })
 }

 export {
     registerModel,
     loginModel,
     profileModel,
     miniProfileModel,
     logoutModel
 }
export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
}

export function removeAuthToken() {
  localStorage.removeItem("token");
}

export function removeUserData() {
  localStorage.removeItem("userData");
}

export function validateToken(userAccesToken) {
  if (userAccesToken !== null) {
    return userAccesToken === getAuthToken();
  }
  return false;
}

// export function getValidatedUser() {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = auth
//       .onAuthStateChanged(
//         (user) => {
//           unsubscribe();
//           resolve(user);
//         },
//         reject // pass up any errors attaching the listener
//       );
//   });
// }

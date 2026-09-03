// import { useUserStore } from '@/stores/account/user.store';

// export const fetchWrapper = {
//   get: request('GET'),
//   post: request('POST'),
//   put: request('PUT'),
//   delete: request('DELETE')
// };

// interface temp {
//   method: string;
//   headers: Record<string, string>;
//   body?: string;
// }

// function request(method: string) {
//   return (url: string, body?: object) => {
//     const reqOptions: temp = {
//       method,
//       headers: authHeader(url)
//     };
//     if (body) {
//       reqOptions.headers['Content-Type'] = 'application/json';
//       reqOptions.headers['Acess-Control-Allow-Origin'] = '*';
//       reqOptions.body = JSON.stringify(body);
//     }
//     return fetch(url, reqOptions).then(() => {});
//   };
// }

// helper functions

// function authHeader(url: string): Record<string, string> {
//   // return auth header with jwt if user is logged in and request is to the api url
//   const { accessToken } = useUserStore();
//   const isLoggedIn = !!accessToken;
//   const isApiUrl = url.startsWith(import.meta.env.KP_API_URL_V1);
//   if (isLoggedIn && isApiUrl) {
//     return { Authorization: `Bearer ${accessToken}` };
//   } else {
//     return {};
//   }
// }

// function handleResponse(response: Response): Promise<UserData> {
//   return response.text().then((text: string) => {
//     const data = text && JSON.parse(text);

//     if (!response.ok) {
//       const { user, logout } = useUserStore();
//       if ([401, 403].includes(response.status) && user) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         logout();
//       }

//       const error: string = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     // Ensure data is of type UserData
//     return data as UserData;
//   });
// }

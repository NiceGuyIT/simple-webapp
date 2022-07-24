import { useAuth } from 'src/stores';
import { Notify } from 'quasar';

/**
 *
 * Use this fetch helper to add the JWT token to every request.
 * Example usage:
 *
 *   import { fetchHelper } from 'src/mixins/fetchHelper';
 *
 *   const response = await fetchHelper({
 *      method: 'POST',
 *      body: { email, password },
 *      url: `${baseUrl}/api/admins/auth-via-email`,
 *   });
 * */

/**
 * Make a request to the API.
 * @param method The HTTP method of the request.
 * @param body The body of the request.
 * @param url The URL of the request.
 * @returns
 */
function request(data: { method: string; body: object; url: string }) {
    const { method, body, url } = data;
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken(),
        },
        body: body ? JSON.stringify(body) : '',
    };
    return fetch(url, requestOptions).then(handleResponse);
}

/**
 * Get the JWT token.
 * @returns JWT token from the store.
 */
function authToken() {
    const { user } = useAuth();

    // If JWT token exists then return it.
    if (user && user.token) {
        return `Admin ${user.token}`;
    } else {
        return '';
    }
}

/**
 * Handle the response from the API.
 * @param response Response from the API.
 * @returns
 */
function handleResponse(res: Response) {
    if (res.status !== 200) {
        const { user, logout } = useAuth();

        if ([401, 403].includes(res.status) && user.token) {
            // If the request fails and the user token exists, then the JWT token is invalid, must re-login.
            Notify.create({
                color: 'red-4',
                textColor: 'white',
                icon: 'error',
                message: 'Your session has expired, please login again.',
            });
            logout();
        }
    }
    return res;
}

export default request;

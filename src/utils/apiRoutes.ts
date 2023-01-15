import {apiRoute} from './configs';

const host = apiRoute;

//auth routes
export const registerRoute = host + '/auth/register';
export const loginRoute = host + '/auth/login';
export const verifyToken = host + '/auth/verify';
export const isUserVerified = host + '/auth/verifiedUser';
export const emailVerification = host + '/auth/verification';

//user routes
export const getUserRoute = host + '/user/get';
export const getUsers = host + '/user';
export const updateUser = host + '/user';
export const deleteUser = host + '/user';

//profile routes
export const changeAvatarRoute = host + '/profile/avatar';
export const changePasswordRoute = host + '/profile/password';

//room routes
export const getRoom = host + '/room';
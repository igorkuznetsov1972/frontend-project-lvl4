// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  chatPath: () => [host, prefix, 'data'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  loginPage: () => [host, 'login'].join('/'),
  signupPage: () => [host, 'signup'].join('/'),
  rootPage: () => [host, ''].join('/'),
};

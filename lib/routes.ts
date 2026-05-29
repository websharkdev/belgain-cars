export const routes = {
  home: '/',
  signIn: '/auth/sign-in',
  resetPassword: '/auth/reset-password',
  cart: '/cart',
  checkout: '/checkout',
  dashboard: '/dashboard',
  dashboardAdmin: '/dashboard/admin',
  dashboardUser: '/dashboard/user',
  orderHistory: '/order-history',
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

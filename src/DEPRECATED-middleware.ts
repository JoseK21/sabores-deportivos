export { default } from "next-auth/middleware";

// specify the path regex to apply the middleware to
export const config = {
  // matcher: "/api/:path*", // me genera error la hacer peticiones al api, pues pide credenciales
};

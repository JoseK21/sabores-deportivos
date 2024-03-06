import { ReactNode } from "react";
import HomeHeader from "../../components/quinisports/headers/HomeHeader";
import HomeFooter from "../../components/quinisports/footers/HomeFooter";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <HomeHeader />
      <main className="max-w-7xl min-h-screen mx-auto">{children}</main>
      <HomeFooter />
    </>
  );
};
export default Layout;

import { ReactNode } from "react";
import HomeHeader from "../../components/_/headers/HomeHeader";
import HomeFooter from "../../components/_/footers/HomeFooter";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const HomeLayout = ({ children }: Props) => {
  return (
    <>
      <HomeHeader />
      <main className="max-w-7xl min-h-screen mx-auto">{children}</main>
      <HomeFooter />
    </>
  );
};
export default HomeLayout;

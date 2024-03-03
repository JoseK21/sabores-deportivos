import { ReactNode } from "react";
import HomeHeader from "../components/headers/HomeHeader";
import HomeFooter from "../components/footers/HomeFooter";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const HomeLayout = ({ children }: Props) => {
  return (
    <>
      <HomeHeader />
      <main className="max-w-xl">{children}</main>
      <HomeFooter />
    </>
  );
};
export default HomeLayout;

import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="schedule-location">Horario y Ubicacion</TabsTrigger>
        </TabsList>
        <TabsContent value="history">Historial - Make changes to your account here.</TabsContent>
        <TabsContent value="menu">Menu</TabsContent>
        <TabsContent value="schedule-location">Ubicacion....</TabsContent>
      </Tabs>
      <main className="max-w-7xl min-h-screen mx-auto">{children}</main>
    </>
  );
};
export default Layout;

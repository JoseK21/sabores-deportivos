import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Head from "next/head";

export default function Home() {
  return (
    <div className="text-black">
      <Head>
        <title>nine4</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

import { ReactNode } from "react";
import Header from "components/Layout/Header";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

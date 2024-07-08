import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav/Nav";
const inter = Inter({ subsets: ["latin"] });
const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
import NextTopLoader from "nextjs-toploader";
import Footer from "./components/Footer/Footer";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "QuizIt | The quiz app for the 21st century",
  description:
    "QuizIt is a modular quiz and form application where instead of submitting one long form, each question is its own identity, and users can worry less about finishing a form in one go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} bg-gradient-to-b from-black to-zinc-900 min-h-screen no-scrollbar text-white`}
      >
        <NextTopLoader showSpinner={false} />
        <Nav />
        {children}
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          bodyClassName={`${dm_sans.className} text-black`}
          closeButton={false}
        />
      </body>
    </html>
  );
}

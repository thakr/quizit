"use client";

import React, { useEffect, useState } from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { Session } from "next-auth";
import Link from "next/link";
import { logOut } from "@/app/lib/actions";
import Dropdown from "../Global/Dropdown";
import UserAvatar from "./UserAvatar";

export default function NavBar({ session }: { session: Session | null }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <NavigationMenu.Root
      className={`flex justify-between z-20 sticky top-0 h-16 border-b-zinc-800 border-b border-opacity-0 bg-opacity-0 bg-black ${
        scrollY > 0 && "border-opacity-100 bg-opacity-80 backdrop-blur-2xl"
      } items-center px-5 py-3 transition duration-300 `}
    >
      <NavigationMenu.Item className="list-none">
        <Link className="flex flex-row items-center gap-2" href="/">
          <svg
            width="89"
            height="15"
            viewBox="0 0 89 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.11776 0C3.34369 0 3.53572 0.0661484 3.69387 0.198445C3.85202 0.330742 3.93109 0.491387 3.93109 0.680383V2.06005C3.93109 2.24904 3.85202 2.40969 3.69387 2.54199C3.53572 2.67428 3.34369 2.74043 3.11776 2.74043H0.790737C0.579874 2.74043 0.395369 2.67428 0.237221 2.54199C0.0790737 2.40969 0 2.24904 0 2.06005V0.680383C0 0.491387 0.0790737 0.330742 0.237221 0.198445C0.395369 0.0661484 0.579874 0 0.790737 0H3.11776ZM13.2166 0C13.4275 0 13.612 0.0661484 13.7701 0.198445C13.9283 0.330742 14.0073 0.491387 14.0073 0.680383V2.06005C14.0073 2.24904 13.9283 2.40969 13.7701 2.54199C13.612 2.67428 13.4275 2.74043 13.2166 2.74043H8.67552V13.4754C8.67552 13.6518 8.59644 13.8061 8.4383 13.9384C8.28015 14.0707 8.09564 14.1368 7.88478 14.1368H6.14516C5.91923 14.1368 5.7272 14.0707 5.56905 13.9384C5.4109 13.8061 5.33183 13.6518 5.33183 13.4754V0.680383C5.33183 0.491387 5.4109 0.330742 5.56905 0.198445C5.7272 0.0661484 5.91923 0 6.14516 0H13.2166ZM18.9415 4.83828C18.7307 4.83828 18.5462 4.77213 18.388 4.63983C18.2299 4.50754 18.1508 4.35319 18.1508 4.17679V0.661483C18.1508 0.485088 18.2299 0.330742 18.388 0.198445C18.5462 0.0661484 18.7307 0 18.9415 0H20.6586C20.8845 0 21.0728 0.0661484 21.2234 0.198445C21.374 0.330742 21.4493 0.485088 21.4493 0.661483V4.17679C21.4493 4.35319 21.374 4.50754 21.2234 4.63983C21.0728 4.77213 20.8845 4.83828 20.6586 4.83828H18.9415ZM31.2093 0C31.4201 0 31.6046 0.0661484 31.7628 0.198445C31.9209 0.330742 32 0.485088 32 0.661483V13.362C32 13.5384 31.9209 13.6927 31.7628 13.825C31.6046 13.9573 31.4201 14.0234 31.2093 14.0234H29.4922C29.2663 14.0234 29.078 13.9573 28.9274 13.825C28.7768 13.6927 28.7015 13.5384 28.7015 13.362V8.37249H21.4493V13.362C21.4493 13.5384 21.374 13.6927 21.2234 13.825C21.0728 13.9573 20.8845 14.0234 20.6586 14.0234H18.9415C18.7307 14.0234 18.5462 13.9573 18.388 13.825C18.2299 13.6927 18.1508 13.5384 18.1508 13.362V6.29354C18.1508 6.11714 18.2299 5.9628 18.388 5.8305C18.5462 5.69821 18.7307 5.63206 18.9415 5.63206H28.7015V0.661483C28.7015 0.485088 28.7768 0.330742 28.9274 0.198445C29.078 0.0661484 29.2663 0 29.4922 0H31.2093ZM52.523 13.0974C52.6285 13.299 52.6021 13.5037 52.444 13.7116C52.2858 13.9195 52.0712 14.0234 51.8001 14.0234H36.7535C36.6179 14.0234 36.4899 13.9951 36.3694 13.9384C36.2489 13.8817 36.1585 13.8092 36.0983 13.7211C35.9326 13.5195 35.91 13.3116 36.0305 13.0974L36.7309 11.7177C36.7911 11.5917 36.889 11.4909 37.0246 11.4153C37.1601 11.3397 37.3032 11.3019 37.4538 11.3019H47.9819L44.2768 3.8933L41.2494 9.94115C41.1891 10.0671 41.095 10.1648 40.967 10.2341C40.8389 10.3034 40.6921 10.338 40.5264 10.338H38.6286C38.3425 10.338 38.1165 10.2372 37.9509 10.0356C37.8906 9.94745 37.853 9.84665 37.8379 9.73325C37.8228 9.61986 37.8379 9.51276 37.8831 9.41196L42.4694 0.41579C42.5296 0.289793 42.6237 0.188995 42.7518 0.113397C42.8798 0.0377989 43.0266 0 43.1923 0H45.3612C45.5269 0 45.6737 0.0377989 45.8018 0.113397C45.9298 0.188995 46.0239 0.289793 46.0842 0.41579L52.523 13.0974ZM70.8772 12.9462C70.9675 13.0344 71.0203 13.1415 71.0353 13.2675C71.0504 13.3935 71.024 13.5132 70.9562 13.6266C70.8885 13.74 70.7906 13.8281 70.6625 13.8911C70.5345 13.9541 70.3952 13.9856 70.2446 13.9856H68.0983C67.9627 13.9856 67.8385 13.9604 67.7255 13.91C67.6126 13.8596 67.5184 13.7903 67.4431 13.7022L62.0435 7.20072L59.8294 8.93947V13.3242C59.8294 13.5006 59.7504 13.6549 59.5922 13.7872C59.4341 13.9195 59.2496 13.9856 59.0387 13.9856H57.3217C57.1108 13.9856 56.9263 13.9195 56.7682 13.7872C56.61 13.6549 56.5309 13.5006 56.5309 13.3242V8.0701C56.5309 7.8685 56.6138 7.711 56.7794 7.59761L66.2231 0.188995C66.3737 0.0629982 66.5545 0 66.7653 0H69.2053C69.3559 0 69.499 0.0377989 69.6346 0.113397C69.7701 0.188995 69.868 0.289793 69.9283 0.41579C69.9885 0.541786 70.0036 0.670933 69.9735 0.80323C69.9433 0.935526 69.868 1.05207 69.7475 1.15287L64.4609 5.31077L70.8772 12.9462ZM57.3217 4.81938C57.1108 4.81938 56.9263 4.75638 56.7682 4.63038C56.61 4.50439 56.5309 4.34689 56.5309 4.15789V0.661483C56.5309 0.485088 56.61 0.330742 56.7682 0.198445C56.9263 0.0661484 57.1108 0 57.3217 0H59.0387C59.2496 0 59.4341 0.0661484 59.5922 0.198445C59.7504 0.330742 59.8294 0.485088 59.8294 0.661483V4.15789C59.8294 4.34689 59.7504 4.50439 59.5922 4.63038C59.4341 4.75638 59.2496 4.81938 59.0387 4.81938H57.3217ZM85.4584 8.59928L88.8698 12.9651C89.0355 13.1919 89.043 13.4187 88.8924 13.6455C88.8322 13.7463 88.738 13.8281 88.61 13.8911C88.482 13.9541 88.3502 13.9856 88.2146 13.9856H86.1587C86.0232 13.9856 85.8951 13.9573 85.7747 13.9006C85.6542 13.8439 85.5638 13.7715 85.5035 13.6833L82.0695 9.12847H78.048V13.3242C78.048 13.5006 77.969 13.6549 77.8108 13.7872C77.6527 13.9195 77.4681 13.9856 77.2573 13.9856H75.5403C75.3294 13.9856 75.1449 13.9195 74.9867 13.7872C74.8286 13.6549 74.7495 13.5006 74.7495 13.3242V7.10622C74.7495 6.92982 74.8286 6.77548 74.9867 6.64318C75.1449 6.51088 75.3294 6.44474 75.5403 6.44474H82.4987C83.8242 6.44474 84.7053 6.12974 85.1421 5.49976C85.2927 5.29817 85.368 5.00837 85.368 4.63038C85.368 4.0382 85.1345 3.57201 84.6676 3.23182C84.1857 2.86643 83.4928 2.68373 82.5891 2.68373H75.5403C75.3294 2.68373 75.1449 2.61758 74.9867 2.48529C74.8286 2.35299 74.7495 2.19864 74.7495 2.02225V0.661483C74.7495 0.485088 74.8286 0.330742 74.9867 0.198445C75.1449 0.0661484 75.3294 0 75.5403 0H82.7924C84.5547 0 85.9629 0.41579 87.0172 1.24737C88.1167 2.07895 88.6665 3.20662 88.6665 4.63038C88.6665 5.55016 88.4255 6.33449 87.9435 6.98337C87.4616 7.63226 86.7612 8.12679 85.8424 8.46699L85.4584 8.59928Z"
              fill="white"
            />
          </svg>
          <span className="text-zinc-400">/</span>
          <span className="text-white font-semibold">QuizIt</span>
        </Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item className="list-none">
        {session?.user ? (
          <Dropdown
            trigger={<UserAvatar session={session} />}
            content={[
              { value: "My quizzes", link: "/my-quizzes" },
              { value: "Sign out", onClick: () => logOut() },
            ]}
          />
        ) : (
          <Link href="/login" className="">
            <text className="text-zinc-300 font-semibold hover:text-white transition">
              Log in
            </text>
          </Link>
        )}
      </NavigationMenu.Item>
    </NavigationMenu.Root>
  );
}

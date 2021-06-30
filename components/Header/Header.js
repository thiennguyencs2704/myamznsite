import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../store/userSlice";
import { auth } from "../../firebase";

import { ShoppingCartIcon, MenuIcon } from "@heroicons/react/outline";

import SearchBar from "./SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart);

  const handlerSignout = () => {
    auth.signOut();
    dispatch(signout());
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="flex flex-col bg-amazon_blue">
        <div className="justify-between pr-3 flex flex-grow h-16 items-center text-white w-full">
          <Link href="/">
            <a>
              <div className="mt-3 ml-1">
                <Image
                  src="/amazonlogo.png"
                  width={130}
                  height={35}
                  objectFit="contain"
                />
              </div>
            </a>
          </Link>

          <SearchBar mobileMode={true} />

          <div className="flex space-x-1 mx-3 items-center text-xs">
            {user ? (
              <div onClick={handlerSignout} className="link">
                <p>Hello, {user.email}</p>
                <p className="text-sm font-semibold whitespace-nowrap">
                  Sign Out
                </p>
              </div>
            ) : (
              <Link href="/auth/signin">
                <a>
                  <div className="link">
                    <p>Hello, Sign in</p>
                    <p className="text-sm font-semibold whitespace-nowrap">
                      Account & Lists
                    </p>
                  </div>
                </a>
              </Link>
            )}

            <div className="link">
              <p>Returns</p>
              <p className="text-sm font-semibold whitespace-nowrap">
                & Orders
              </p>
            </div>

            <Link href="/checkout">
              <a>
                <div className="relative flex w-18 justify-between items-center link">
                  <ShoppingCartIcon className="h-9 w-9" />
                  <div className="absolute -top-1 -right-2 sm:right-5">
                    <p className="bg-yellow-500 rounded-full px-2 p-1 items-center justify-center text-xs font-medium">
                      {cart.totalQty}
                    </p>
                  </div>

                  <p className="hidden sm:inline text-base font-semibold mt-4">
                    Cart
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </div>

        <div className="mx-3">
          <SearchBar mobileMode={false} />
        </div>
      </div>

      <nav className="flex items-center h-9 bg-amazon_blue-light">
        <div className="ml-4">
          <MenuIcon className="text-white w-6 h-6" />
        </div>

        <div className="flex items-center space-x-3 text-xs sm:text-sm text-white font-medium m-2 mr-3 ">
          <p>All</p>
          <p>Today's Deals</p>
          <p>Customer Service</p>
          <p>Gift Cards</p>
          <p className="hidden sm:inline">Registry</p>
          <p className="hidden sm:inline">Sell</p>
          <p className="hidden sm:inline">Health & Personal Care</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
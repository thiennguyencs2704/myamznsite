import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../store/userSlice";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../../firebase";
import { ShoppingCartIcon, MenuIcon } from "@heroicons/react/outline";
import SearchBar from "./SearchBar";
import { getLastCart } from "../../store/cartSlice";
import Menu from "../Modals/Menu";
import useWindowWidth from "../../hooks/useWindowWidth";

const Header = ({ screenWidth }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart);

  const currentWidth = useWindowWidth(screenWidth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handlerCloseMenu = () => {
    setIsOpenMenu(false);
    document.documentElement.style.overflow = "auto";
    document.body.scroll = "yes";
  };

  const handlerSignout = () => {
    auth.signOut();
    dispatch(signout());
  };

  useEffect(() => {
    const lastCart = localStorage.getItem("cart");
    if (lastCart) {
      dispatch(getLastCart(JSON.parse(lastCart)));
    }
  }, []);

  useEffect(() => {
    cart.totalQty
      ? localStorage.setItem("cart", JSON.stringify(cart))
      : localStorage.removeItem("cart");
  }, [cart.totalQty]);

  return (
    <header className="sticky top-0 z-30">
      <Menu isOpenMenu={isOpenMenu} handlerCloseMenu={handlerCloseMenu} />

      <div className="flex flex-col bg-amazon_blue">
        <div className="flex items-center justify-between flex-grow w-full h-16 pr-3 text-white">
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

          {currentWidth >= 640 && <SearchBar />}

          <div className="flex items-center mx-3 space-x-1 text-xs">
            {user ? (
              <div onClick={handlerSignout} className="link-search">
                <p>Hello, {user.email}</p>
                <p className="text-sm font-semibold whitespace-nowrap">
                  Sign Out
                </p>
              </div>
            ) : (
              <Link href="/auth/signin">
                <a>
                  <div className="link-search">
                    <p>Hello, Sign in</p>
                    <p className="text-sm font-semibold whitespace-nowrap">
                      Account & Lists
                    </p>
                  </div>
                </a>
              </Link>
            )}

            <div className="link-search">
              <p>Returns</p>
              <p className="text-sm font-semibold whitespace-nowrap">
                & Orders
              </p>
            </div>

            <Link href="/checkout">
              <a>
                <div className="link-search relative flex h-[46px] w-18 justify-between items-center">
                  <ShoppingCartIcon className="h-9 w-9" />
                  <div className="absolute -top-1 -right-2 sm:right-5">
                    <p className="items-center justify-center p-1 px-2 text-xs font-medium bg-yellow-500 rounded-full">
                      {cart.totalQty}
                    </p>
                  </div>

                  <p className="hidden mt-4 text-base font-semibold sm:inline">
                    Cart
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </div>

        {currentWidth < 640 && currentWidth > 0 && (
          <div className="mx-3">
            <SearchBar />
          </div>
        )}
      </div>

      <nav className="flex items-center h-9 bg-amazon_blue-light">
        <div
          onClick={() => setIsOpenMenu(true)}
          className="link-nav items-center flex ml-4 text-white font-medium h-[30px]"
        >
          <MenuIcon className="w-6 h-6 mr-1" />
          <p>All</p>
        </div>

        <div className="flex items-center text-xs font-medium text-white sm:text-sm">
          <Link href="/nav/bestsellers">
            <a className="link-nav">Best Sellers</a>
          </Link>

          {/* <Link href="/nav/combination">
            <a className="link-nav">Combination</a>
          </Link> */}
          <p className="link-disable">Apple</p>
          <p className="link-disable">Customer Service</p>
          <p className="hidden sm:inline link-disable">Gift Cards</p>
          <p className="hidden md:inline link-disable">Registry</p>
          <p className="hidden md:inline link-disable">Sell</p>
          <p className="hidden lg:inline link-disable">
            Health & Personal Care
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Header;

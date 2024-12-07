import React, { useEffect, useState } from "react";
import SideMenu from "./components/sidemenu/SideMenu";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import sidemenuProps from "./assets/props/sidemenuProps";
import ProductPage from "./pages/ProductPage";
import CollectionPage from "./pages/CollectionPage";

import LoginModal from "./components/LoginModal";
import { ProductsProvider } from "./store/productContext";
import { StockProvider } from "./store/stockContext";
import { CollectionProvider } from "./store/collectionContext";
import StockPage from "./pages/StockPage";
import DashboardPage from "./pages/DashboardPage";
import BillPage from "./pages/BillPage";
import { RetailBillProvider } from "./store/retailBillContext";
import { ClientProvider } from "./store/clientContext";
import ClientPage from "./pages/ClientPage";
import { WholeSaleProvider } from "./store/wholeSaleBillContext";
import NotFound from "./pages/NotFound";
import PurchasePage from "./pages/PurchasePage";
import { PurchasesProvider } from "./store/purchaseContext";
import Revenue from "./pages/Revenue";
import { toast } from "react-toastify";
import { AdminProvider } from "./store/adminContext";

const App = () => {
  // Check if auth status is stored in localStorage
  const storedAuth = localStorage.getItem("auth");
  const [auth, setAuth] = useState(storedAuth ? JSON.parse(storedAuth) : false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000);
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Update localStorage when auth status changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <>
      <BrowserRouter>
        <CollectionProvider>
          {/* {!auth && <LoginPage setAuth={setAuth} />} */}
          {!auth && <LoginModal setAuth={setAuth}></LoginModal>}

          {auth && (
            <AdminProvider>
              <ProductsProvider>
                <PurchasesProvider>
                  <StockProvider>
                    <RetailBillProvider>
                      <WholeSaleProvider>
                        <ClientProvider>
                          {isWideScreen && (
                            <SideMenu
                              sidemenuProps={{ ...sidemenuProps }}
                              setAuth={setAuth}
                            >
                              <Routes>
                                <Route
                                  path="/"
                                  element={<DashboardPage />}
                                ></Route>
                                <Route
                                  path="/products"
                                  element={<ProductPage />}
                                ></Route>
                                <Route
                                  path="/purchase"
                                  element={<PurchasePage />}
                                ></Route>
                                <Route
                                  path="/collection"
                                  element={<CollectionPage />}
                                ></Route>
                                <Route
                                  path="/stocks"
                                  element={<StockPage />}
                                ></Route>
                                <Route
                                  path="/bills"
                                  element={<BillPage />}
                                ></Route>
                                <Route
                                  path="/revenue"
                                  element={<Revenue />}
                                ></Route>

                                <Route
                                  path="/clients"
                                  element={<ClientPage />}
                                ></Route>
                                <Route path="*" element={<NotFound />}></Route>
                              </Routes>
                            </SideMenu>
                          )}
                          {!isWideScreen && (
                            <div className="bg-primary-light">
                              <Routes>
                                <Route
                                  path="/"
                                  element={<DashboardPage setAuth={setAuth} />}
                                ></Route>
                                <Route
                                  path="/products"
                                  element={<ProductPage />}
                                ></Route>
                                <Route
                                  path="/purchase"
                                  element={<PurchasePage />}
                                ></Route>
                                <Route
                                  path="/collection"
                                  element={<CollectionPage />}
                                ></Route>
                                <Route
                                  path="/stocks"
                                  element={<StockPage />}
                                ></Route>
                                <Route
                                  path="/bills"
                                  element={<BillPage />}
                                ></Route>
                                <Route
                                  path="/revenue"
                                  element={<Revenue />}
                                ></Route>

                                <Route
                                  path="/clients"
                                  element={<ClientPage />}
                                ></Route>
                                <Route path="*" element={<NotFound />}></Route>
                              </Routes>
                            </div>
                          )}
                        </ClientProvider>
                      </WholeSaleProvider>
                    </RetailBillProvider>
                  </StockProvider>
                </PurchasesProvider>
              </ProductsProvider>
            </AdminProvider>
          )}
        </CollectionProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

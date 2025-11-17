"use client";
import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import EnrollmentInitializer from "./EnrollmentInitializer";
import Session from "./Account/Session";
// import "./globals.css"; 

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <Session>
        <EnrollmentInitializer />
        <div id="wd-kambaz">
          <div className="d-flex">
            <div>
              <KambazNavigation />
            </div>
            <div className="wd-main-content-offset p-3 flex-fill">
              {children}
            </div>
          </div>
        </div>
      </Session>
    </Provider>
  );
}
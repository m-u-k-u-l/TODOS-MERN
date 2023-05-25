import React from "react"
import { Outlet } from "react-router-dom";
import Header from "./../header/Header"
import Footer from "./../footer/Footer"

class Layout extends React.Component {
  render(){
    return (
      <>
        <Header />
        <div className="main">
        <Outlet/>
        </div>
        <Footer />
      </>
    )
  }
}
export default Layout;
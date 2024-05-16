import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function PageLayout() {
  return (
    <div className="xl:container mx-auto px-4">
      <Header />
      <Outlet />
    </div>
  );
}

export default PageLayout;

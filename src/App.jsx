import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";

function resolvePage(pathname) {
  if (pathname === "/" || pathname === "/home") {
    return HomePage;
  }
  if (pathname.startsWith("/products")) {
    return ProductsPage;
  }
  if (pathname.startsWith("/contact")) {
    return ContactPage;
  }
  if (pathname.startsWith("/about")) {
    return AboutPage;
  }
  return HomePage;
}

export default function App() {
  const pathname = window.location.pathname.toLowerCase();
  const ActivePage = resolvePage(pathname);

  return <ActivePage />;
}

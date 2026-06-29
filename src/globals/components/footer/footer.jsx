const Footer = () => (
  <footer className="p-10 text-center text-gray-500 bg-gray-900">
    <p>&copy; {new Date().getFullYear()} ShopLogo Inc. All rights reserved.</p>
    <div className="mt-2 space-x-4">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </div>
  </footer>
);

export default Footer
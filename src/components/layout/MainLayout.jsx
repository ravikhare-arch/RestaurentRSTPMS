import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <Sidebar />
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  </div>
)

export default MainLayout

import Welcome from './components/Welcome';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import CompanyCard from './components/CompanyCard';
import JobCard from './components/JobCard';
function App(){
  return(
    <div>
      <Navbar />
      <Welcome />
      <Footer />
      <CompanyCard />
      <JobCard />
    </div>
  )
}
export default App;

import { About, Footer, Header,Testimonial } from './container';
import { Navbar } from './components';
import Gallery from './components/Media/MediaGallery';
import Staff from './components/Staff/Staff';
import Calender from './components/Carlender/Carlender'
import News from './components/News/News';
import './App.scss';
import SchoolFees from './components/Fees/fees';

const App = () => (
  <div className="overflow-clip">
    <Navbar />
    <Header />
    <About />
    <Gallery />
    <Staff />
    <Calender />
    <News />
    <SchoolFees />
    <Testimonial />
    <Footer />
  </div>
);

export default App;

import { About, Footer, Header,Testimonial } from './container';
import { Navbar } from './components';
import Gallery from './components/Media/MediaGallery';
import Staff from './components/Staff/Staff';
import Choice from './container/Choice/Choice';
import News from './components/News/NewsAndEvents';
import './App.scss';
import Academics from './components/Academics/Academics';

const App = () => (
  <div className="overflow-clip">
    <Navbar />
    <Header />
    <Choice />
    <About />
    <Gallery />
    <Staff />
    <News />
    <Academics />
    <Testimonial />
    <Footer />
  </div>
);

export default App;

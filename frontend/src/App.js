import classes from './App.css';
import {Route, Routes} from 'react-router-dom';

import Layout from './components/layout/Layout'
import AllImages from "./components/pages/AllImages";
import HomePage from "./components/pages/Homepage";
import AddImage from "./components/pages/AddImage";
import Profile from "./components/pages/Profile";
import API from "./components/pages/API";
import ImageDetailPage from "./components/pages/ImageDetailPage"
import ListOfAlbums from "./components/pages/ListOfAlbums";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/images' element={<AllImages/>}/>
                <Route path='/images/:imageId' element={<ImageDetailPage/>}/>
                <Route path='/add-image' element={<AddImage/>}/>
                <Route path='/albums' element={<ListOfAlbums/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/api' element={<API/>}/>
            </Routes>
        </Layout>
    );
}

export default App;

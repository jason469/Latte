import classes from './App.css';
import {Route, Routes} from 'react-router-dom';

import Layout from './components/layout/Layout'

import ListOfImages from "./components/pages/images/ListOfImages";
import AddImage from "./components/pages/images/AddImage";
import ImageDetailPage from "./components/pages/images/ImageDetailPage"
import ListOfAlbums from "./components/pages/images/ListOfAlbums";

import ListOfTags from "./components/pages/tags/ListOfTags";
import AddTag from "./components/pages/tags/AddTag";
import TagDetailPage from "./components/pages/tags/TagDetailPage";

import HomePage from "./components/pages/website/Homepage";
import Profile from "./components/pages/website/Profile";
import API from "./components/pages/website/API";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage/>}/>

                <Route path='/images' element={<ListOfImages/>}/>
                <Route path='/images/:imageId' element={<ImageDetailPage/>}/>
                <Route path='/add-image' element={<AddImage/>}/>

                <Route path='/tags' element={<ListOfTags/>}/>
                <Route path='/tags/:tagId' element={<TagDetailPage/>}/>
                <Route path='/add-tag' element={<AddTag/>}/>

                <Route path='/albums' element={<ListOfAlbums/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/api' element={<API/>}/>
            </Routes>
        </Layout>
    );
}

export default App;

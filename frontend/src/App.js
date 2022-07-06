import {AuthProvider} from "./contexts/AuthContext";
import {UpdateProvider} from "./contexts/UpdateContext";

import {Route, Routes} from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes'

import Layout from './components/layout/Layout'

import ListOfImages from "./components/pages/images/ListOfImages";
import AddImage from "./components/pages/images/AddImage";
import ImageDetailPage from "./components/pages/images/ImageDetailPage"

import ListOfTags from "./components/pages/tags/ListOfTags";
import AddTag from "./components/pages/tags/AddTag";
import TagDetailPage from "./components/pages/tags/TagDetailPage";

import ListOfAlbums from "./components/pages/albums/ListOfAlbums";
import AlbumDetailPage from "./components/pages/albums/AlbumDetailPage";
import AddAlbum from "./components/pages/albums/AddAlbum";

import HomePage from "./components/pages/website/Homepage";
import Profile from "./components/pages/website/Profile";
import LoginPage from "./components/pages/website/LoginPage";

function App() {
    return (
        <AuthProvider>
            <UpdateProvider>
                <Layout>
                    <Routes>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path="/" element={<PrivateRoutes/>}>
                            <Route path='/' element={<HomePage/>}/>

                            <Route path='/images' element={<ListOfImages/>}/>
                            <Route path='/images/:imageId' element={<ImageDetailPage/>}/>
                            <Route path='/add-image' element={<AddImage/>}/>

                            <Route path='/tags' element={<ListOfTags/>}/>
                            <Route path='/tags/:tagId' element={<TagDetailPage/>}/>
                            <Route path='/add-tag' element={<AddTag/>}/>

                            <Route path='/albums' element={<ListOfAlbums/>}/>
                            <Route path='/albums/:albumId' element={<AlbumDetailPage/>}/>
                            <Route path='/add-album' element={<AddAlbum/>}/>

                            <Route path='/profile' element={<Profile/>}/>
                        </Route>
                    </Routes>
                </Layout>
            </UpdateProvider>
        </AuthProvider>
    )
        ;
}

export default App;

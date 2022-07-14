import NavigationBar from './NavigationBar';
import '../../App.css'


function Layout(props) {
    return (
        <div id="container">
            <NavigationBar/>
            <main className="main">{props.children}</main>
        </div>
    );
}

export default Layout;

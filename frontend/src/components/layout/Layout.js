import './Layout.module.css';
import NavigationBar from './NavigationBar';

function Layout(props) {
    return (
        <div id="container">
            <NavigationBar/>
            <main className="main">{props.children}</main>
        </div>
    );
}

export default Layout;

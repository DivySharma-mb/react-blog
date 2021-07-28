import Nav from "./Nav"

export default function Header(props) {
    return (
        <header>
            <h1>
                BlogFiesta!
                <span>Your blogging destination.</span>
            </h1>
           <Nav /> 
        </header>
    )
}
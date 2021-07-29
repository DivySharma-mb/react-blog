import Nav from "./Nav"

export default function Header({user}) {
    return (
        <header>
            <h1>
                BlogFiesta!
                <span>Your blogging destination.</span>
            </h1>
           <Nav user={user} /> 
        </header>
    )
}
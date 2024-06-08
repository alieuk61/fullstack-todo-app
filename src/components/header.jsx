// import style
import SunIcon from "../assets/images/icon-sun";
import MoonIcon from "../assets/images/icon-moon";
import { useContext } from "react";
import { myContext } from "../context/context";

export default function Header () {
    const {theme, setTheme} = useContext(myContext);
    console.log(theme)

    function toggleTheme () {
        if (theme == 'light'){
            setTheme('dark')
        }else{
            setTheme('light')
        }
        console.log(theme)
    }

    return(
        <div className="header">
            <div>
                <h1>todo</h1>
                <span onClick={toggleTheme}>
                {theme == 'light' ? <MoonIcon/> : <SunIcon />}
                </span>
            </div>
            
        </div>
    )
}
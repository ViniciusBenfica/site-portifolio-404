import styles from "./styles/Header.module.scss"
import logo from "../public/icon.png"

import Image from "next/image"
import router from "next/router"

export default function Header(){

    return(
        <header className={styles.header}>

            <div className={styles.image}>
                <Image src={logo} width={100} height={100}/>
                <div>404 DEVELOPMENT</div>
            </div>

            <div className={styles.bottomHeader}>
                <hr></hr>
                <div onClick={() => router.push('/')}>NOSSOS SCRIPTS</div>
                <hr></hr>
            </div>
            
        </header>
    )
}
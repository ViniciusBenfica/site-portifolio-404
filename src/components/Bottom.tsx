import styles from "./styles/Bottom.module.scss"

/* import Link from 'next/link' */
import logo from "../public/icon.png"

import Image from "next/image"
import { memo } from "react"

function Bottom(){

    return(
        <div className={styles.bottom}>

            <div className={styles.image}>
                <Image src={logo} width={100} height={100}/>
                <div>404 DEVELOPMENT</div>
            </div>

        </div>
    )
}

export default memo(Bottom)
import styles from "./styles/Header.module.scss"
import logo from "../public/icon.png"

import discord from "../public/discord.png"
import entrar from "../public/entrar.png"

import Image from "next/image"

import router from "next/router"

export default function Header(){

    return(
        <header className={styles.header}>

            <div className={styles.image}>
                <Image src={discord} width={100} height={100}/>
                <Image className={styles.logo} src={logo} width={100} height={100}/>
                <Image onClick={() => router.push('/identification')} src={entrar} width={100} height={100}/>
                {/* <div>404 DEVELOPMENT</div> */}
            </div>

            <div className={styles.bottomHeader}>
                <hr></hr>
                <div onClick={() => router.push('/')}>PORTIFÓLIO</div>
                <hr></hr>
                <div onClick={() => router.push('/')}>INÍCIO</div>
                <hr></hr>
                <div onClick={() => router.push('/')}>SOBRE NÓS</div>
                <hr></hr>
            </div>
            
        </header>
    )
}
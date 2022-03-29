import styles from "./styles/Header.module.scss"
import logo from "../public/icon.png"

import discord from "../public/discord.png"
import entrar from "../public/entrar.png"

import Image from "next/image"

import router from "next/router"
import { memo, useEffect, useState } from "react"

 function Header(){

    const [verifyToken, setVerifyToken] = useState<string>()
     
    useEffect(()=> {
     setVerifyToken(localStorage.getItem('tokenJWT'))
    //  console.log(verifyToken)
    })

    return(
        <header className={styles.header}>

            <div className={styles.image}>
                <Image onClick={() => router.push('https://discord.gg/CjbzggEerU')} src={discord} width={100} height={100}/>
                <Image className={styles.logo} src={logo} width={100} height={100}/>
                {
                    verifyToken
                    ? <Image onClick={() => router.push('https://discord.gg/CjbzggEerU')} src={discord} width={100} height={100}/>
                    : <Image onClick={() => router.push('/identification')} src={entrar} width={100} height={100}/>
                }
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

export default memo(Header)
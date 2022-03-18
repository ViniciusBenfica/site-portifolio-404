import { useEffect, useState } from "react"
import Bottom from "../components/Bottom"
import Header from "../components/Header"
import styles from "../styles/identification.module.scss"
import { api } from "../services/api"

import Image from "next/image"

import seePassword from "../public/seePassword.png"
import router from "next/router"

export default function identification(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [CPF, setCPF] = useState("")
    const [IP, setIP] = useState("")
    const [discord, setDiscord] = useState("")
    const [showWrongData, setShowWrongData] = useState("none")
    const [type, setType] = useState("password")
    const [inputWrongColor, setInputWrongColor] = useState("#616161")
    const [erroMessage, setErroMessage] = useState("")

    const [token, setToken] = useState<any>()

    function maskCPF(cpf: string){
        cpf=cpf.replace(/\D/g,"")
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        setCPF(cpf)
    }

    function maskIP(ip: any){
        ip=ip.replace(/\D/g,"")
        ip=ip.replace(/(\d{3})(\d)/,"$1.$2")
        ip=ip.replace(/(\d{3})(\d)/,"$1.$2")
        ip=ip.replace(/(\d{3})(\d)/,"$1.$2")
        setIP(ip)
    }

    const login = async () => {
        // const {data} = await api.post("/user/login", {
        const {data} = await api.post("/auth/auth/login", {
                email,
                password
              }
        )
        // console.log(data)

        setToken(data)

        if(data){
            router.push('/')
            localStorage.setItem("tokenJWT",data.access_token);
        }else{
            setInputWrongColor("red")
            setShowWrongData("block")
        }
    }

    const register = async () => {
        const {data} = await api.post("/user/create", {
                email,
                password,
                confirmPassword,
                CPF,
                IP,
                discord
              }
        )
        if(IP.length < 11){
            setErroMessage("IP não disponivel")
            return
        }

        if(data){
            router.push('/')
        }else{
            setErroMessage("Email já está em uso")
        }
    }
    
    const visiblePassword = () => {
        type == "password" ? setType("text") : setType("password") 
    }
    
    return (
        <div>
            <Header></Header>
            <div className={styles.background}><h1>IDENTIFICAÇÃO</h1></div>
            
                <div className={styles.body}>
                    <div>
                        <p>JÁ TENHO CADASTRO</p>
                        <div>
                            <input style={{borderColor: inputWrongColor}} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                            <input style={{borderColor: inputWrongColor}} onChange={(e) => setPassword(e.target.value)} type={type} placeholder="Senha"/>
                            {/* <Image onClick={() => visiblePassword()} className={styles.passwordIcon} src={seePassword} width={20} height={20}/> */}
                            <div style={{display: showWrongData}} className={styles.wrongData}>Dados invalidos, tente novamente</div>
                            <div onClick={() => login()} className={styles.button}>ENTRAR</div>
                            <div className={styles.passwordAndLogin}>
                                <div className={styles.password}>Esqueci minha senha</div>
                                <div className={styles.login}>Esqueci meu login</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>NÃO TENHO CADASTRO</p>
                        <div>
                            <input onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                            <input value={IP} onChange={(e) => maskIP(e.target.value)} placeholder="IP" maxLength={11}/>
                            <input onChange={(e) => setPassword(e.target.value)}placeholder="Crie sua senha"/>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme sua senha"/>
                            {/* <input value={CPF} onChange={(e) => maskCPF(e.target.value)} placeholder="CPF" maxLength={14}/> */}
                            <input onChange={(e) => setDiscord(e.target.value)} placeholder="Discord#0000"/>
                            <div className={styles.invalidData}>{erroMessage}</div>
                            <div onClick={() => register()} className={styles.button}>CADASTRAR</div>
                        </div>
                    </div>
            </div>
                <Bottom></Bottom>
        </div>
    )
}
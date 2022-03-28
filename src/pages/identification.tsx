import { useEffect, useState } from "react"
import Bottom from "../components/Bottom"
import Header from "../components/Header"
import styles from "../styles/identification.module.scss"
import { api } from "../services/api"

import Image from "next/image"

import seePassword from "../public/seePassword.png"
import router from "next/router"

export default function identification(){
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [CPF, setCPF] = useState<string>("")
    const [IP, setIP] = useState<string>("")
    const [discord, setDiscord] = useState<string>("")
    const [showWrongData, setShowWrongData] = useState<string>("none")
    const [type, setType] = useState<string>("password")
    const [inputWrongColorLogin, setInputWrongColorLogin] = useState<string>("#616161")
    const [inputWrongColorRegister, setInputWrongColorRegister] = useState<string>("#616161")
    const [erroMessage, setErroMessage] = useState<string>("")

    const [token, setToken] = useState<string>()

    function maskCPF(cpf: string){
        cpf=cpf.replace(/\D/g,"")
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        setCPF(cpf)
    }

    function maskIP(ip: string){
        ip=ip.replace(/\D/g,"")
        ip=ip.replace(/(\d{3})(\d)/,"$1.$2")
        ip=ip.replace(/(\d{3})(\d)/,"$1.$2")
        ip=ip.replace(/(\d{3})(\d)/,"$1.$2")
        setIP(ip)
    }

    async function login(): Promise<void>{
        try{
            const {data} = await api.post("/auth/auth/login", {
                email,
                password
                }
            )
            setToken(data)

            if(data){
                router.push('/')
                localStorage.setItem("tokenJWT",data.access_token);
                localStorage.setItem("email",parseJwt(data.access_token).email);
            }else{
                setInputWrongColorLogin("red")
                setShowWrongData("block")
            }
        }catch(error){
            setInputWrongColorLogin("red")
            setShowWrongData("block")
        }
           
    }

    function parseJwt (token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    async function register(): Promise<void>{
        console.log(password.length)
        try{
            if(IP.length < 11 || email.length < 1 || password.length < 1 || confirmPassword.length < 1 || discord.length < 1){
                setInputWrongColorRegister("red")
                setErroMessage("Dados preenchidos incorretamente")
                return
            }


            const {data} = await api.post("/user/create", {
                email,
                password,
                confirmPassword,
                // CPF,
                IP,
                discord
                }
            )

            if(data){
                router.push('/')
            }else{
                setErroMessage("Email inválido")
            }
        }catch(error){
            setInputWrongColorRegister("red")
        }
        
    }

    function visiblePassword(): void{
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
                            <input style={{borderColor: inputWrongColorLogin}} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                            <input className={styles.inputPassword} style={{borderColor: inputWrongColorLogin}} onChange={(e) => setPassword(e.target.value)} type={type} placeholder="Senha"/>
                            <span className={styles.passwordIcon}><Image onClick={() => visiblePassword()} src={seePassword} width={20} height={20}/></span>
                            <div style={{display: showWrongData}} className={styles.wrongData}>Dados invalidos, tente novamente</div>
                            <div onClick={() => login()} className={styles.button}>ENTRAR</div>
                            {/* <div className={styles.passwordAndLogin}>
                                <div className={styles.password}>Esqueci minha senha</div>
                                <div className={styles.login}>Esqueci meu login</div>
                            </div> */}
                        </div>
                    </div>
                    <div>
                        <p>NÃO TENHO CADASTRO</p>
                        <div>
                            <input style={{borderColor: inputWrongColorRegister}} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                            {/* <input value={CPF} onChange={(e) => maskCPF(e.target.value)} placeholder="CPF" maxLength={14}/> */}
                            <input style={{borderColor: inputWrongColorRegister}} value={IP} onChange={(e) => maskIP(e.target.value)} placeholder="IP" maxLength={11}/>
                            <input style={{borderColor: inputWrongColorRegister}} onChange={(e) => setDiscord(e.target.value)} placeholder="Discord#0000"/>
                            <input className={styles.inputPassword} style={{borderColor: inputWrongColorRegister}} onChange={(e) => setPassword(e.target.value)} type={type} placeholder="Crie sua senha"/>
                            <span className={styles.passwordIcon}><Image onClick={() => visiblePassword()} src={seePassword} width={20} height={20}/></span>
                            <input style={{borderColor: inputWrongColorRegister}} onChange={(e) => setConfirmPassword(e.target.value)} type={type} placeholder="Confirme sua senha"/>
                            <div className={styles.invalidData}>{erroMessage}</div>
                            <div onClick={() => register()} className={styles.button}>CADASTRAR</div>
                        </div>
                    </div>
            </div>
                <Bottom></Bottom>
        </div>
    )
}
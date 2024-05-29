import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function Inserir() {

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [usuario, setUsuario] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");
    const [telefone, setTelefone] = useState("");
    const [erro, setErro] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    async function Cadastro()
    {
        await fetch('https://fakestoreapi.com/users',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username:usuario,
                password:senha,
                name:{
                    firstname:nome,
                    lastname:sobrenome
                },
                address:{
                    city:cidade,
                    street:rua,
                    number:numero,
                    zipcode:cep,
                    geolocation:{
                        lat:'-37.3159',
                        long:'81.1496'
                    }
                },
                phone:telefone
            })
        })
        .then( res => (res.ok == true) ? res.json () : false)
        .then(json =>{
            setSucesso((json.id) ? true : false);
            setErro((json.id) ? false : true);

        } )
        .catch(err => console.log(true))

    }

    return(
        <ScrollView>
            {sucesso?
        <Text>Obrigado por se cadastrar. Seu cadastro foi realizado com sucesso!</Text>    
        :
        <>
            <Text style={css.text}>Insira seus dados</Text>
            <TextInput
                placeholder='Nome'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setNome(digitado) }
                value={nome}
            />
            <TextInput
                placeholder='Sobrenome'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setSobrenome(digitado) }
                value={sobrenome}
            />
            <TextInput
                placeholder='Email'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setEmail(digitado) }
                value={email}
            />
            <TextInput
                placeholder='Usuario'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setUsuario(digitado) }
                value={usuario}
            />
            <TextInput
                placeholder='Senha'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setSenha(digitado) }
                value={senha}
            />
            <TextInput
                placeholder='Rua'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setRua(digitado) }
                value={rua}
            />
            <TextInput
                placeholder='Numero'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setNumero(digitado) }
                value={numero}
            />
            <TextInput
                placeholder='Cidade'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setCidade(digitado) }
                value={cidade}
            />
            <TextInput
                placeholder='Cep'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setCep(digitado) }
                value={cep}
            />
            <TextInput
                placeholder='Telefone'
                placeholderTextColor="black"
                style={css.input}
                onChangeText={(digitado) => setTelefone(digitado) }
                value={telefone}
            />
            <TouchableOpacity style={css.btn} onPress={Cadastro}>
                <Text style={css.btnText}>CADASTRAR</Text>
            </TouchableOpacity>
            {erro && <Text style={css.text}>Revise cuidadosamente os campos.</Text>}
            
            </>
}
        </ScrollView>
    )
}

const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor:'white',
        alignItems:'center',
        marginTop: 15,
        justifyContent:"center",
        alignItems:"center"
        
    },
    text:{
        color:"black",
        textAlign:"center",
        fontSize:15,
        fontWeight:"bold"
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 25,
        color:"white",
        backgroundColor: "lightgray",
        alignItems:'center',
        marginLeft:38,
        marginTop:10

    },
    btn: {
        width: "80%",
        height: 50,
        backgroundColor: "gray",
        borderRadius: 5,
        marginBottom: 10,
        marginLeft:38
    },
    btnText: {
        fontSize: 20,
        lineHeight: 50,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})
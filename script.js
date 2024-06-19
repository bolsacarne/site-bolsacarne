// API CONVERSOES META

import sha256 from 'js-sha256';

const hashData = (data) => {
    return sha256(data);
};

import sha256 from 'js-sha256';

const enviarEventoConversao = async (nomeEvento, dadosUsuario, dadosCustomizados = {}) => {
    const tokenAcesso = 'EAAVRlQlHYagBO7wdbeTh0kn28UBNSZAxjtpZBJD8S5aFt91U3PyLU0pg5G0k2wusqNTh99A4Dm5SFLR0jZBCGe8alHGJA1d88ffYR6469OljhxtSxjWzWZCxj4CpZBpZBxwbEiwAVYfiPNUZArspqhwFwb2XHlOmS4878LNua5zZC8rhr3H7NDUU4NI0vnVyzZC3cWQZDZD';
    const pixelId = '1178894173243034';
    const urlApi = `https://graph.facebook.com/v12.0/${pixelId}/events`;

    
    const dadosUsuarioHash = {
        em: dadosUsuario.email ? sha256(dadosUsuario.email) : undefined,
        ph: dadosUsuario.telefone ? sha256(dadosUsuario.telefone) : undefined,
    };

    const cargaEvento = {
        data: [
            {
                event_name: nomeEvento,
                event_time: Math.floor(Date.now() / 1000),
                action_source: 'website',
                user_data: dadosUsuarioHash,
                custom_data: {
                    currency: dadosCustomizados.moeda,  
                    value: dadosCustomizados.valor.toString()  
                }
            }
        ]
    };

    try {
        const response = await fetch(`${urlApi}?access_token=${tokenAcesso}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cargaEvento)
        });

        const resultado = await response.json();
        if (response.ok) {
            console.log('Evento enviado com sucesso:', resultado);
        } else {
            console.error('Erro ao enviar evento:', resultado);
        }
    } catch (erro) {
        console.error('Erro:', erro);
    }
};


enviarEventoConversao('Purchase', { email: 'usuario@exemplo.com', telefone: '1234567890' }, { valor: 100, moeda: 'BRL' });
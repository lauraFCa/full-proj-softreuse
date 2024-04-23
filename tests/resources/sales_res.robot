*** Settings ***
Library     RequestsLibrary
Library     Collections

*** Variable ***
${HOST}         http://localhost:3000


*** Keywords ***
Conecta ao WebService
    Create Session      accessHost     ${HOST}


Realiza requisição do CEP
    [Arguments]         ${CEP_DESEJADO}
    ${RESPOSTA}=        Get Request  consultaCEP  /${CEP_DESEJADO}/?app_key=${APP_KEY}&app_secret=${APP_SECRET}            
    Log                 Resposta: ${RESPOSTA.text}
    Set Test Variable   ${RESPOSTA}


Confere o status code
    [Arguments]     ${STATUS_ESPERADO}
    Should Be Equal As Strings   ${RESPOSTA.status_code}  ${STATUS_ESPERADO}
    Log             Status Code Retornado: ${RESPOSTA.status_code} -- Status Code Esperado: ${STATUS_ESPERADO}

Confere endereço do CEP
    [Arguments]         ${ENDERECO}
    Dictionary Should Contain Item  ${RESPOSTA.json()}  endereco   ${ENDERECO}

Confere bairro do CEP
    [Arguments]         ${BAIRRO}
    Dictionary Should Contain Item  ${RESPOSTA.json()}  bairro   ${BAIRRO}

Confere cidade do CEP
    [Arguments]         ${CIDADE}
    Dictionary Should Contain Item  ${RESPOSTA.json()}  cidade   ${CIDADE}    

Confere UF do CEP
    [Arguments]         ${UF}
    Dictionary Should Contain Item  ${RESPOSTA.json()}  uf   ${UF}    

Confere CEP
    [Arguments]         ${CEP}
    Dictionary Should Contain Item  ${RESPOSTA.json()}  cep   ${CEP}  

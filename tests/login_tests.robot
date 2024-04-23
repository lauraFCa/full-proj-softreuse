*** Settings ***
Library         Collections
Library         RequestsLibrary

Test Setup      Given I start the session


*** Variables ***
${BASE_URL}    http://localhost:3000
${ALIAS}    Login Session


*** Keywords ***
Given I start the session
    Create Session    ${ALIAS}    ${BASE_URL}    disable_warnings=True


*** Test Cases ***

Invalid login - Wrong credentials (password)
    [Documentation]    Make a request with wrong password
    ${PAYLOAD}=         Create Dictionary       username=admin    password=123456
    ${response}=    POST On Session    ${ALIAS}     url=/login    json=${PAYLOAD}    expected_status=401
    
    Should Be Equal As Strings    ${response.content}    {"message":"Credenciais invalidas - Senha incorreta"}


Invalid login - Wrong credentials (username)
    [Documentation]    Make a request with wrong username
    ${PAYLOAD}=         Create Dictionary       username=fakeuser    password=123456
    ${response}=    POST On Session    ${ALIAS}     url=/login    json=${PAYLOAD}    expected_status=404
    
    Should Be Equal As Strings    ${response.content}    {"message":"Usuario nao encontrado"}


Invalid login - Empty credentials
    [Documentation]    Make a request with empty username and password
    ${PAYLOAD}=         Create Dictionary       username=    password=
    ${response}=    POST On Session    ${ALIAS}     url=/login    json=${PAYLOAD}    expected_status=404
    
    Should Be Equal As Strings    ${response.content}    {"message":"Usuario nao encontrado"}


Valid login
    [Documentation]    Make a request with valid username and password
    ${PAYLOAD}=         Create Dictionary       username=admin    password=admin
    ${response}=    POST On Session    ${ALIAS}     url=/login    json=${PAYLOAD}    expected_status=200
    
    Should Contain    ${response.content}     "token"

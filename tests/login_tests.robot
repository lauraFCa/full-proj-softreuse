*** Variables ***
${BASE_URL}    http://localhost:3000
${ALIAS}       Login Session


*** Settings ***
Library    Collections
Library    RequestsLibrary
Library    JSONLibrary
Resource    ./base.robot

Test Setup    Given I start the session    ${ALIAS} 


*** Test Cases ***

Given wrong password When make the request Then token should not be returned
    [Documentation]    Make a request with wrong password
    [Tags]    login    invalid
    ${PAYLOAD}=     Create Dictionary     username=admin    password=123456
    ${response}=    POST On Session       ${ALIAS}          url=/login        json=${PAYLOAD}    expected_status=401
    
    Should Be Equal As Strings    ${response.content}    {"message":"Credenciais invalidas - Senha incorreta"}


Given wrong username When make the request Then token should not be returned
    [Documentation]    Make a request with wrong username
    [Tags]    login    invalid
    ${PAYLOAD}=     Create Dictionary     username=fakeuser    password=123456
    ${response}=    POST On Session       ${ALIAS}             url=/login        json=${PAYLOAD}    expected_status=404
    
    Should Be Equal As Strings    ${response.content}    {"message":"Usuario nao encontrado"}


Given empty credentials When make the request Then token should not be returned
    [Documentation]    Make a request with empty username and password
    [Tags]    login    invalid
    ${PAYLOAD}=      Create Dictionary     username=    password=
    ${response}=     POST On Session       ${ALIAS}     url=/login    json=${PAYLOAD}    expected_status=404
    
    Should Be Equal As Strings    ${response.content}    {"message":"Usuario nao encontrado"}


Give Valid credentials When make the request Then token should be returned
    [Documentation]    Make a request with valid username and password
    [Tags]    login    valid
    ${PAYLOAD}=      Create Dictionary           username=admin    password=admin
    ${response}=     POST On Session            ${ALIAS}           url=/login    json=${PAYLOAD}    expected_status=200
    ${json_data}=    Convert String to JSON	    ${response.content}

    Dictionary Should Contain Key       ${json_data}       token

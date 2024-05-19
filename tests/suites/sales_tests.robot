*** Variables ***
${BASE_URL}    http://localhost:3000
${ALIAS}       Sales Session
${USERNAME}    admin
${PASSWORD}    admin

*** Settings ***
Library    Collections
Library    RequestsLibrary
Library    JSONLibrary
Resource    ../base.robot

Test Setup    Given I start the session    ${ALIAS}


*** Test Cases ***

Given an invalid token When request all sales Then response should be forbidden
    [Documentation]    Make an invalid request to get all sales
    [Tags]    sales    invalid
    ${PAYLOAD}=      Create Dictionary           Authorization=Bearer 123abc    Content-Type=application/json
    ${response}=     GET On Session            ${ALIAS}           url=/sales    headers=${PAYLOAD}    expected_status=403
    Should Be Equal As Strings    ${response.content}    {"message":"Token de autenticacao invalido"}


Given valid token When request all sales Then response should contain sales data
    [Documentation]    Make a valid request for all sales
    [Tags]    sales    valid
    ${token}=    Get auth token    ${ALIAS}    ${username}    ${password}
    ${headers}=      Create Dictionary           Authorization=Bearer ${token}    Content-Type=application/json
    ${response}=     GET On Session            ${ALIAS}           url=/sales    headers=${headers}    expected_status=200
    ${json_data}=    Convert String to JSON	    ${response.content}

    Dictionary Should Contain Key       ${json_data}       product
    Dictionary Should Contain Key       ${json_data}       quantity_sold
    Dictionary Should Contain Key       ${json_data}       total

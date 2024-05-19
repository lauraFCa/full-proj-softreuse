*** Settings ***
Library    Collections
Library    RequestsLibrary
Library    JSONLibrary

*** Variables ***
${BASE_URL}    http://localhost:3000


*** Keywords ***
Given I start the session    [Arguments]   ${session_alias}
    Create Session    ${session_alias}    ${BASE_URL}    disable_warnings=True


Get auth token    [Arguments]   ${session_alias}    ${USERNAME}    ${PASSWORD}
    ${PAYLOAD}=      Create Dictionary          username=${USERNAME}    password=${PASSWORD}
    ${response}=     POST On Session            ${session_alias}        url=/login        json=${PAYLOAD}        expected_status=200
    ${json_data}=    Convert String to JSON	    ${response.content}

    Dictionary Should Contain Key       ${json_data}       token
    RETURN    ${json_data}[token]



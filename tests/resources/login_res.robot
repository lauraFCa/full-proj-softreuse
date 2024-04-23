*** Settings ***
Library     RequestsLibrary
Library     Collections

*** Variable ***
${HOST}         http://localhost:3000
${ALIAS}    Login Session


*** Keywords ***
Given I start the session
    Create Session    ${ALIAS}    ${BASE_URL}    disable_warnings=True

When I use valid credentials
    ${PAYLOAD}=         Create Dictionary       username=admin    password=admin
    ${response}=    POST On Session    ${ALIAS}     url=/login    json=${PAYLOAD}    expected_status=200
    ${json_data}=    Convert String to JSON	    ${response.content}
    Dictionary Should Contain Key    ${json_data}    token
    ${jwt}=    Get Value From Json    ${json_data}    $..token
    Set Test Variable   ${jwt}


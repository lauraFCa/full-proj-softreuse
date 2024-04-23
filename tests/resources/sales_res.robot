*** Settings ***
Library     RequestsLibrary
Library     Collections

*** Variable ***
${HOST}         http://localhost:3000


*** Keywords ***
When I request all sales
    ${response}=       GET On Session    ${ALIAS}     url=/sales    expected_status=anything


Then the status code must be 
    [Arguments]    @{expected_status}
    Should Be Equal As Strings   ${response.status_code}  ${expected_status}


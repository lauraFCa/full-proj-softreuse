*** Settings ***
Library    Collections
Library    RequestsLibrary
Library    JSONLibrary

*** Variables ***
${BASE_URL}    http://localhost:3000


*** Keywords ***
Given I start the session    [Arguments]   ${session_alias}
    Create Session    ${session_alias}    ${BASE_URL}    disable_warnings=True

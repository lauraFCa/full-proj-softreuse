*** Settings ***
Documentation       Suíte de Exemplo de testes API com o Robot Framework
Resource            resources/login_res.robot
Resource            resources/sales_res.robot

*** Test Case ***
Cenário 01: Request all sales without authentication
    Given I start the session
    When I request all sales
    Then the status code must be 401

import tkinter as tk
import requests

def fazer_login():
    username = entry_usuario.get()
    password = entry_senha.get()

    url_autenticacao = "http://localhost:3000/login"  

    parametros = {
        "username": username,
        "password": password
    }

    resposta = requests.post(url_autenticacao, json=parametros)

    if resposta.status_code == 200:
        label_status.config(text="Login bem-sucedido", fg="green")
    else:
        label_status.config(text="Erro ao fazer login", fg="red")

# Cria a janela principal
root = tk.Tk()
root.title("Login")

# Cria os widgets
label_usuario = tk.Label(root, text="Usuário:")
label_usuario.grid(row=0, column=0, padx=5, pady=5)

entry_usuario = tk.Entry(root)
entry_usuario.grid(row=0, column=1, padx=5, pady=5)

label_senha = tk.Label(root, text="Senha:")
label_senha.grid(row=1, column=0, padx=5, pady=5)

entry_senha = tk.Entry(root, show="*")
entry_senha.grid(row=1, column=1, padx=5, pady=5)

button_login = tk.Button(root, text="Login", command=fazer_login)
button_login.grid(row=2, column=0, columnspan=2, padx=5, pady=5)

label_status = tk.Label(root, text="")
label_status.grid(row=3, column=0, columnspan=2, padx=5, pady=5)

# Inicia o loop principal da aplicação
root.mainloop()

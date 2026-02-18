venv:
    criar uma (só uma vez se caso não tenha): python -m venv venv

    windownns: .\venv\Scripts\Activate
    linuxxx: source venv/bin/activate

    se deu certo deve aparecer um venv na frente do caminho atual no terminal

servidor fastapi com uvicorn
    instale (com a venv ativada) pip install fastapi uvicorn

    para ativar: uvicorn <nome do arquivo>:app --reload
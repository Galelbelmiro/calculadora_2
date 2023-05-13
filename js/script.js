
/* SELECIONANDO OPERAÇÃO ANTERIOR */
const previousOperationText = document.querySelector("#previus-operation")

/* SELECIONANDO OPERAÇÃO ATUAL */
const currentOperationText = document.querySelector("#current-operation")

/* SELECIONANDO TODOS OS BOTÕES */
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {

    /* SEMPRE QUE INICIALIZAR ESSAS INFORMAÇÕES SERÃO CARREGADAS */
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // ADICIONAR DIGITO
    addDigit(digit) {

        // VERIFICAMOS SE É UM PONTO QUE ESTÁ SENDO DIGITADO E SE JÁ EXISTE UM, PODE NO MÁX 1 PONTO
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    // AQUI PORCESSAMOS TODAS AS INFORMAÇÕES
    processOperation(operation) {
        // CHECA SE O VALOR ATUAL ESTÁ VAZIO
        if (this.currentOperationText.innerText === "" && operation !== "C") {

            // MUDA OPERAÇÃO
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }

            return;
        }




        let operationValue;
        const previous = + this.previousOperationText.innerText.split(" ")[0] // O SPLIT PRECISA DESSE ESPAÇO
        const current = + this.currentOperationText.innerText

        // VERIFICANDO QUAL OPERAÇÃO QUE FOI ESCOLHIDA
        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "DEL":
                this.processDelOperator();
                break;

            case "CE":
                this.processClearCurrentOperation();
                break;

            case "C":
                this.processClearAllOperation();
                break;

            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // AQUI ATUALIZAMOS AS INFORMAÇÕES NA TELA
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            // CHECAR SE O VALOR É ZERO, SE FOR APENAS ADICIONA O VALOR
            if (previous === 0) {
                operationValue = current
            }

            // ADICIONA VALOR ATUAL LÁ PARA O PREVIOUS
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    // ESCOLHER A OPERAÇÃO DESEJADA
    changeOperation(operation) {

        // OPERAÇÕES MATEMÁTICAS DISPONÍVEIS
        const mathOperations = ["*", "/", "-", "+"]

        // VERIFICAMOS SE A OPERAÇÃO ESCOLHIDA PELO USUÁRIO EXISTE, SE NÃO EXISTIR APENAS RETORNAMOS 
        if (!mathOperations.includes(operation)) {
            return
        }

        // SE A OPERAÇÃO EXISTIR E O USUÁRIO APERTAR EM (+) E DESEJAR TROCAR DE OPERAÇÃO, ELE PODE, BASTA CLICAR NA NOVA OPERAÇÃO DESEJADA (-) (*) (/)
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    // DELETA O ÚLTIMO DIGITO
    processDelOperator() {
        // COM A FUNÇÃO SLICE, REMOVEREMOS O ÚLTIMO NÚMERO
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // LIMPA A OPERAÇÃO ATUAL
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // LIMPA TODA A OPERAÇÃO
    processClearAllOperation() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    // OPERADOR DE IGUALDADE
    processEqualOperator() {
        //
        const operation = this.previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation);

    }

}

/* INSTANCIANDO O OBJETO CALCULATOR */
const Calc = new Calculator(previousOperationText, currentOperationText);


/* AQUI PEGAMOS TODOS OS BOTÕES UM A UM */
buttons.forEach((btn) => {

    /* AQUI ADICIONAMOS O EVENTO DE CLICK EM CADA BOTÃO E PEGAMOS O EVENTO (e)  */
    btn.addEventListener("click", (e) => {

        // AQUI CAPTURAMOS O VALOR DIGITADO E JOGAMOS NA VARIÁVEL VALUE
        const value = e.target.innerText;

        /* SE O VALOR FOR NÚMERICO OU PONTO, EU QUERO PROCESSAR UMA INFORMAÇÃO */
        if (+value >= 0 || value === ".") {
            Calc.addDigit(value)
        } else {
            Calc.processOperation(value)
        }

    });
});
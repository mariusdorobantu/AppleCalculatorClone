class App {
    constructor() {
        this.$displayEl = document.querySelector('.display--container');
        this.$allBtns = document.querySelectorAll('.btn');
        this.$deleteBtn = document.querySelector('.delete--btn');
        this.$equalBtn = document.querySelector('.equal--btn');
        this.$dotBtn = document.querySelector('.dot--btn');

        this.firstNumber = ''; 
        this.secondNumber = '';
        this.operation = '';

        this.$allBtns.forEach(element => {
            element.addEventListener('click', this.handleButtonPress.bind(this));
        });

        this.$deleteBtn.addEventListener('click', () => {
            this.clearDisplay();
        });

        this.$equalBtn.addEventListener('click', () => {
            this.calculateResult();
        });
    }

    handleButtonPress(event) {
        const btnValue = event.target.textContent;
        
        if (!isNaN(btnValue) || btnValue === '.') {
            if (this.operation === '') {
                this.firstNumber += btnValue;
                this.updateDisplay(this.firstNumber);
            } else {
                this.secondNumber += btnValue;
                this.updateDisplay(this.secondNumber);
            }
        } else if (btnValue === '%') {
            this.firstNumber = (parseFloat(this.firstNumber) / 100).toString();
            this.updateDisplay(this.firstNumber);
        } else if (btnValue === '+/-') {
            if (this.operation === '') {
                this.firstNumber = (-parseFloat(this.firstNumber)).toString();
                this.updateDisplay(this.firstNumber);
            } else {
                this.secondNumber = (-parseFloat(this.secondNumber)).toString();
                this.updateDisplay(this.secondNumber);
            }
        } else {
            if (this.operation !== '') {
                this.calculateResult();
            }
            this.operation = btnValue;
        }
    }

    updateDisplay(value) {
        const maxDisplayLength = 7;
        
        if (value.length <= maxDisplayLength) {
            this.$displayEl.textContent = value;
        }
    }

    clearDisplay() {
        this.updateDisplay('');
        this.firstNumber = '';
        this.secondNumber = '';
        this.operation = '';
    }

    calculateResult() {
        let result;
        const num1 = parseFloat(this.firstNumber);
        const num2 = parseFloat(this.secondNumber);
      
        if (!num1 || !num2) return;

        switch (this.operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    result = "Error";
                }
                break;
            default:
                result = num1;
        }
        
        this.updateDisplay(result.toString());
        
        this.firstNumber = result.toString();
        this.secondNumber = '';
        this.operation = '';
    }
}

new App();

class Budget {
    constructor() {
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenses = document.getElementById("expenses");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("expenseAmount-input");
      this.expenseList = document.getElementById("expense-list");
      this.itemList = [];
      this.itemID = 0;
      this.collectForm = document.getElementById("collect-form");
      this.collectInput = document.getElementById("collect-input");
      this.collectAmountInput = document.getElementById("collectAmount-input");
      this.collectList = document.getElementById("collect-list");
      this.collectInfo = document.getElementById("collect-info");
      this.collectAmountForm = document.getElementById("collect-amount-form");
      this.collectInputSum = document.getElementById("collect-input-sum");
      this.collectTotalSum = document.getElementById("collect-total-sum");
      this.myChart = this.clickAnalyticForm();
        this.AnalyticBudgetValue = false;
        this.AnalyticCollectValue = false;
    }

    //Форма бюджету
    submitBudgetForm(){
        const value = this.budgetInput.value;
        if(value === '' || value < 0){
        alert("Значення не може бути від'ємним!");
      
        } else {
          this.budgetAmount.textContent = value;
          this.budgetInput.value = '';
          this.showBalance();
        }
        this.AnalyticBudgetValue = value;
    }
  
    //показати залишок на рахунку
    showBalance(){
      const expense = this.totalExpense();
      const total = parseInt(this.budgetAmount.textContent) - expense;
      this.balanceAmount.textContent = total;
      if(total > 0){
        this.balance.classList.add('showGreen');
      }
    
    }
    //Форма витрат
    submitExpenseForm(){
      const expenseValue = this.expenseInput.value;
      const amountValue = this.amountInput.value;
      if(expenseValue === '' || amountValue === '' || amountValue < 0){
       alert("Значення не може бути від'ємним!")
      } else {
        let amount = parseInt(amountValue);
        this.expenseInput.value = '';
        this.amountInput.value = '';
  
        let expense = {
          id: this.itemID,
          title: expenseValue,
          amount: amount
        }
        this.itemID++;
        this.itemList.push(expense);
        this.addExpense(expense);
        this.showBalance();
        if(expense.amount > 0) {
          this.expenses.classList.add('showRed');
        }
      }
    }

    //додати витрати
    addExpense(expense){
      const div = document.createElement('div');
      div.classList.add('expense-list');
      div.innerHTML = `
      <div class="expense-item-title"> 
      <h5 class="expense-title list-item">- ${expense.title}</h5>
      </div>
      <div class="expense-title-amount">
      <h5 class="expense-amount  list-item">-${expense.amount}₴</h5>
      </div>
      `;
     this.expenseList.appendChild(div);
    }
  
    // Форма збору назви і суми
    submitCollectForm(){
      const collectValue = this.collectInput.value;
      const collectAmountValue = this.collectAmountInput.value;
      if (collectValue === '' || collectAmountValue === '' || collectAmountValue < 0) {
        alert("Введіть правильне число!");
      } else {
        let collectAmount = parseInt(collectAmountValue);
        this.collectInput.value = '';
        this.collectAmountInput.value = '';
        let collect = {
          title: collectValue,
          amount: collectAmount
        }
        this.addCollect(collect)
      }
    }

    // назва і сума збору
    addCollect(collect) {
      const div = document.createElement('div');
      div.classList.add('collect-info');
      div.innerHTML = `
      <div class="collect-info-title"><h3>Мета</h3><span class="dash">:</span><h3>${collect.title}</h3></div>
      <p class="collect-general-amount">Загальна сума збору: <span>₴ </span><span id="collectAmount-input">${collect.amount}</span></p>
      
      `;
      this.collectList.appendChild(div);
    }

    // форма поповнення збору 
    submitCollectAmountForm() {
      const collectAmount = this.collectInputSum.value;
      if(collectAmount === '' || collectAmount < 0){
      alert("Значення не може бути від'ємним!")
      } else {
        this.collectInputSum.textContent = collectAmount;
        this.collectInputSum.value = '';
        this.showCollectSum();
      }
    }

    // показати суму поповнення збору
    showCollectSum(){
      const totalSum = parseInt(this.collectInputSum.textContent);
      this.collectTotalSum.textContent = totalSum;
      this.AnalyticCollectValue += totalSum;
    }

    
    //Загальні витрати
    totalExpense(){
      let total = 0;
      if(this.itemList.length > 0){
        total = this.itemList.reduce(function(acc, curr){
          acc += curr.amount;
          return acc;
        }, 0)
      }
        this.expenseAmount.textContent = total;
       return total;
    }

    // форма аналітики з використанням бібліотеки Chart.js
    clickAnalyticForm(){
      let labelName = ['Бюджет','Збір'];
      let ctx = document.getElementById('myChart').getContext('2d');
      return new Chart(ctx, {
          type: 'doughnut',
          data : {
        labels: labelName,
        datasets: [{
          label: 'Аналітика',
          data: [this.AnalyticBudgetValue, this.AnalyticCollectValue],
          backgroundColor: [
            'rgb(50,205,50)',
            'rgb(65,105,225)'
          ],
          hoverOffset: 4,
        }]
      }});
    }

//  подія оновлення аналітики
    reloadAnalyticForm() {
        if(!this.myChart){
            this.myChart = this.clickAnalyticForm();
            return;
        }
        this.myChart.data.datasets[0].data[0] = this.AnalyticBudgetValue;
        this.myChart.data.datasets[0].data[1] = this.AnalyticCollectValue;
        this.myChart.update();
    }
    

  }
  // функції події
  function eventListeners(){
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const collectForm = document.getElementById('collect-form');
    const collectAmountForm = document.getElementById('collect-amount-form');
    const analyticForm = document.getElementById('button-analytic');
    const reloadAnalytic = document.getElementById('reload-analytic');
  
    //новий екземпляр класу Budget
    const budget = new Budget();
    
    //Форма бюджет  
    budgetForm.addEventListener('submit', function(event){
      event.preventDefault();
      budget.submitBudgetForm();
    })
    //Форма витрат
    expenseForm.addEventListener('submit', function(event){
      event.preventDefault();
      budget.submitExpenseForm();
    })
    // Форма збору
    collectForm.addEventListener('submit',function(event){
      event.preventDefault();
      budget.submitCollectForm();
    })
    // Форма суми збору
    collectAmountForm.addEventListener('submit',function(event){
      event.preventDefault();
      budget.submitCollectAmountForm();
    }) 

    analyticForm.addEventListener('click', function(event) {
      event.preventDefault();
      budget.clickAnalyticForm();
    })

    // оновлення аналітики
   reloadAnalytic.addEventListener('click', function(event) {
      event.preventDefault();
      budget.reloadAnalyticForm();
   })


  }
  
  document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
  })

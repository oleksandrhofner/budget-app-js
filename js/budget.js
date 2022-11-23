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
    }

    //submit budget method
    submitBudgetForm(){
        const value = this.budgetInput.value;
        if(value === '' || value < 0){
        alert("Значення не може бути від'ємним!")
      
        } else {
          this.budgetAmount.textContent = value;
          this.budgetInput.value = '';
          this.showBalance();
        }
        let collectTotalOn = 0;
        if ( collectTotalOn === 1) {
          confirm("У вас є мета збору. Чи ви бажаєте відкласти на мету 10% від бюджету?");
        }
        let AnalyticBudgetValue = value;
        this.clickAnalyticForm(AnalyticBudgetValue,this.showCollectSum.AnalyticCollectValue);
    }
  
    //show balance
    showBalance(){
      const expense = this.totalExpense();
      const total = parseInt(this.budgetAmount.textContent) - expense;
      this.balanceAmount.textContent = total;
      if(total > 0){
        this.balance.classList.add('showGreen');
      }
    
    }
    //submit expense form
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
    //add expense
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
  
// submit collect method
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
    // add title and value for collect
    addCollect(collect) {
      const div = document.createElement('div');
      div.classList.add('collect-info');
      div.innerHTML = `
      <div class="collect-info-title"><h3>Мета</h3><span class="dash">:</span><h3>${collect.title}</h3></div>
      <p class="collect-general-amount">Загальна сума збору: <span>₴</span><span id="collectAmount-input">${collect.amount}</span></p>
      
      `;
      this.collectList.appendChild(div);
    }
    // collect amount form 
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
    // show collect total sum
    showCollectSum(){
      const totalSum = parseInt(this.collectInputSum.textContent);
      this.collectTotalSum.textContent = totalSum;

      let AnalyticCollectValue = totalSum;
      this.clickAnalyticForm(this.submitBudgetForm.AnalyticBudgetValue,AnalyticCollectValue);
    }

    
    //total expense
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

    // analytic chart.js
    clickAnalyticForm(AnalyticBudgetValue,AnalyticCollectValue){
      let labelName = ['Дохід','Збір'];
      let dataAmount = [AnalyticBudgetValue,AnalyticCollectValue];
      let myChart = null;
      let ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
          type: 'doughnut',
          data : {
        labels: labelName,
        datasets: [{
          label: 'Аналітика бюджету',
          data: dataAmount,
          backgroundColor: [
            'rgb(50,205,50)',
            'rgb(65,105,225)'
          ],
          hoverOffset: 4,
        }]
      }});
      if (myChart != null) {
        myChart.destroy(); 
        } 
    this.reloadAnalyticForm(myChart);
    }
//  analytic reload button
    reloadAnalyticForm(myChart) { 
      myChart.update();

    }
    

  }
  // events functions
  function eventListeners(){
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const collectForm = document.getElementById('collect-form');
    const collectAmountForm = document.getElementById('collect-amount-form');
    const analyticForm = document.getElementById('button-analytic');
    const reloadAnalytic = document.getElementById('reload-analytic');
  
    //new instance of Budget Class
    const budget = new Budget();
    
    //budget form submit
    budgetForm.addEventListener('submit', function(event){
      event.preventDefault();
      budget.submitBudgetForm();
    })
    //expense form submit
    expenseForm.addEventListener('submit', function(event){
      event.preventDefault();
      budget.submitExpenseForm();
  
    })
    // collect from submit
    collectForm.addEventListener('submit',function(event){
      event.preventDefault();
      budget.submitCollectForm();
    })
    // collect amount form submit
    collectAmountForm.addEventListener('submit',function(event){
      event.preventDefault();
      budget.submitCollectAmountForm();
    }) 

    analyticForm.addEventListener('submit', function(event) {
      event.preventDefault();
      budget.clickAnalyticForm();
    })

    // reload analytic chart.js
   reloadAnalytic.addEventListener('click', function(event) {
      event.preventDefault();
      budget.reloadAnalyticForm();
   })


  }
  
  document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
  })

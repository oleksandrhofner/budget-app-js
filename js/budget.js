class UI {
    constructor() {
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.itemList = [];
      this.itemID = 0;
    }
  
    //submit budget method
    submitBudgetForm(){
        const value = this.budgetInput.value;
        if(value === '' || value < 0){
          this.budgetFeedback.classList.add('showItem');
          this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
          const self = this;
          setTimeout(function(){
            self.budgetFeedback.classList.remove('showItem');
          }, 3000);
        } else {
          this.budgetAmount.textContent = value;
          this.budgetInput.value = '';
          this.showBalance();
        }
    }
  
    //show balance
    showBalance(){
      const expense = this.totalExpense();
      const total = parseInt(this.budgetAmount.textContent) - expense;
      this.balanceAmount.textContent = total;
    
    }
    //submit expense form
    submitExpenseForm(){
      const expenseValue = this.expenseInput.value;
      const amountValue = this.amountInput.value;
      if(expenseValue === '' || amountValue === '' || amountValue < 0){
        this.expenseFeedback.classList.add('showItem');
        this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
        const self = this;
        setTimeout(function(){
          self.expenseFeedback.classList.remove('showItem');
        }, 3000)
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
      <h5 class="expense-amount  list-item">$${expense.amount}</h5>
      </div>
      `;
     this.expenseList.appendChild(div);
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
  
    //edit expense
    editExpense(element){
      let id = parseInt(element.dataset.id);
      let parent = element.parentElement.parentElement.parentElement;
      //remove from DOM
      this.expenseList.removeChild(parent);
      //remove from the list
      let expense = this.itemList.filter(function(item){
        return item.id === id;
      })
      //show values
      this.expenseInput.value = expense[0].title;
      this.amountInput.value = expense[0].amount;
      //remove from the list
      let tempList = this.itemList.filter(function(item){
        return item.id !== id;
      })
      this.itemList = tempList;
      this.showBalance();
    }
  
    //delete expense
    deleteExpense(element){
      let id = parseInt(element.dataset.id);
      let parent = element.parentElement.parentElement.parentElement;
      //remove from DOM
      this.expenseList.removeChild(parent);
      //remove from the list
      let tempList = this.itemList.filter(function(item){
        return item.id !== id;
      })
      this.itemList = tempList;
      this.showBalance();
    }
  }
  
  function eventListeners(){
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
  
    //new instance of UI Class
    const ui = new UI();
    
    //budget form submit
    budgetForm.addEventListener('submit', function(event){
      event.preventDefault();
      ui.submitBudgetForm();
    })
    //expense form submit
    expenseForm.addEventListener('submit', function(event){
      event.preventDefault();
      ui.submitExpenseForm();
  
    })
    //expense list submit
    expenseList.addEventListener('click', function(event){
      if (event.target.parentElement.classList.contains('edit-icon')){
        ui.editExpense(event.target.parentElement);
      }else if (event.target.parentElement.classList.contains('delete-icon')){
        ui.deleteExpense(event.target.parentElement);
      }
    })
  }
  
  document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
  })





  // Chart.js
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'doughnut',
      data : {
    labels: [
      'Витрати',
      'Дохід',
      'Збір'
    ],
    datasets: [{
      label: 'Аналітика бюджету',
      data: [100, 150, 40],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(50,205,50)',
        'rgb(65,105,225)'
      ],
      hoverOffset: 4,
    }]
  }});
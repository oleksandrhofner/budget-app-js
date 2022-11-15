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
       alert("Значення не може бути від'ємним!")
        const self = this;
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
      <h3>Мета</h3><span class="dash">-</span><h3>${collect.title}</h3
      <p>Загальна сума збору: <span>₴</span><span id="collectAmount-input">${collect.amount}</span></p>
      
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
    // show collect sum
    showCollectSum(){
      const totalSum = parseInt(this.collectInputSum.textContent);
      this.collectTotalSum.textContent = totalSum;
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
    // analytic chart.js
    
 
    

  }
  
  function eventListeners(){
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const collectForm = document.getElementById('collect-form');
    const collectAmountForm = document.getElementById('collect-amount-form');
  

  
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
    // collect from submit
    collectForm.addEventListener('submit',function(event){
      event.preventDefault();
      ui.submitCollectForm();
    })
    // collect amount form submit
    collectAmountForm.addEventListener('submit',function(event){
      event.preventDefault();
      ui.submitCollectAmountForm();
    }) 

    
  }
  
  document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
    // $('#collect-amount-sum').hide();
  })

  // Chart.js
  let AnalyticAmount = document.getElementById('button-analytic');
  AnalyticAmount.addEventListener('click', function(){
  let labelName = ['Дохід','Витрати','Збір'];
  let dataAmount = [100,100,40];
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
      type: 'doughnut',
      data : {
    labels: labelName,
    datasets: [{
      label: 'Аналітика бюджету',
      data: dataAmount,
      backgroundColor: [
        'rgb(50,205,50)',
        'rgb(255, 99, 132)',
        'rgb(65,105,225)'
      ],
      hoverOffset: 4,
    }]
  }});
});

  const reloadPage = function() {
    confirm("Are you confirm?");
  }
  // reloadPage();



  
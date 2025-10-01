const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Selecionando os elementos da lista:
const ExpenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span" )
const totalValue = document.querySelector("aside header h2")


amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")

    value = Number(value) / 100;

    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL (value) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

}

form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)
        expenseIcon.classList.add("iconslist");

        // Adicionando a informação da despesa:

        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.textContent = newExpense.amount;

        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover");

        // adicionando os items na lista:
        ExpenseList.append(expenseItem)
        expenseItem.append(expenseIcon)
        expenseItem.append(expenseInfo);
        expenseInfo.append(expenseName);
        expenseInfo.append(expenseCategory);
        expenseItem.append(expenseAmount)
        expenseItem.append(removeIcon)

        updateTotals()
        




        removeIcon.addEventListener("click", () => {
            removeItems()
           
            
        })
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
    console.log(newExpense)
}



function updateTotals() {
    try {
        const items = ExpenseList.children;
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"} `

        let total = 0
        //percorre cada li da ul:
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount");

            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".");
            
            value = parseFloat(value);

            if (isNaN(value)) {
                return alert("Não foi possivel calcular o total. O valor não parece ser uma numero.");
            }

            total += Number(value);
        }

        totalValue.textContent = total;
    } catch (error) {
        console.log(error);
        alert("Não foi possivel atualizar o status !")
    }
}




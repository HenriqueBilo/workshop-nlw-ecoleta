function populateUFs()
{
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //Busca os estados nesse link
    .then( (res) => { return res.json()}) //Obtém a resposta e transforma a resposta em json
    .then( states => { //Realiza o tratamento da resposta
        for(const state of states){ //Foreach
            ufSelect.innerHTML += `<option value="${state.id}">${state.sigla + ' - ' + state.nome}</option>`;
        }
    })
}

populateUFs()

function getCities(event)
{
    const citiesSelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citiesSelect.disabled = true

    fetch(url) //Busca os estados nesse link
    .then( (res) => { return res.json()}) //Obtém a resposta e transforma a resposta em json
    .then( cities => { //Realiza o tratamento da resposta
        
        for(const city of cities){ //Foreach
            citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citiesSelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]") //Pega o select com name uf
    .addEventListener("change", getCities) //Adiciona um evento


// Items de coleta
// pegar todos os li's 
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect)
{
    item.addEventListener("click", handleSelectedItem)
}

//Input vazio contendo os itens selecionados. Necessário ao enviar os dados
const collectedItems = document.querySelector("input[name=items]")

//Array de Ids selecionados
let selectedItems = []

function handleSelectedItem(event)
{
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    // Para fazer o controle de pintar de verde (efeito selecionado)
    itemLi.classList.toggle("selected") //Toggle = adicionar ou remover

    //Pega o id do item selecionado
    const itemId = itemLi.dataset.id 

    // verifica se o item selecionado já está na lista
    // -1 se não acha
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId
        return itemFound
    })

    // se ja estiver selecionado, tirar da seleção
    if(alreadySelected != -1)
    {
        const filteredItems = selectedItems.filter( function(item){
            const itemIsDifferent = item != itemId //Verdadeiro então posso adicionar no array. Falso remove
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }
    else{ // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
        
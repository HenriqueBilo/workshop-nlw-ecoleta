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

    fetch(url) //Busca os estados nesse link
    .then( (res) => { return res.json()}) //Obtém a resposta e transforma a resposta em json
    .then( cities => { //Realiza o tratamento da resposta
        for(const city of cities){ //Foreach
            citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
        }

        citiesSelect.removeAttribute("disabled")
    })
}

document
    .querySelector("select[name=uf]") //Pega o select com name uf
    .addEventListener("change", getCities) //Adiciona um evento
        
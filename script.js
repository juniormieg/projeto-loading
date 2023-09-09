const localStorageKey = "lista-de-tarefas";
function validacaoSeExisteANovaTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById("input-nova-tarefa").value;
  let existe = values.find((x) => x.name == inputValue);
  return !existe ? false : true;
}
function novaTarefa() {
  let input = document.getElementById("input-nova-tarefa");

  //validacao
  if (!input.value) {
    alert("digite algo para inserir em sua lista");
  } else if (validacaoSeExisteANovaTask()) {
    alert("ja existe uma tarefa com esta descrição");
  } else {
    //incrementacao para localstorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({
      name: input.value,
      done: false,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    MostrarValores();
  }
  input.value = "";
}

function MostrarValores() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  for (let i = 0; i < values.length; i++) {
    lista.innerHTML += `<li>${
      values[i]["name"]
    }<div class=" botoes "><button id='btn-ok' class="rounded-button ${
      values[i]["done"] && "classdone"
    }" onclick='confirmacao("${
      values[i]["name"]
    }")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
  </svg></button><button id='btn-excluir' class="rounded-button" onclick = 'removeritem("${
    values[i]["name"]
  }")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
  </svg></button></div></li>`;
  }
}
function confirmacao(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name == data);
  values[index].done = !values[index].done;
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  window.location.reload();
}

function removeritem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  MostrarValores();
}
function filtru(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  for (let index = 0; index < values.length; index++) {
    let index = values.findIndex((x) => x.name == data);
    let check = (values[index].done = !values[index].done);
    console.log(values);
  }
}
function filtrarPorDone(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  const select = document.getElementById("select-list");
  const selectValue = select.value;
  const result = values.filter((item) => {
    if (selectValue === "doneTrue" && item.done === true) {
      console.log(item.done === true);
      return item.done === true;
    } else if (selectValue === "doneFalse" && item.done === false) {
      console.log(item.done === false);
      return item.done === false;
    } else {
      console.log("depois nos ver");
    }
  });
  console.log(result);
  return result;
}

MostrarValores();

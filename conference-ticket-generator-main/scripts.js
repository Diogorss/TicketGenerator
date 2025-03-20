const dropZone = document.getElementById("dropZone"); //área do drop
const preview = document.getElementById("preview"); //previsualização
const nomeInput = document.querySelector(".Nome");
const emailInput = document.querySelector(".Email");
const usuarioInput = document.querySelector(".Usuario");
const btn = document.querySelector(".btn");
let images = [];

// Prevenir comportamento padrão
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  //eventname assume cada um dos valores das ações em cada interação, representando quais funções o código deve reagir
  dropZone.addEventListener(eventName, preventDefaults, false); //quando alguma função acima acontecer, deve impedir o comportamento padrão do navegador
}); //false - reagir apenas na Dropzone

function preventDefaults(e) {
  //e é o objeto do Evento
  e.preventDefault(); //impede o comportamento padrão do navegador, como abrir o arquivo arrastado
  e.stopPropagation(); //evita que o evento se propague para outros elementos
}

// Efeitos visuais, mudar aparência no css
dropZone.addEventListener("dragenter", () => {
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("dragover", () => {
  dropZone.classList.add("dragover");
});

// Processar arquivos dropados
dropZone.addEventListener("drop", (e) => {
  //ação disparada no drop de imagem
  dropZone.classList.remove("dragover"); //remove a animação de quando o usuário está com a imagem no local
  const files = e.dataTransfer.files; //lista de arquivos arrastados
  images = []; // Limpa o array para garantir que só uma imagem seja aceita
  preview.innerHTML = ""; // Limpa a pré-visualização

  // Filtrar apenas imagens
  if (files.length > 0) {
    // Verifica se há pelo menos um arquivo
    const file = files[0]; // Pega apenas o primeiro arquivo
    if (file.type.startsWith("image/")) {
      //verifica se o arquivo é uma imagem
      images.push(file); // Adiciona a imagem ao array (apenas uma)
      displayImage(file); //se a imagem for válida, chama a função para exibir
    } else {
      console.log("Por favor, arraste apenas imagens.");
    }
  }
});

function displayImage(file) {
  //função de exibir
  const reader = new FileReader(); //ler conteúdo do arquivo
  reader.onload = (e) => {
    //função chamada quando a leitura do arq termina
    const img = document.createElement("img"); //cria um elemento img de forma dinâmica
    img.src = e.target.result; //arquivo convertido em uma URL
    img.classList.add("preview-img"); //aplica o css da classe de pré visualização
    preview.appendChild(img); //add a imagem a área de pre visualização
  };

  reader.readAsDataURL(file); //Lê o arq como uma URL de dados
}

function validaNome() {
  if (nomeInput.value.length == 0) {
    console.log("Por favor, preencha o campo de nomes");
    nomeInput.style.border = "2px solid red";
    return false;
  } else {
    nomeInput.style.border = "";
    return true;
  }
}

function validaEmail() {
  if (emailInput.value.length == 0) {
    console.log("Por favor, preencha o campo de email");
    emailInput.style.border = "2px solid red";
    return false;
  } else {
    emailInput.style.border = "";
    return true;
  }
}

function validaUsuario() {
  if (usuarioInput.value.length == 0) {
    console.log("Por favor, preencha o campo de usuário");
    usuarioInput.style.border = "2px solid red";
    return false;
  } else {
    usuarioInput.style.border = "";
    return true;
  }
}

function validaImagem() {
  if (images.length === 0) {
    dropZone.style.border = "2px solid red";
    console.log("Por favor, adicione uma imagem válida");
    return false;
  } else {
    dropZone.style.border = "";
    return true;
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const nomeValido = validaNome();
  const emailValido = validaEmail();
  const usuarioValido = validaUsuario();
  const imagemValida = validaImagem();

  if (nomeValido && emailValido && usuarioValido && imagemValida) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase = e.target.result;
      localStorage.setItem(
        "ticketData",
        JSON.stringify({
          nome: nomeInput.value,
          email: emailInput.value,
          usuario: usuarioInput.value,
          imagem: imageBase,
        })
      );
      window.location.href = "ticket.html";
    };
    reader.readAsDataURL(images[0]);
  } else {
    alert("Por favor, preencha todos os campos");
  }
});

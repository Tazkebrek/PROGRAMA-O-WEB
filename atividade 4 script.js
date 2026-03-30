const precos = {
  gasolina: 6.69,
  etanol: 4.30,
  diesel: 6.03
};

const combustivel = document.getElementById("combustivel");
const litros = document.getElementById("litros");
const resultado = document.getElementById("resultado");

const formatarMoeda = (valor) => {
  return "R$ " + valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const calcularAbastecimento = (preco, qtdLitros) => {
  let total = preco * qtdLitros;
  resultado.textContent = formatarMoeda(total);
};

const atualizarValor = () => {
  let tipo = combustivel.value;
  let qtdLitros = parseFloat(litros.value);

  if (tipo === "") {
    alert("Escolha um combustível.");
    return;
  }

  if (litros.value === "") {
    alert("Digite a quantidade de litros.");
    return;
  }

  if (isNaN(qtdLitros)) {
    alert("Digite um número válido.");
    return;
  }

  if (qtdLitros < 0) {
    alert("Não digite valores negativos.");
    return;
  }

  if (qtdLitros === 0) {
    alert("Digite um valor maior que zero.");
    return;
  }

  let preco = precos[tipo];
  calcularAbastecimento(preco, qtdLitros);
};

combustivel.addEventListener("change", atualizarValor);
litros.addEventListener("input", atualizarValor);

litros.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    atualizarValor();
  }
});

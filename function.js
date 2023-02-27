/* O seu Manoel agora quer mais uma inovação, ele quer poder guardar itens no estoque e quando alguém fizer alguma compra, ele automaticamente seja removido do estoque. Para isso você pode colocar um novo item em cada objeto chamado quantidade. Para salvar os dados, você pode utilizar localStorage. */









class CaixaRegistradora {
    constructor() {
      this.estoque = [];
      this.caixa = [];
      this.clienteAtual = null;
    }
  
    adicionarProduto(codigoBarra, preco, nome, quantidade = 0) {
      const novoProduto = { codigoBarra, preco, nome, quantidade };
      this.estoque.push(novoProduto);
    }
  
    iniciarAtendimento(cliente) {
      this.clienteAtual = cliente;
      this.caixa = [];
      console.log(`Iniciando atendimento para ${cliente}`);
    }
  
    adicionarItem(codigoBarra, quantidade) {
      const produtoIndex = this.estoque.findIndex((p) => p.codigoBarra === codigoBarra);
      if (produtoIndex === -1) {
        console.log(`Produto não encontrado com código de barras ${codigoBarra}`);
        return;
      }
      const produto = this.estoque[produtoIndex];
      if (produto.quantidade < quantidade) {
        console.log(`Não há quantidade suficiente de ${produto.nome} no estoque`);
        return;
      }
      const item = { produto, quantidade };
      this.caixa.push(item);
      produto.quantidade -= quantidade;
      console.log(`Adicionando ${quantidade}x ${produto.nome} na caixa registradora`);
      localStorage.setItem('estoque', JSON.stringify(this.estoque));
    }
  
    calcularValorTotal() {
      let total = 0;
      this.caixa.forEach((item) => {
        const { produto, quantidade } = item;
        total += produto.preco * quantidade;
      });
      console.log(`Valor total da conta de ${this.clienteAtual}: R$${total.toFixed(2)}`);
      return total;
    }
  
    fecharConta(dinheiro) {
      const total = this.calcularValorTotal();
      const troco = dinheiro - total;
      if (troco < 0) {
        console.log(`Dinheiro insuficiente para pagar a conta de R$${total.toFixed(2)}`);
        return;
      }
      console.log(`Troco: R$${troco.toFixed(2)}`);
      this.caixa = [];
    }
  }
  
  const caixa = new CaixaRegistradora();
  const estoqueSalvo = localStorage.getItem('estoque');
  if (estoqueSalvo) {
    caixa.estoque = JSON.parse(estoqueSalvo);
  } else {
    caixa.adicionarProduto(123, 10.99, 'Arroz', 10);
    caixa.adicionarProduto(456, 5.49, 'Feijão', 5);
  }
  caixa.iniciarAtendimento('João');
  caixa.adicionarItem(123, 2);
  caixa.adicionarItem(456, 1);
  caixa.calcularValorTotal();
  caixa.fecharConta(30);
  caixa.calcularValorTotal();
  
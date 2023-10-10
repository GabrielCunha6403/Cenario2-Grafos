Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    let contador = 0;
    var count = this.filter(() => contador++).length;
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};

class Grafo {
    constructor() {
      this.vertices = {};
    }
  
    adicionarVertice(vertice) {
      if (!this.vertices[vertice]) {
        this.vertices[vertice] = [];
      }
    }
  
    adicionarAresta(origem, destino, peso) {
      if (!this.vertices[origem] || !this.vertices[destino]) {
        console.log('Os vértices de origem e destino devem existir no grafo');
      }
  
      this.vertices[origem].push({ destino, peso });
    }
  
    verificarCiclo() {
      // Vetores de armazenamento
      let visitados = [];
      let pilhaRecursao = [];
      let verticesDoCiclo = [];
    
      // Função recursiva para percorrer o grafo e encontrar ciclo
      const temCiclo = (vertice) => {
    
        if (!visitados[vertice]) {
          // Se for a primeira vez, seta true para dizer que já passou por ele
          visitados[vertice] = true;
          pilhaRecursao[vertice] = true;
    
          // Percorre as arestas de um vértice
          for (let aresta of this.vertices[vertice]) {
    
            // Checa se vértice já foi visitado e aplica a função para o próximo vértice
            if (!visitados[aresta.destino]) {
              if (temCiclo(aresta.destino)) {
                // Se a função recursiva encontrar um ciclo, adiciona o vértice atual aos vértices do ciclo
                verticesDoCiclo.push(vertice);
                return true;
              }
            } else if (pilhaRecursao[aresta.destino]) {
              let index = verticesDoCiclo.findIndex((x) => x === vertice);
              if(index == -1 && verticesDoCiclo.length > 0)
                verticesDoCiclo.push(vertice, aresta.destino);
              return true;
            }
          }
        }
    
        pilhaRecursao[vertice] = false;
        return false;
      };
    
      // Chama a função recursiva para cada vértice
      for (let vertice in this.vertices) {
        if (!visitados[vertice] && temCiclo(vertice)) {
          // Se a função recursiva encontrar um ciclo, retorna os vértices do ciclo
          return verticesDoCiclo;
        }
      }
    
      // Se nenhum ciclo for encontrado
      return "Sem ciclo encontrado";
    }
  
    verificarOrientado() {
      //percorre os vértices
      for (let vertice in this.vertices) {
        //percorre as arestas dos vértices
        for (let aresta of this.vertices[vertice]) {
          //checa se existe alguma aresta indo sem voltar
          if (!this.vertices[aresta.destino].some((a) => a.destino === vertice)) {
            return true;
          }
        }
      }
  
      return false;
    }
  
    verificarPonderado() {
      for (let vertice in this.vertices) {
        for (let aresta of this.vertices[vertice]) {
          if (!aresta.peso) {
            return false;
          }
        }
      }
  
      return true;
    }
  }
  
  const grafo = new Grafo();
  
  // grafo.adicionarVertice('A');
  // grafo.adicionarVertice('B');
  // grafo.adicionarVertice('C');
  
  // grafo.adicionarAresta('A', 'B');
  // grafo.adicionarAresta('B', 'C');
  // grafo.adicionarAresta('C', 'A');

//   grafo.adicionarVertice("Recepção");
//   grafo.adicionarVertice("Atendimento");
//   grafo.adicionarVertice("Exame");
//   grafo.adicionarVertice("Medicamentos");

//   grafo.adicionarAresta("Recepção", "Atendimento");
//   grafo.adicionarAresta("Atendimento", "Exame");
//   grafo.adicionarAresta("Exame", "Medicamentos");
//   grafo.adicionarAresta("Exame", "Recepção");
  
//   console.log('É cíclico?', grafo.verificarCiclo());
//   console.log('É orientado?', grafo.verificarOrientado());
//   console.log('É ponderado?', grafo.verificarPonderado());
  
  grafo.adicionarVertice('A');
  grafo.adicionarVertice('B');
  grafo.adicionarVertice('C');
  grafo.adicionarVertice('D');
  grafo.adicionarVertice('E');
  grafo.adicionarVertice('F');
  grafo.adicionarVertice('G');
  
  grafo.adicionarAresta('A', 'B');
  grafo.adicionarAresta('A', 'C');
  grafo.adicionarAresta('B', 'F');
  grafo.adicionarAresta('C', 'B');
  grafo.adicionarAresta('C', 'D');
  grafo.adicionarAresta('C', 'G');
  grafo.adicionarAresta('D', 'A');
  grafo.adicionarAresta('D', 'E');
  grafo.adicionarAresta('F', 'G');
  grafo.adicionarAresta('G', 'E');

  
  console.log('É cíclico?', grafo.verificarCiclo());
  console.log('É orientado?', grafo.verificarOrientado());
  console.log('É ponderado?', grafo.verificarPonderado());
  

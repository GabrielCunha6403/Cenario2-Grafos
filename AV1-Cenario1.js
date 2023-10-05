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

      //vetores de armazenamento
      let visitados = [];
      let pilhaRecursao = [];
      
      //função recurssiva pra percorrer grafo e encontrar ciclo
      const temCiclo = (vertice) => {

        console.log(vertice);

        if (!visitados[vertice]) {
          //se for a primeira vez, seta true pra dizer que já passou por ele
          visitados[vertice] = true;
          pilhaRecursao[vertice] = true;
  
          //percorre as arestas de um vértice
          for (let aresta of this.vertices[vertice]) {

            //checa se vértice já foi visitado e aplica função para o próximo vértice
            if (!visitados[aresta.destino] && temCiclo(aresta.destino)) {
              //
              return true;

            //checa se já passou pela recursão
            } else if (pilhaRecursao[aresta.destino]) {
              return true;
            }

          }

        }

        pilhaRecursao[vertice] = false;
        return false;
      };
  
      //repete função para todos os vértices
      for (let vertice in this.vertices) {
        if (temCiclo(vertice)) {
          return true;
        }
      }
  
      return false;
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

  grafo.adicionarVertice("Recepção");
  grafo.adicionarVertice("Atendimento");
  grafo.adicionarVertice("Exame");
  grafo.adicionarVertice("Medicamentos");

  grafo.adicionarAresta("Recepção", "Atendimento");
  grafo.adicionarAresta("Atendimento", "Exame");
  grafo.adicionarAresta("Exame", "Medicamentos");
  grafo.adicionarAresta("Exame", "Recepção");
  
  console.log('É cíclico?', grafo.verificarCiclo());
  console.log('É orientado?', grafo.verificarOrientado());
  console.log('É ponderado?', grafo.verificarPonderado());
  
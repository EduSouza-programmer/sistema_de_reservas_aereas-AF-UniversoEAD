// Estrutura de dados para voos
class Flight {
    constructor(number, origin, destination, availableSeats) {
      this.number = number;
      this.origin = origin;
      this.destination = destination;
      this.availableSeats = availableSeats;
    }
  }
  
  // Dados de exemplo dos voos
  const flights = [
    new Flight(1001, "São Paulo", "Rio de Janeiro", 12),
    new Flight(1002, "Rio de Janeiro", "Salvador", 12),
    new Flight(1003, "Brasília", "Recife", 12),
    new Flight(1004, "Fortaleza", "Manaus", 12),
    new Flight(1005, "Belém", "Porto Alegre", 12)
  ];
  
  // Elementos do DOM
  const menuPrincipal = document.getElementById('menuPrincipal');
  const menuConsulta = document.getElementById('menuConsulta');
  const formReserva = document.getElementById('formReserva');
  const areaResultado = document.getElementById('areaResultado');
  const mensagemResultado = document.getElementById('mensagemResultado');
  const numeroVooInput = document.getElementById('numeroVoo');
  
  // Ouvintes de eventos
  document.addEventListener('DOMContentLoaded', () => {
    // Adiciona ouvintes de clique para todos os botões do menu
    document.querySelectorAll('.menu-button').forEach(button => {
      button.addEventListener('click', handleMenuClick);
    });
  
    // Adiciona ouvinte para confirmação de reserva
    document.getElementById('confirmarReserva').addEventListener('click', handleReserva);
  });
  
  // Manipulador de cliques do menu
  function handleMenuClick(event) {
    const action = event.target.dataset.action;
  
    switch (action) {
      case 'consultar':
        showConsultaMenu();
        break;
      case 'reservar':
        showReservaForm();
        break;
      case 'sair':
        handleSair();
        break;
      case 'porNumero':
        consultarPorNumero();
        break;
      case 'porOrigem':
        consultarPorOrigem();
        break;
      case 'porDestino':
        consultarPorDestino();
        break;
      case 'voltarPrincipal':
        showMainMenu();
        break;
    }
  }
  
  // Funções para mostrar/ocultar menus
  function showMainMenu() {
    menuPrincipal.classList.remove('hidden');
    menuConsulta.classList.add('hidden');
    formReserva.classList.add('hidden');
    areaResultado.classList.add('hidden');
  }
  
  function showConsultaMenu() {
    menuPrincipal.classList.add('hidden');
    menuConsulta.classList.remove('hidden');
    formReserva.classList.add('hidden');
    areaResultado.classList.add('hidden');
  }
  
  function showReservaForm() {
    menuPrincipal.classList.add('hidden');
    menuConsulta.classList.add('hidden');
    formReserva.classList.remove('hidden');
    areaResultado.classList.add('hidden');
  }
  
  function showResultado(mensagem, isError = false) {
    areaResultado.classList.remove('hidden');
    menuPrincipal.classList.add('hidden');
    menuConsulta.classList.add('hidden');
    formReserva.classList.add('hidden');
    
    mensagemResultado.textContent = mensagem;
    mensagemResultado.className = isError ? 'error' : 'success';
  }
  
  // Funções de consulta
  function consultarPorNumero() {
    const numeroVoo = prompt('Digite o número do voo:');
    if (!numeroVoo) return;
  
    const voo = flights.find(f => f.number === parseInt(numeroVoo));
    if (voo) {
      showResultado(`
        Voo ${voo.number}
        Origem: ${voo.origin}
        Destino: ${voo.destination}
        Lugares disponíveis: ${voo.availableSeats}
      `);
    } else {
      showResultado('Voo inexistente', true);
    }
  }
  
  function consultarPorOrigem() {
    const origem = prompt('Digite a cidade de origem:');
    if (!origem) return;
  
    const voosEncontrados = flights.filter(f => 
      f.origin.toLowerCase().includes(origem.toLowerCase())
    );
  
    if (voosEncontrados.length > 0) {
      const resultado = voosEncontrados.map(voo => 
        `Voo ${voo.number}: ${voo.origin} -> ${voo.destination} (${voo.availableSeats} lugares)`
      ).join('\n');
      showResultado(resultado);
    } else {
      showResultado('Nenhum voo encontrado com esta origem', true);
    }
  }
  
  function consultarPorDestino() {
    const destino = prompt('Digite a cidade de destino:');
    if (!destino) return;
  
    const voosEncontrados = flights.filter(f => 
      f.destination.toLowerCase().includes(destino.toLowerCase())
    );
  
    if (voosEncontrados.length > 0) {
      const resultado = voosEncontrados.map(voo => 
        `Voo ${voo.number}: ${voo.origin} -> ${voo.destination} (${voo.availableSeats} lugares)`
      ).join('\n');
      showResultado(resultado);
    } else {
      showResultado('Nenhum voo encontrado com este destino', true);
    }
  }
  
  // Manipulador de reservas
  function handleReserva() {
    const numeroVoo = parseInt(numeroVooInput.value);
    if (!numeroVoo) {
      showResultado('Por favor, digite um número de voo válido', true);
      return;
    }
  
    const voo = flights.find(f => f.number === numeroVoo);
    
    if (!voo) {
      showResultado('Voo inexistente', true);
    } else if (voo.availableSeats <= 0) {
      showResultado('Voo lotado', true);
    } else {
      voo.availableSeats--;
      showResultado('Reserva confirmada');
      numeroVooInput.value = ''; // Limpa o campo de input
    }
  }
  
  // Manipulador de saída
  function handleSair() {
    if (confirm('Deseja realmente sair do sistema?')) {
      showResultado('Obrigado por usar nosso sistema. Até logo!');
    }
  }
  
  // Manipulador de erros
  function handleError(error) {
    console.error('Erro:', error);
    showResultado('Ocorreu um erro no sistema. Por favor, tente novamente.', true);
  }
  
  // Inicializa o sistema
  showMainMenu();
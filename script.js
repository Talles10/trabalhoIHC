// Função para exibir a seção selecionada
function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Função para salvar o cadastro do profissional
document.getElementById('form-cadastro-profissional').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome-profissional').value;
    const telefone = document.getElementById('telefone-profissional').value;
    const email = document.getElementById('email-profissional').value;

    localStorage.setItem('profissional', JSON.stringify({ nome, telefone, email }));
    alert('Cadastro da profissional salvo com sucesso!');
    document.getElementById('form-cadastro-profissional').reset();
});

// Função para salvar os dias disponíveis da profissional
function saveAvailability() {
    const dia = document.getElementById('dias').value;
    let diasDisponiveis = JSON.parse(localStorage.getItem('diasDisponiveis')) || [];
    diasDisponiveis.push(dia);
    localStorage.setItem('diasDisponiveis', JSON.stringify(diasDisponiveis));
    displayAvailableDates();
    alert('Dia de atendimento salvo com sucesso!');
}

function displayAvailableDates() {
    let diasDisponiveis = JSON.parse(localStorage.getItem('diasDisponiveis')) || [];
    let html = '<h3>Dias Disponíveis:</h3><ul>';
    diasDisponiveis.forEach(dia => {
        html += `<li>${dia}</li>`;
    });
    html += '</ul>';
    document.getElementById('available-dates').innerHTML = html;
}

// Função para salvar os horários de atendimento
document.getElementById('form-horarios').addEventListener('submit', function(e) {
    e.preventDefault();
    const horarioInicio = document.getElementById('horario-inicio').value;
    const horarioFim = document.getElementById('horario-fim').value;

    localStorage.setItem('horarios', JSON.stringify({ horarioInicio, horarioFim }));
    alert('Horários de atendimento salvos com sucesso!');
    document.getElementById('form-horarios').reset();
});

// Função para salvar os serviços
document.getElementById('form-servicos').addEventListener('submit', function(e) {
    e.preventDefault();
    const servico = document.getElementById('servico').value;
    let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    servicos.push(servico);
    localStorage.setItem('servicos', JSON.stringify(servicos));
    alert('Serviço salvo com sucesso!');
    document.getElementById('form-servicos').reset();
});

// Função para salvar o tempo de atendimento
document.getElementById('form-tempos').addEventListener('submit', function(e) {
    e.preventDefault();
    const tempo = document.getElementById('tempo').value;
    localStorage.setItem('tempoAtendimento', tempo);
    alert('Tempo de atendimento salvo com sucesso!');
    document.getElementById('form-tempos').reset();
});

// Função para carregar e exibir agendamentos
function loadAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const agendamentosLista = document.getElementById('agendamentos-lista');
    agendamentosLista.innerHTML = '';
    agendamentos.forEach(agendamento => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${agendamento.cliente}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
        `;
        agendamentosLista.appendChild(tr);
    });
}

// Função para salvar o cadastro do cliente
document.getElementById('form-cadastro-cliente').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome-cliente').value;
    const telefone = document.getElementById('telefone-cliente').value;
    const codProfissional = document.getElementById('cod-profissional').value;

    localStorage.setItem('cliente', JSON.stringify({ nome, telefone, codProfissional }));
    alert('Cadastro do cliente salvo com sucesso!');
    document.getElementById('form-cadastro-cliente').reset();
});

// Função para exibir horários disponíveis e agendamentos do cliente
function displayHorariosDisponiveis() {
    const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    let html = '<h3>Horários Disponíveis:</h3><ul>';
    horarios.forEach(horario => {
        html += `<li>${horario}</li>`;
    });
    html += '</ul>';
    document.getElementById('horarios-disponiveis').innerHTML = html;
}

// Função para exibir agendamentos do cliente
function displayMeusAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    let html = '<h3>Meus Agendamentos:</h3><ul>';
    agendamentos.forEach(agendamento => {
        html += `<li>${agendamento.data} às ${agendamento.hora}</li>`;
    });
    html += '</ul>';
    document.getElementById('meus-agendamentos').innerHTML = html;
}

// Função para salvar agendamento
document.getElementById('form-agendamento-cliente').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = document.getElementById('data-agendamento').value;
    const hora = document.getElementById('hora-agendamento').value;

    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.push({ data, hora });
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    alert('Agendamento salvo com sucesso!');
    displayMeusAgendamentos();
    document.getElementById('form-agendamento-cliente').reset();
});

// Inicializa a exibição dos horários e agendamentos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    displayHorariosDisponiveis();
    displayMeusAgendamentos();
    displayAvailableDates();
    loadAgendamentos();
});

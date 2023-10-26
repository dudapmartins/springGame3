document.getElementById('cadastroForm').addEventListener('submit', cadastrarJogo);
var result = 0;
function cadastrarJogo(event) {
	event.preventDefault();

	const name = document.getElementById('name').value;
	const plataforma = document.getElementById('plataforma').value;

	fetch('http://localhost:8080/jogo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, plataforma }),
	})
		.then(response => response.json())
		.then(data => {
			alert('Jogo cadastrado com sucesso!! 😄😄');
			document.getElementById('cadastroForm').reset();
		})
		.catch(error => {
			console.error('Erro ao cadastrar jogo 😥:', error);
		});
}
function pesquisarJogo() {
	const searchId = document.getElementById('searchId').value;

	fetch(`http://localhost:8080/jogo/${searchId}`)
		.then(response => {
			if (response.status === 404) {
				return Promise.reject('Jogo não encontrado :( ');
				result = 0;
			}
			return response.json();
		})
		.then(data => {
			result = 1;
			document.getElementById('name').value = `${data.name}`;
			document.getElementById('plataforma').value = `${data.plataforma}`;
		})
		.catch(error => {
			console.error('Erro ao pesquisar jogo:', error);
			const resultadoPesquisa = document.getElementById('resultadoPesquisa');
			resultadoPesquisa.innerHTML = 'Jogo não encontrado.';
			var timer = window.setTimeout(atualizarPagina, 3000);

		});
}
function atualizarJogo() {
	pesquisarJogo();
	if (result == 1) {
		const name = document.getElementById('name').value;
		const plataforma = document.getElementById('plataforma').value;
		const searchId = document.getElementById('searchId').value;

		fetch(`http://localhost:8080/jogo/${searchId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, plataforma }),
		})
			.then(response => response.json())
			.then(data => {
				alert('Jogo atualizado com sucesso! 😉');
				document.getElementById('cadastroForm').reset();
			})
			.catch(error => {
				console.error('Erro ao atualizar jogo:', error);
			});
	} else {
		alert('ID não encontrado na base de dados. Nenhum jogo foi alterado. Favor pesquisar jogo a ser alterado !!!');
	}
}

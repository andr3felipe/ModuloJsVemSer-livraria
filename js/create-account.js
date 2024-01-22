async function register(event) {
  event.preventDefault();

  const errorDiv = document.getElementById("errors");
  errorDiv.innerHTML = "";

  const name = event.target.name.value;
  const email = event.target.email.value.toLowerCase();
  const password = event.target.password.value;
  const confirmPassword = event.target.confirmPassword.value;
  const zipCode = event.target.cep.value;
  const neighborhood = event.target.bairro.value;
  const street = event.target.logradouro.value;
  const number = event.target.numero.value;
  const city = event.target.cidade.value;
  const state = event.target.uf.value;

  if (password !== confirmPassword) {
    errorDiv.innerHTML += `<p class="text-danger">As senhas não conferem.</p>`;
    errorDiv.focus();
    return;
  }

  const users = await fetch(`http://localhost:3000/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  if (users.find((user) => user.email.toLowerCase() === email)) {
    errorDiv.innerHTML += `<p class="text-danger">Já existe um usuário cadastrado com esse e-mail.</p>`;
    errorDiv.scrollIntoView();
    return;
  }

  const response = await fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      isAdmin: false,
      favorites: [],
      orders: [],
      address: {
        zipCode,
        neighborhood,
        street,
        number,
        city,
        state,
      },
    }),
  }).then((response) => response.json());

  if (response.id) {
    errorDiv.innerHTML += `<p class="text-success">Usuário cadastrado com sucesso!</p>`;
    errorDiv.scrollIntoView();
  } else {
    errorDiv.innerHTML += `<p class="text-danger">Erro ao cadastrar usuário.</p>`;
    errorDiv.scrollIntoView();
  }
}

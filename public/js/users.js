let editingId = null;

// Carregar usuários ao inicializar
document.addEventListener('DOMContentLoaded', function() {
  loadUsers();
    
  document.getElementById('user-form').addEventListener('submit', handleSubmit);
});

async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
        
    const tbody = document.getElementById('users-table');
    tbody.innerHTML = '';
        
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    alert('Erro ao carregar usuários');
  }
}

async function handleSubmit(e) {
  e.preventDefault();
    
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value
  };
    
  try {
    let response;
    if (editingId) {
      response = await fetch(`/api/users/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } else {
      response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
        
    if (response.ok) {
      resetForm();
      loadUsers();
      alert(editingId ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
    } else {
      const error = await response.json();
      alert('Erro: ' + error.error);
    }
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    alert('Erro ao salvar usuário');
  }
}

async function editUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
        
    document.getElementById('user-id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
        
    document.getElementById('form-title').textContent = 'Editar Usuário';
    document.getElementById('submit-btn').textContent = 'Atualizar';
        
    editingId = id;
  } catch (error) {
    console.error('Erro ao carregar usuário:', error);
    alert('Erro ao carregar usuário');
  }
}

async function deleteUser(id) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });
            
      if (response.ok) {
        loadUsers();
        alert('Usuário excluído com sucesso!');
      } else {
        const error = await response.json();
        alert('Erro: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário');
    }
  }
}

function resetForm() {
  document.getElementById('user-form').reset();
  document.getElementById('user-id').value = '';
  document.getElementById('form-title').textContent = 'Novo Usuário';
  document.getElementById('submit-btn').textContent = 'Salvar';
  editingId = null;
}

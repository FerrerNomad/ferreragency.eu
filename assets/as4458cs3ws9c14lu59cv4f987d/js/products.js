const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
    const tr = `
    <tr data-id='${doc.id}'>
    <td>${doc.data().codigo}</td>
    <td>${doc.data().marca}</td>
    <td>${doc.data().modelo}</td>
    <td>${doc.data().fabricante}</td>
    <td>${doc.data().tipo}</td>
    <td>${doc.data().ano}</td>
    <td>${doc.data().combustivel}</td>
    <td>${doc.data().cor}</td>
    <td>${doc.data().numerochassi}</td>
    <td>${doc.data().km}</td>
    <td>${doc.data().revisao}</td>
    <td>${doc.data().sinistro}</td>
    <td>${doc.data().furto_roubo}</td>
    <td>${doc.data().aluguel}</td>
    <td>${doc.data().venda}</td>
    <td>${doc.data().particular}</td>
    <td>${doc.data().obs}</td>
      <td>
        <button class="btn btn-edit"><i class='bx bx-edit' ></i></button>
        <button class="btn btn-delete"><i class='bx bxs-trash'></i></button>
      </td>
    </tr>
  `;
    tableUsers.insertAdjacentHTML('beforeend', tr);

    // Click edit user
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () => {
        editModal.classList.add('modal-show');

        id = doc.id;
        editModalForm.codigo.value = doc.data().codigo;
        editModalForm.marca.value = doc.data().marca;
        editModalForm.modelo.value = doc.data().modelo;
        editModalForm.fabricante.value = doc.data().fabricante;
        editModalForm.tipo.value = doc.data().tipo;
        editModalForm.ano.value = doc.data().ano;
        editModalForm.combustivel.value = doc.data().combustivel;
        editModalForm.cor.value = doc.data().cor;
        editModalForm.numerochassi.value = doc.data().numerochassi;
        editModalForm.km.value = doc.data().km;
        editModalForm.revisao.value = doc.data().revisao;
        editModalForm.sinistro.value = doc.data().sinistro;
        editModalForm.furto_roubo.value = doc.data().furto_roubo;
        editModalForm.aluguel.value = doc.data().aluguel;
        editModalForm.venda.value = doc.data().venda;
        editModalForm.particular.value = doc.data().particular;
        editModalForm.obs.value = doc.data().obs;

    });

    // Click delete user
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('cars').doc(`${doc.id}`).delete().then(() => {
            console.log('Document succesfully deleted!');
        }).catch(err => {
            console.log('Error removing document', err);
        });
    });

}

// Click add user button
btnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');

    addModalForm.codigo.value = '';
    addModalForm.marca.value = '';
    addModalForm.modelo.value = '';
    addModalForm.fabricante.value = '';
    addModalForm.tipo.value = '';
    addModalForm.ano.value = '';
    addModalForm.combustivel.value = '';
    addModalForm.cor.value = '';
    addModalForm.numerochassi.value = '';
    addModalForm.km.value = '';
    addModalForm.revisao.value = '';
    addModalForm.sinistro.value = '';
    addModalForm.furto_roubo.value = '';
    addModalForm.aluguel.value = '';
    addModalForm.venda.value = '';
    addModalForm.particular.value = '';
    addModalForm.obs.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
    if (e.target === addModal) {
        addModal.classList.remove('modal-show');
    }
    if (e.target === editModal) {
        editModal.classList.remove('modal-show');
    }
});

// Get all users
// db.collection('users').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });

// Real time listener
db.collection('cars').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            renderUser(change.doc);
        }
        if (change.type === 'removed') {
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            tableUsers.removeChild(tbody);
        }
        if (change.type === 'modified') {
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            tableUsers.removeChild(tbody);
            renderUser(change.doc);
        }
    })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('cars').add({
        codigo: addModalForm.codigo.value,
        marca: addModalForm.marca.value,
        modelo: addModalForm.modelo.value,
        fabricante: addModalForm.fabricante.value,
        tipo: addModalForm.tipo.value,
        ano: addModalForm.ano.value,
        combustivel: addModalForm.combustivel.value,
        cor: addModalForm.cor.value,
        numerochassi: addModalForm.numerochassi.value,
        km: addModalForm.km.value,
        revisao: addModalForm.revisao.value,
        sinistro: addModalForm.sinistro.value,
        furto_roubo: addModalForm.furto_roubo.value,
        aluguel: addModalForm.aluguel.value,
        venda: addModalForm.venda.value,
        particular: addModalForm.particular.value,
        obs: addModalForm.obs.value,
    });
    modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('cars').doc(id).update({
        codigo: editModalForm.codigo.value,
        marca: editModalForm.marca.value,
        modelo: editModalForm.modelo.value,
        fabricante: editModalForm.fabricante.value,
        tipo: editModalForm.tipo.value,
        ano: editModalForm.ano.value,
        combustivel: editModalForm.combustivel.value,
        cor: editModalForm.cor.value,
        numerochassi: editModalForm.numerochassi.value,
        km: editModalForm.km.value,
        revisao: editModalForm.revisao.value,
        sinistro: editModalForm.sinistro.value,
        furto_roubo: editModalForm.furto_roubo.value,
        aluguel: editModalForm.aluguel.value,
        venda: editModalForm.venda.value,
        particular: editModalForm.particular.value,
        obs: editModalForm.obs.value,
    });
    editModal.classList.remove('modal-show');

});
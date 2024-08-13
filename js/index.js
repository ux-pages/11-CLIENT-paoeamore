const quantities = document.querySelectorAll('.quantity-input');
const totalElement = document.getElementById('valor-total');
const pedidoBtn = document.getElementById('pedido-btn');
const modal = document.getElementById('cadastro-modal');
const closeModal = document.querySelector('.modal-close');
const cadastroForm = document.getElementById('cadastro-form');
const toast = document.getElementById('toast');

function updateTotal() {
    let total = 0;
    quantities.forEach(input => {
        const price = parseFloat(input.dataset.price);
        const quantity = parseInt(input.value);
        total += price * quantity;
    });
    totalElement.textContent = total.toFixed(2).replace('.', ',');
}

function changeQuantity(button, delta) {
    const input = button.parentElement.querySelector('.quantity-input');
    let value = parseInt(input.value);
    value = isNaN(value) ? 0 : value;
    value += delta;
    if (value < 0) value = 0;
    input.value = value;
    updateTotal();
}

function createWhatsAppLink(nome, telefone, dataNascimento, email) {
    // Emojis para usar na mensagem
    const breadEmoji = '\u{1F35E}'; // 🍞
    const moneyEmoji = '\u{1F4B0}'; // 💰
    const happyEmoji = '\u{1F60A}'; // 😊
    const personEmoji = '\u{1F9D1}'; // 🧑
    const phoneEmoji = '\u{1F4DE}'; // 📞
    const birthdayEmoji = '\u{1F382}'; // 🎂
    const emailEmoji = '\u{2709}'; // 📧

    let message = `*Cadastro*\n${personEmoji} Nome: ${nome}\n${phoneEmoji} Telefone: ${telefone}\n${birthdayEmoji} Data de Nascimento: ${dataNascimento}\n${emailEmoji} Email: ${email}\n\n`;
    message += `*Meu Pedido:* \n\n`;

    let total = 0;
    quantities.forEach(input => {
        const price = parseFloat(input.dataset.price);
        const quantity = parseInt(input.value);
        const productName = input.closest('.produto').querySelector('.desc h3').textContent.trim();
        if (quantity > 0) {
            message += `${quantity} x ${productName} ${breadEmoji} - R$ ${(price * quantity).toFixed(2).replace('.', ',')}\n`;
            total += price * quantity;
        }
    });

    message += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')} ${moneyEmoji}\n\n${happyEmoji}${happyEmoji}`;
    return `https://wa.me/5551983198425?text=${encodeURIComponent(message)}`;
}


function showToast(message) {
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

pedidoBtn.addEventListener('click', () => {
    const total = parseFloat(totalElement.textContent.replace(',', '.'));
    if (total === 0) {
        showToast("Por favor, selecione pelo menos um produto.");
    } else {
        modal.style.display = 'flex';
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

cadastroForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const email = document.getElementById('email').value;
    const whatsappLink = createWhatsAppLink(nome, telefone, dataNascimento, email);
    window.location.href = whatsappLink;
});

quantities.forEach(input => {
    input.addEventListener('input', updateTotal);
});

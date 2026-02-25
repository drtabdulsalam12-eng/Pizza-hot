let cart = [];
let totalPrice = 0;

function addToCart(name, price) {
    cart.push(name);
    totalPrice += price;
    updateUI();
    // تأثير اهتزاز خفيف عند الإضافة
    const bar = document.querySelector('.bottom-bar');
    bar.style.transform = "scale(1.05)";
    setTimeout(() => bar.style.transform = "scale(1)", 200);
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = totalPrice;
}

function openModal() {
    if (cart.length === 0) return alert("سلتك فاضية يا بطل! 🍕");
    document.getElementById('orderModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function toggleTable(show) {
    document.getElementById('tableNo').style.display = show ? 'block' : 'none';
}

function checkout() {
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const way = document.querySelector('input[name="orderWay"]:checked').value;
    const table = document.getElementById('tableNo').value;

    if (!name || !phone) return alert("اكتب اسمك ورقمك عشان نكلمك!");

    const myNumber = "201012345678"; // <--- غير الرقم ده لرقمك الحقيقي

    // تجميع الأصناف بشكل منسق
    let orderSummary = cart.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    let itemsText = "";
    for (let item in orderSummary) {
        itemsText += `- ${item} (${orderSummary[item]})%0A`;
    }

    let message = `*طلب جديد من الموقع* 🔥%0A%0A`;
    message += `👤 *العميل:* ${name}%0A`;
    message += `📞 *تلفون:* ${phone}%0A`;
    message += `🥡 *النوع:* ${way}%0A`;
    if(way === "داخل المطعم") message += `🪑 *ترابيزة:* ${table}%0A`;
    message += `%0A🛒 *الطلبات:*%0A${itemsText}`;
    message += `%0A💰 *الإجمالي:* ${totalPrice} ج.م`;

    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
}

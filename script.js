const startDate = new Date("2025-01-25T00:00:00");

function updateCounter() {
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    let diff = now - startDate;
    const totalDaysElapsed = (now.getTime() - new Date(startDate.getFullYear() + years, startDate.getMonth() + months, startDate.getDate()).getTime()) / (1000 * 60 * 60 * 24);
    diff = Math.round((totalDaysElapsed - Math.floor(totalDaysElapsed)) * 1000 * 60 * 60 * 24);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    let html = "";
    if (years > 0) html += `<div class="time-unit"><h2>${years}</h2><p>${years === 1 ? "Ano" : "Anos"}</p></div>`;
    if (months > 0) html += `<div class="time-unit"><h2>${months}</h2><p>${months === 1 ? "Mês" : "Meses"}</p></div>`;
    if (days > 0) html += `<div class="time-unit"><h2>${days}</h2><p>${days === 1 ? "Dia" : "Dias"}</p></div>`;
    html += `<div class="time-unit"><h2>${String(hours).padStart(2, '0')}</h2><p>Horas</p></div>`;
    html += `<div class="time-unit"><h2>${String(minutes).padStart(2, '0')}</h2><p>Minutos</p></div>`;
    html += `<div class="time-unit"><h2>${String(seconds).padStart(2, '0')}</h2><p>Segundos</p></div>`;
    document.getElementById("counter").innerHTML = html;

    const together = [];
    if (years > 0) together.push(`${years} ${years === 1 ? "ano" : "anos"}`);
    if (months > 0) together.push(`${months} ${months === 1 ? "mês" : "meses"}`);
    if (days > 0) together.push(`${days} ${days === 1 ? "dia" : "dias"}`);
    
    let totalTimeText = together.join(" e ");
    
    document.getElementById("timeTogether").textContent = "Estamos juntos há " + (totalTimeText || "menos de um dia");
}

setInterval(updateCounter, 1000);
updateCounter();

const items = document.querySelectorAll('.carousel-item');
let current = 0;
setInterval(() => {
    items[current].classList.remove("active");
    current = (current + 1) % items.length;
    items[current].classList.add("active");
    const activeElement = items[current];
    if (activeElement.tagName === 'VIDEO') {
        activeElement.currentTime = 0;
        activeElement.play();
    }
}, 4000);

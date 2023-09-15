

const input = document.getElementById("city-input");
const button =document.getElementById("pesquisar");

const local = document.querySelector("#local");
const temperatura = document.querySelector("#temperatura");
const vento = document.querySelector("#vento");
const content = document.querySelector(".content");

button.addEventListener("click", () => {
    if (!input.value) return;

    getDataApi();
});


async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input.value
    )}&units=metric&appid=3020309eb14c260fd703ee602238b178`;

    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.cod && data.cod === "404") {
                    return alert("Local não encontrado");
                }

                loadData(data);
            });
    } catch(error) {
        alert(error);
    }
}

function loadData(data) {
    local.innerHTML = `${data.name}, ${data.sys.country}`;
    temperatura.innerHTML = `Tempetura: ${Math.floor(data.main.temp)} º C`;
    vento.innerHTML = `Vento: ${data.wind.speed} km/h`;
    content.style.display = "flex"; 
}

document.getElementById('google-earth').addEventListener('click', function(){
    var link = 'https://earth.google.com/web/search/'+encodeURI(input.value);
    window.open(link)
});

function homeAnimateTextTo(x2, y2, duration = 350) {
    const text = document.querySelector('#home-map-text');
    const x1 = parseFloat(text.getAttribute('x')) || 0;
    const y1 = parseFloat(text.getAttribute('y')) || 0;

    const start = performance.now();
    function animate(time) {
        const progress = Math.min((time - start) / duration, 1);
        text.setAttribute('x', x1 + (x2 - x1) * progress);
        text.setAttribute('y', y1 + (y2 - y1) * progress);
        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// ✅ ViewBox Zoom Animation
function animateViewBox(svg, newVB, transformValues = {}, duration = 800) {
    const [x2, y2, w2, h2] = newVB.split(" ").map(Number);
    const [x1, y1, w1, h1] = svg.getAttribute("viewBox").split(" ").map(Number);

    const scale1 = parseFloat(svg.dataset.currentScale) || 1;
    const xT1 = parseFloat(svg.dataset.currentTx) || 0;
    const yT1 = parseFloat(svg.dataset.currentTy) || 0;

    const scale2 = transformValues.scale ?? scale1;
    const xT2 = transformValues.x ?? xT1;
    const yT2 = transformValues.y ?? yT1;

    const start = performance.now();
    function frame(time) {
        const progress = Math.min((time - start) / duration, 1);
        const x = x1 + (x2 - x1) * progress;
        const y = y1 + (y2 - y1) * progress;
        const w = w1 + (w2 - w1) * progress;
        const h = h1 + (h2 - h1) * progress;
        svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);

        const scale = scale1 + (scale2 - scale1) * progress;
        const tx = xT1 + (xT2 - xT1) * progress;
        const ty = yT1 + (yT2 - yT1) * progress;
        svg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

        if (progress < 1) requestAnimationFrame(frame);
        else {
            svg.dataset.currentScale = scale;
            svg.dataset.currentTx = tx;
            svg.dataset.currentTy = ty;
        }
    }
    requestAnimationFrame(frame);
}

// ✅ Region Zoom settings
const regionViewBoxes = {
    india: "480 80 200 300",
    southamerica: "120 220 50 250",
    northamerica: "70 70 20 200",
    emea: "350 60 50 250",
};

const regionTransform = {
    india: { scale: 3.5, x: 54, y: -23 },
    southamerica: { scale: 1.5, x: 12, y: 30 },
    northamerica: { scale: 1.3, x: 29, y: -69 },
    emea: { scale: 1.5, x: -33, y: 93 }
};

// ✅ Show / Hide Static HTML Card Groups
function switchCityCards(cityKey) {
    document.querySelectorAll(".city-card-group").forEach(el => el.classList.add("d-none"));
    document.getElementById(`city-${cityKey}`).classList.remove("d-none");

    document.getElementById("selectedCity").textContent =
        document.querySelector(`.dropdown-item[data-mapkey="${cityKey}"]`).innerText.trim();

    document.getElementById("exploreBtn").innerText =
        `Explore ${cityKey.charAt(0).toUpperCase() + cityKey.slice(1)} DC`;
}

// ✅ DOM Ready
document.addEventListener("DOMContentLoaded", function () {

    const mapBox = $(".home-map-box");
    const tabs = document.querySelectorAll('.home-map-tab');
    const svg = document.querySelector(".home-map-box svg");

    function activateCityGlow(pointerId) {
        mapBox.find('.home-map-glow').css('r', '0');
        $(pointerId).css({ r: '3', opacity: '0.6' });
    }

    function updateMap(activePanel, cityKey = null) {
        const activeId = cityKey || activePanel.id.replace("-panel", "");
        const pointerId = "#" + activeId + "-p";
        activateCityGlow(pointerId);

        const posX = $(pointerId).attr('cx');
        const posY = $(pointerId).attr('cy');
        homeAnimateTextTo(posX, Number(posY) + 5);

        const mapKey = activePanel.getAttribute('data-map') || activeId;
        animateViewBox(svg, regionViewBoxes[mapKey], regionTransform[mapKey]);
    }

    // ✅ Tab Switch
    tabs.forEach(tab => {
        tab.addEventListener("shown.bs.tab", function (e) {
            const paneId = e.target.getAttribute("data-bs-target");
            const activePane = document.querySelector(paneId);

            updateMap(activePane);

            if (paneId === "#india-panel") {
                switchCityCards("mumbai");
            }
        });
    });

    // ✅ Default
    switchCityCards("mumbai");

    // ✅ Dropdown logic
    const dropdown = document.getElementById("cityDropdown");
    const arrow = document.getElementById("dropdownArrow");
    const toggleBtn = document.getElementById("cityToggle");

    toggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("open");
        arrow.classList.toggle("rotate");
    });

    dropdown.addEventListener("click", function (e) {
        const item = e.target.closest(".dropdown-item");
        if (!item) return;

        dropdown.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const cityKey = item.dataset.mapkey;
        switchCityCards(cityKey);

        const circleId = "#" + cityKey + "-p";
        activateCityGlow(circleId);

        dropdown.classList.remove("open");
        arrow.classList.remove("rotate");
    });

    document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
            dropdown.classList.remove("open");
            arrow.classList.remove("rotate");
        }
    });
});

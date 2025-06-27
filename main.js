

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const page = document.querySelectorAll(".paper");
// Number of Pages 
const numOfPapers = page.length;
// Or any other way to get the number of pages dynamically 
let currentLocation = 1;
const maxLocation = parseInt(numOfPapers) + 1;
// Event Listeners 
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
function openBook() {
    book.style.transform = "translateX(50%)";
}
function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}
function updateZIndices() {
    for (let i = 1; i <= numOfPapers; i++) {
        const paper = document.querySelector(`#p${i}`);
        if (paper.classList.contains("flipped")) {
            paper.style.zIndex = i;
        } else {
            paper.style.zIndex = numOfPapers - i;
        }
    }
}
function goNextPage() {
    if (currentLocation < maxLocation) {
        const paper = document.querySelector(`#p${currentLocation}`);
        paper.classList.add("flipped");
        if (currentLocation === 1) openBook();
        if (currentLocation === numOfPapers) closeBook(false);
        currentLocation++;
        updateZIndices();
        showThankYouIfLastPage();
    }
}

function showThankYouIfLastPage() {
    if (currentLocation === numOfPapers + 1) {
        const thankYou = document.querySelector('.thank-you-content');
        if (thankYou) {
            thankYou.classList.add('fade-in');
        }
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        currentLocation--;
        const paper = document.querySelector(`#p${currentLocation}`);
        paper.classList.remove("flipped");
        if (currentLocation === 1) closeBook(true);
        if (currentLocation === numOfPapers) openBook();
        updateZIndices();
    }
}

const welcomeText = "Welcome to My Digital Space!";
const nameText = "Neha Gogle";
const roleText = "Full-Stack Developer<br>Problem Solver<br>Tech-Enthusiast";

const welcomeElement = document.getElementById("typewriter-welcome");
const nameElement = document.getElementById("typewriter-name");
const roleElement = document.getElementById("typewriter-role");

let welcomeIndex = 0;
let nameIndex = 0;
let roleIndex = 0;

function typeWriterWelcome() {
    if (welcomeIndex < welcomeText.length) {
        welcomeElement.innerHTML += welcomeText.charAt(welcomeIndex);
        welcomeIndex++;
        setTimeout(typeWriterWelcome, 100);
    } else {
        setTimeout(typeWriterName, 500);
    }
}

function typeWriterName() {
    if (nameIndex < nameText.length) {
        nameElement.innerHTML += nameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeWriterName, 100);
    } else {
        setTimeout(typeWriterRole, 500);
    }
}

function typeWriterRole() {
    if (roleText.substring(roleIndex, roleIndex + 4) === "<br>") {
        roleElement.innerHTML += "<br>";
        roleIndex += 4;
    } else {
        roleElement.innerHTML += roleText.charAt(roleIndex);
        roleIndex++;
    }

    if (roleIndex < roleText.length) {
        setTimeout(typeWriterRole, 80);
    }
}

// Start typing sequence
typeWriterWelcome();
document.querySelectorAll('.timeline li').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target'); // e.g. "p2-back"
      const [paperId, side] = target.split('-');       // "p2", "back"
      const paperNum = parseInt(paperId.replace('p', ''));
  
      const allPages = document.querySelectorAll('.paper');
  
      // Reset flips
      allPages.forEach((pg, idx) => {
        if (idx < paperNum - 1) {
          pg.classList.add('flipped');
        } else {
          pg.classList.remove('flipped');
        }
      });
  
      const thisPage = document.getElementById(`p${paperNum}`);
      if (side === "back") {
        thisPage.classList.add("flipped");
        currentLocation = paperNum + 1;
      } else {
        thisPage.classList.remove("flipped");
        currentLocation = paperNum;
      }
  
      // Handle book open/close animation
      if (currentLocation === 1) {
        closeBook(true);
      } else if (currentLocation === allPages.length + 1) {
        closeBook(false);
      } else {
        openBook();
      }
  
      updateZIndices();
  
      // Active timeline highlight
      document.querySelectorAll('.timeline li').forEach(li => li.classList.remove('active'));
      item.classList.add('active');
    });
  });

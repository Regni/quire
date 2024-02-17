const navButton = document.getElementById('navButton');
let navClicked = false;


let settingsObj = [
    {
      navColor: '',
      asideColor: '',
      noteColors: '',
      titleSizes: '',
      contentSizes: '',
      noteBorderSwitch: false,
      noteBorderType: 'solid',
      noteBorderColor: '',
      fontFamily: ''
    }
  ];

let storageSettings = JSON.parse(localStorage.getItem('settings'));

function getStorageSettings(){
    if(storageSettings != null)
    settingsObj = storageSettings;
}
getStorageSettings();

function fetchStorageData() {
    if(storageSettings != null){
        setTimeout(() => {
            // Navbar
            document.querySelector('.side').style.backgroundColor = `#${settingsObj[0].navColor}`; // Set the color
            if(document.querySelector('.add-note'))
            document.querySelector('.add-note').style.backgroundColor = `#${settingsObj[0].navColor}`;
            if(document.querySelector('.printPage'))
            document.querySelector('.printPage').style.backgroundColor = `#${settingsObj[0].navColor}`;
            // Aside 
            document.querySelector('.notes-column').style.backgroundColor = `hsl(0, 0%, ${settingsObj[0].asideColor}%)`;
            // Notes
            for(let i = 0; i < document.querySelectorAll('.note').length; i++)
            document.querySelectorAll('.note')[i].style.backgroundColor = storageSettings[0].noteColors;
            // Note titles
            for(let i = 0; i < document.getElementsByClassName('noteTitle').length; i++)
            document.getElementsByClassName('noteTitle')[i].style.fontSize = settingsObj[0].titleSizes + 'px';
            // Note contents
            for(let i = 0; i < document.getElementsByClassName('noteContent').length; i++)
            document.getElementsByClassName('noteContent')[i].style.fontSize = settingsObj[0].contentSizes + 'px';
            // Note borders
            if(storageSettings[0].noteBorderSwitch == 'true'){
                for(let i = 0; i < document.getElementsByClassName('note').length; i++)
                document.getElementsByClassName('note')[i].style.border = `${storageSettings[0].noteBorderType} 2px hsl(0, 0%, ${storageSettings[0].noteBorderColor}%)`;
            }
            // Font family
            document.documentElement.style.setProperty('--fontFamily', `${settingsObj[0].fontFamily}`);
        }, 10);
    }
};
fetchStorageData();



// Nav button

navButton.addEventListener('click', () => {
    if (navClicked === false){
        for(let i = 1; i < document.querySelector('.nav').getElementsByTagName('a').length; i++)
        document.querySelector('.nav').getElementsByTagName('a')[i].style.display = 'block';
        document.querySelector('.nav').getElementsByClassName('menu-icon fa-solid fa-question')[0].style.display = 'block';
        navClicked = true;
        navButtonShape('translate(10%, 100%) rotate(45deg)', 'none', 'translate(10%, -100%) rotate(-45deg)'); // Change the shape of the mobile nav button from 3 lines to cross
    } else {
        for(let i = 1; i < document.querySelector('.nav').getElementsByTagName('a').length; i++)
        document.querySelector('.nav').getElementsByTagName('a')[i].style.display = 'none';
        document.querySelector('.nav').getElementsByClassName('menu-icon fa-solid fa-question')[0].style.display = 'none';
        navClicked = false;
        navButtonShape('rotate(0deg) translate(0%, 0%)', 'block', 'rotate(0deg) translate(0%, 0%)'); // Change the shape of the mobile nav button from cross to 3 lines
    }
})

function navButtonShape(f, s, t){
    let div = navButton.getElementsByTagName('div');
    div[0].style.transform = f;
    div[1].style.display = s;
    div[2].style.transform = t;
}
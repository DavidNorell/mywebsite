import { english } from "./languages/en.js";
import { spanish } from "./languages/es.js";
import { swedish } from "./languages/sv.js";

function getTranslations(lang) {
  if (lang === "es")
    return spanish;
  else if (lang === "sv")
    return swedish;
  return english;
}

function setLanguage(lang) {
  localStorage.setItem("language", lang);

  const currentLanguageElement = document.getElementById(lang);
  if (currentLanguageElement != null)
  {
    let chosenLanguages = document.getElementsByClassName("chosen-language");
    for (var i = 0; i < chosenLanguages.length; i++)
    {
      chosenLanguages[i].src = currentLanguageElement.src;
    }
  }

  // This translation assumes the translatable HTML-elements have their ID
  // equal to the corresponding key in the translation object
  const translations = getTranslations(lang);
  for (var key in translations)
  {
    if (Object.prototype.hasOwnProperty.call(translations, key))
    {
      let translatableElement = document.getElementById(key);
      if (translatableElement != null)
      {
        translatableElement.textContent = translations[key];
      }
      else
      {
        console.log("Could not find element with ID = " + key);
      }
    }
  }
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablink;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablink" and remove the class "active"
  tablink = document.getElementsByClassName("tablink");
  for (i = 0; i < tablink.length; i++) {
    tablink[i].className = tablink[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

const lang = localStorage.getItem("language");
if (lang != null)
{
  setLanguage(lang);
}
else
{
  setLanguage("en");
}

document.getElementById("hometab").addEventListener("click", function(event) { openTab(event, "home"); });
document.getElementById("newstab").addEventListener("click", function(event) { openTab(event, "news"); });
document.getElementById("contacttab").addEventListener("click", function(event) { openTab(event, "contact"); });

document.getElementById("en").addEventListener("click", function(event) { setLanguage("en"); });
document.getElementById("es").addEventListener("click", function(event) { setLanguage("es"); });
document.getElementById("sv").addEventListener("click", function(event) { setLanguage("sv"); });

document.getElementById("hometab").click();

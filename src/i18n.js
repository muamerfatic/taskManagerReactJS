import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          welcomePage: {
            part1: "Welcome to TaskManager",
            part2:
              ' Ever felt like you are full of responsibilities and you won\'t get to "mark them as checked".',

            part3:
              "Well we are here to help you organize time and manage your tasks.",

            part4: "Get started!",
            part5: "Already in?",
            part6: "Login",
          },
          register: {
            part1: "Sign up",
            part2: "Please Enter Your Email",
            part3: "Please Enter A Valid Email!",
            part4: "Username",
            part5: "Please Enter Your Username",
            part6: "Please Enter A Valid Username!",
            part7: "Please Enter Your Password!",

            part8: "Password must be at least 6 characters long",
            part9: "Confrim Password",

            part10: "Passwords should match!",
            part11: "SUBMIT",
          },
          login: {
            part1: "Login",
            part2: "Username doesn't exist or wrong password.",
          },
          navigationBar: {
            part1: "MyTasks",
            part2: "Tasks",
            part3: "My account",
            part4: "Logout",
          },
          profile: {
            part1: "Profile info",
            part2: "Birthday",
            part3: "Position",
            part4: "Update Your Info",
            part5: "Update info on button",
          },
          updateProfileForm: {
            part1: "Please, try again later",
            part2: "Position field can only contain letters and spaces.",
            part3: "Date:",
            part4: "Cancel",
          },
          myTasks: {
            part1: "Tasks that are assigned to me",
          },
          tasks: {
            part1: "All tasks",
          },
          sort: {
            part1: "S O R T I N G",
            part2: "Alfabetic asc",
            part3: "Alfabetic desc",
            part4: "Start Date",
            part5: "Due Date",
            part6: "Priority",
            part7: "Status",
          },
          task: {
            part1: "Task:",
            goBack: "Go Back To Tasks",
            newTask: "New Task",
            addTask: "Add Task",
            enterTitle: "Please Enter Your Title",
            enterTitleError:
              "Only letters, numbers and underscore are allowed.",
            enterTitleTaken:
              "This title of task is already taken. Please give your task diffrent title.",
            title: "Title",
            description: "Description",
            noDescription: "No Description",
            possibleEstimation: "Possible Estimation",
            noPossibleEstimation: "No Estimation",
            startDate: "Start Date:",
            dueDate: "Due Date:",
            assignedUser: "Assigned User",
            enterAssignedUser: "Please Enter Assigned Users Email!",
            assignedUserError: "User with entered email does not exist!",
            createdBy: "Created by:",
            delete: "Delete",
            edit: "Edit",
            complete: "Complete",
            priority: "Priority",
            deleteTask: "Task is deleted!",
          },
          error: {
            dateError: "Due date can not be lower then start date!",
          },
          // here we will place our translations...
        },
      },
      ba: {
        translation: {
          welcomePage: {
            part1: "Dobrodosli na TaskManager",
            part2:
              " Da li ste se ikada imali previše obaveza i osjećali da ih nećete stići završiti?",

            part3:
              "Mi smo tu da ti pomognemo organizovati vrijeme kako bi bolje izvršavao svoje obaveze.",

            part4: "Registriraj se",
            part5: "Već si registrovan?",
            part6: "Prijavi se",
          },
          register: {
            part1: "Registracija",
            part2: "Unesite Vaš Email, molim Vas",
            part3: "Molim Vas unesite validan email!",
            part4: "Korisničko ime",
            part5: "Unesite Vaše korisničko ime, molim Vas",
            part6: "Molim Vas unesite validno korisničko ime!",
            part7: "Molim Vas unesite svoj password",
            part8: "Password mora biti najmanje dužine od 6 karaktera",
            part9: "Potvrdite password",
            part10: "Passwordi moraju biti identični!",
            part11: "Registruj se",
          },
          login: {
            part1: "Prijava",
            part2:
              "Korisničko ime ne postoji ili ste unijeli pogrešan password.",
          },
          navigationBar: {
            part1: "Moji Zadaci",
            part2: "Zadaci",
            part3: "Moj profil",
            part4: "Odjavi se",
          },
          profile: {
            part1: "Informacije o profilu",
            part2: "Datum rođenja",
            part3: "Pozicija",
            part4: "Ažuriraj svoje informacije",
            part5: "Ažuriraj informacije na dugme",
          },
          updateProfileForm: {
            part1: "Molim Vas, pokušajte poslije.",
            part2: "Polje za poziciju moze samo sadržavati slova i razmake.",
            part3: "Datum:",
            part4: "Otkaži",
          },
          myTasks: {
            part1: "Zadaci koji su dodijeljeni meni",
          },
          tasks: {
            part1: "Svi zadaci",
          },
          sort: {
            part1: "S O R T I R A NJ E",
            part2: "Abecedno opadajući red.",
            part3: "Alfabetic rastući red.",
            part4: "Početni datum",
            part5: "Krajnji datum",
            part6: "Prioritet",
            part7: "Status",
          },
          task: {
            part1: "Zadatak:",
            goBack: "Nazad na sve zadatke",
            newTask: "Novi Zadatak",
            addTask: "Dodaj zadatak",
            enterTitle: "Unesite naslov ovog zadatka",
            enterTitleError: "Samo slova, cifre i donja crta su dozvoljeni.",
            enterTitleTaken:
              "Ovaj naslov zadatka je već zauzeto. Molimo Vas, dajte drugačiji naslov ovom zadatku.",
            title: "Naslov zadatka",
            description: "Opis zadatka",
            noDescription: "Nema opisa zadatka",
            possibleEstimation: "Moguća estimacija",
            noPossibleEstimation: "Nema estimacije",
            startDate: "Početni datum:",
            dueDate: "Krajnji datum:",
            assignedUser: "Dodijeljen korisniku",
            enterAssignedUser: "Molim Vas unesite validan email za dodijeliti!",
            assignedUserError: "Korisnik sa unesenim email-om ne postoji!",
            createdBy: "Zadatak napravio:",
            delete: "Obriši zadatak",
            edit: "Ažuriraj zadatak",
            complete: "Završi zadatak",
            priority: "Prioritet",
            deleteTask: "Zadatak je obrisan!",
          },
          error: {
            dateError: "Krajnji datum ne može biti prije početnog datuma!",
          },
          // here we will place our translations...
        },
      },
    },
  });

export default i18n;

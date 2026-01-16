import guarana from "../assets/guarana.jpeg";
import abacaxi from "../assets/abacaxi.jpg";
import acai from "../assets/acai.jpeg";
import banana from "../assets/banana.jpg";
import chocolate from "../assets/chocolate.jpg";
import cupuacu from "../assets/cupuacu.jpg";
import doce from "../assets/doce.jpg";
import limao from "../assets/limao.jpeg";
import maracuja from "../assets/maracuja.jpg";
import morango from "../assets/morango.jpg";
import ninho from "../assets/ninho.jpg";
import wheyC from "../assets/wheyC.png";
import wheyM from "../assets/wheyM.png";
import amendoim from "../assets/amendoim.jpg";
import pacoca from "../assets/pacoca.jpg";
import menta from "../assets/menta.jpg";
import explosao from "../assets/explosao.jpg";
import turbo from "../assets/turbo.jpg";
import power from "../assets/power.jpg";
import bomba from "../assets/bomba.png";

export const initialGlasses = [
  { id: 0, size: "300ml", quant: 30, iconS: 55, price: 7 },
  { id: 1, size: "400ml", quant: 30, iconS: 65, price: 8 },
  { id: 2, size: "500ml", quant: 30, iconS: 70, price: 11 },
  { id: 3, size: "700ml", quant: 15, iconS: 75, price: 15 },
];

export const initialFlavors = [
  { id: 1, name: "Guaraná", img: guarana },
  { id: 2, name: "Abacaxi com Hortelã", img: abacaxi },
  { id: 3, name: "Açaí", img: acai },
  { id: 4, name: "Banana", img: banana },
  { id: 5, name: "Chocolate", img: chocolate },
  { id: 6, name: "Cupuaçu", img: cupuacu },
  { id: 7, name: "Doce de Leite", img: doce },
  { id: 8, name: "Limão", img: limao },
  { id: 9, name: "Maracujá", img: maracuja },
  { id: 10, name: "Morango", img: morango },
  { id: 11, name: "Ninho com Ovomaltine", img: ninho },
];

export const initialWheys = [
  { id: 1, name: "Whey com Chocolate", img: wheyC },
  { id: 2, name: "Whey com Morango", img: wheyM },
];

export const initialToppings = [
  { ...initialFlavors[4], id: 1 },
  { ...initialFlavors[6], id: 2 },
  { id: 3, name: "Menta", img: menta },
  { ...initialFlavors[9], id: 4 },
];

export const initialAccompaniments = [
  { id: 1, name: "Amendoim", img: amendoim },
  { id: 2, name: "Paçoca", img: pacoca },
];

export const initialCombos = [
  { id: 1, size: 0, size2: 2, name: "Explosão", img: explosao, price: 16 },
  { id: 2, size: 2, size2: 1, name: "Turbo", img: turbo, price: 17 },
  { id: 3, size: 3, size2: 0, name: "Power", img: power, price: 20 },
  { id: 4, size: 3, size2: 1, name: "BombaMix", img: bomba, price: 21 },
];

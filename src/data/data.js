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

export const glasses = [
  { size: "300ml", price: 7 },
  { size: "400ml", price: 8 },
  { size: "500ml", price: 11 },
  { size: "700ml", price: 15 },
];

export const flavores = [
  { name: "Guaraná", img: guarana },
  { name: "Abacaxi com Hortelã", img: abacaxi },
  { name: "Açaí", img: acai },
  { name: "Banana", img: banana },
  { name: "Chocolate", img: chocolate },
  { name: "Cupuaçu", img: cupuacu },
  { name: "Doce de Leite", img: doce },
  { name: "Limão", img: limao },
  { name: "Maracujá", img: maracuja },
  { name: "Morango", img: morango },
  { name: "Ninho com Ovomaltine", img: ninho },
];

export const wheyFlavor = [
  { name: "Whey com Chocolate", img: wheyC },
  { name: "Whey com Morango", img: wheyM },
];

export const topping = [
  flavores[4],
  flavores[6],
  { name: "Menta", img: menta },
  flavores[9],
];

export const accompaniment = [
  { name: "Amendoim", img: amendoim },
  { name: "Paçoca", img: pacoca },
];

export const combos = [
  { name: "Explosão", price: 16 },
  { name: "Turbo", price: 17 },
  { name: "Power", price: 20 },
  { name: "BombaMix", price: 21 },
];

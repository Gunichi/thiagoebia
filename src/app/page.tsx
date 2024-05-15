"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";

import CryptoJS from "crypto-js";

const IndexPage = () => {
  const [mensagemOriginal, setMensagemOriginal] = useState(
    "U2FsdGVkX18mvEe89cbJQIYQrf2niY9PPH+ePjaYhjA="
  );
  const [chave, setChave] = useState("");
  const [mensagemCriptografada, setMensagemCriptografada] = useState("");
  const [mensagemDescriptografada, setMensagemDescriptografada] = useState("");

  const handleMensagemChange = (event: any) => {
    setMensagemOriginal(event.target.value);
  };

  const descriptografarMensagem = () => {
    const mensagemDescriptografada = CryptoJS.AES.decrypt(
      mensagemCriptografada,
      chave
    ).toString(CryptoJS.enc.Utf8);
    setMensagemDescriptografada("Eu amo partilhar a vida boa com você ❤️");
  };

  const playAudio = () => {
    const audio = new Audio("/Partilhar.mp3");
    audio.play().catch((error) => {
      console.error("Erro ao tocar o áudio:", error);
    });
  };

  const [isHeartVisible, setIsHeartVisible] = useState("hidden");

  const handleHeartClick = () => {
    descriptografarMensagem();
    setIsHeartVisible("block");
  };

  //Open image on full screen
  const handleOpenImageOnFullScreen = () => {
    window.open("/thiagoebia.jpg");
  };
  return (
    <div className="bg-red-100 min-h-screen flex items-center justify-center">
      <audio autoPlay onCanPlay={playAudio} src="/Partilhar.mp3" />
      <div className="container max-w-6xl bg-white shadow-md rounded-sm shadow-red-600">
        <div className="text-center justify-center items-center mx-auto mt-4 p-4 flex flex-row">
          <Image
            src="/thiagoebia.jpg"
            alt="heart"
            width={350}
            height={350}
            className="rounded-md "
            onClick={handleOpenImageOnFullScreen}
          />
          <div id="heart" className={`text-center ${isHeartVisible}`} />
        </div>

        <div className="p-4">
          <div>
            <button
              className="bg-red-500 text-white rounded-md p-2 mb-4"
              onClick={playAudio}
            >
              Tocar música
            </button>
            <label htmlFor="mensagem" className="block">
              Mensagem
            </label>
            <input
              type="text"
              id="mensagem"
              className="w-full border border-gray-300 rounded p-2"
              disabled
              value={mensagemOriginal}
              onChange={handleMensagemChange}
            />
          </div>
          {/* <div className="mt-4">
            <button className="bg-blue-500 text-white rounded p-2" onClick={criptografarMensagem}>Criptografar</button>
          </div> */}
          {/* <div className="mt-4">
            <label htmlFor="mensagem-criptografada" className="block">Mensagem Criptografada</label>
            <input type="text" id="mensagem-criptografada" className="w-full border border-gray-300 rounded p-2" value={mensagemCriptografada} readOnly />
          </div> */}
          <div className="mt-4">
            <button
              className="bg-red-500 text-white rounded-md p-2"
              onClick={handleHeartClick}
            >
              Descriptografar
            </button>
          </div>
          <div className="mt-4">
            <label htmlFor="mensagem-descriptografada" className="block">
              Mensagem Descriptografada
            </label>
            <input
              type="text"
              id="mensagem-descriptografada"
              className="w-full border border-gray-300 rounded p-2"
              value={mensagemDescriptografada}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

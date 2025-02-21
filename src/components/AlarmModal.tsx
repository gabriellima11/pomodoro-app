"use client";
import React from "react";

interface AlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlarmModal = ({ isOpen, onClose }: AlarmModalProps)  => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl text-black font-bold">⏰ O Alarme Está Tocando!</h2>
        <p className="mt-2 text-black">Clique no botão para parar o som.</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          onClick={onClose}
        >
          Parar Alarme
        </button>
      </div>
    </div>
  );
};

export default AlarmModal;

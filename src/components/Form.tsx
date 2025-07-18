'use client';

import React, { useState } from 'react';
import SelectCargo from './SelectCargo';
import Toast from './Toast';
import '../app/globals.css';
import { supabase } from '../../lib/supabaseClient'; // ajuste o caminho se precisar

function formatTelefone(value: string) {
  value = value.replace(/\D/g, '');

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 10) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    value = value.replace(/(\d*)/, '($1');
  }

  return value;
}

export default function Form() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  // Estados do toast
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyChecked) {
      setToastType('error');
      setToastMessage('Você precisa aceitar a política de privacidade para enviar o formulário.');
      setToastShow(true);
      setTimeout(() => setToastShow(false), 3500);
      return;
    }

    setLoading(true);

    const payload = {
      nome,
      empresa,
      cargo,
      email,
      telefone,
      data_envio: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from('formularios').insert([payload]);

      if (error) throw error;

      // Limpa os campos do form
      setNome('');
      setCargo('');
      setEmpresa('');
      setEmail('');
      setTelefone('');
      setPrivacyChecked(false);
      setLoading(false);

      setToastType('success');
      setToastMessage('Formulário enviado com sucesso! Aguarde nosso contato 😊');
      setToastShow(true);
      setTimeout(() => setToastShow(false), 3500);

    } catch {
      setLoading(false);
      setToastType('error');
      setToastMessage('Erro ao enviar! Tente novamente.');
      setToastShow(true);
      setTimeout(() => setToastShow(false), 3500);
    }
  };

  return (
    <>
      <Toast
        show={toastShow}
        message={toastMessage}
        type={toastType}
        onClose={() => setToastShow(false)}
      />
      <form
        onSubmit={handleSubmit}
        className={
          'backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl ' +
          'p-4 sm:p-6 text-white w-full max-w-2xl space-y-4 mx-auto'
        }
      >
        <label className="flex flex-col">
          <span className="mb-1 text-sm sm:text-base font-medium">
            Nome:<span className="text-red-400 ml-1">*</span>
          </span>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Digite seu nome"
            required
            className="px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 placeholder-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/30 transition"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm sm:text-base font-medium">
            Empresa:<span className="text-red-400 ml-1">*</span>
          </span>
          <input
            type="text"
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
            placeholder="Digite o nome da empresa"
            required
            className="px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 placeholder-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/30 transition"
          />
        </label>
        <SelectCargo cargo={cargo} setCargo={setCargo} />
        <label className="flex flex-col">
          <span className="mb-1 text-sm sm:text-base font-medium">
            E-mail:<span className="text-red-400 ml-1">*</span>
          </span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
            className="px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 placeholder-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/30 transition"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm sm:text-base font-medium">
            Telefone (Whatsapp):<span className="text-red-400 ml-1">*</span>
          </span>
          <input
            type="tel"
            value={telefone}
            onChange={e => setTelefone(formatTelefone(e.target.value))}
            placeholder="Digite seu telefone"
            required
            maxLength={15}
            className="px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 placeholder-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/30 transition"
          />
        </label>

        {/* Checkbox de política de privacidade */}
        <label className="flex flex-col gap-1 text-sm sm:text-base font-medium">
          <span className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={privacyChecked}
              onChange={e => setPrivacyChecked(e.target.checked)}
              required
              className="accent-white w-4 h-4 mt-1"
            />
            <span>
              Estou de acordo com a&nbsp;
              <a
                href="https://www.r3suprimentos.com.br/politica-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300 hover:text-blue-400 transition-colors"
              >
                política de privacidade
              </a>.
            </span>
          </span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-md border border-white/20 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
        >
          {loading ? 'Confirmando...' : 'Enviar'}
        </button>
      </form>
    </>
  );
}

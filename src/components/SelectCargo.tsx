'use client';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const options = [
  'Diretor',
  'Gerente',
  'Comercial',
  'Marketing',
];

export default function SelectCargo({
  cargo,
  setCargo,
}: {
  cargo: string;
  setCargo: (value: string) => void;
}) {
  return (
    <div className="flex flex-col mb-4">
      <span className="mb-1 text-md font-medium">
        Cargo/Função:
        <span className="text-red-400 ml-1">*</span>
      </span>
      <Listbox value={cargo} onChange={setCargo}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white/10 py-2 pl-4 pr-10 text-left text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition">
            <span>{cargo || 'Selecione um cargo'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="h-5 w-5 text-white/70" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black/95 text-white border border-white/20 shadow-lg ring-1 ring-black/30 focus:outline-none z-10 backdrop-blur-sm">
              {options.map((opt, idx) => (
                <Listbox.Option
                  key={idx}
                  value={opt}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 text-sm ${
                      active ? 'bg-black/20' : ''
                    }`
                  }
                >
                  {opt}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
